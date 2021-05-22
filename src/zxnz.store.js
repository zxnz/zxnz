/**
 * Created by yangyxu on 9/17/14.
 */
module.exports = zn.Class({
    static: true,
    properties: {
        databases: {
            readonly: true,
            get: function (){
                return this._databases;
            }
        },
        database: {
            readonly: true,
            get: function (){
                return this._database;
            }
        },
        sql: {
            readonly: true,
            get: function (){
                return this._database?this._database.Builder:null;
            }
        }
    },
    methods: {
        init: function (){
            this._database = null;
            this._databases = {};
        },
        registerDataBases: function (databases, events){
            switch(zn.type(databases)){
                case 'array':
                    return databases.map((database)=>this.registerDataBase(database, events));
                case 'object':
                    return this.registerDataBase(databases, events);
            }
        },
        registerDataBase: function (config, events){
            var _config = Object.assign({}, config);
            var _name = _config.name || _config.database;
            var _database = zxnz.require(_config.modules);
            //zn.debug('database config: ', _config);
            _database.connector = new _database.Connector(_config, events);
            if(_config.default){
                this.setCurrentDataBase(_database);
            }

            return this._databases[_name] = _database, _database;
        },
        setCurrentDataBase: function (database){
            this._database = database;
            zxnz.sql = database.Builder;
            require('./ref/zxnz.sql.js');
        },
        getDataBase: function (name){
            if(name){
                return this._databases[name];
            }

            return this._database;
        },
        getSql: function (name){
            var _database = this.getDataBase(name);
            if(!_database){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 DataBase is Null.",
                    detail: "HTTP/1.1 403 DataBase is Null, You Need Configuration For DataBase."
                });
            }

            return _database.Builder;
        },
        getConnector: function (name){
            var _database = this._database || this.getDataBase(name);
            if(!_database){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 DataBase is Null.",
                    detail: "HTTP/1.1 403 DataBase is Null, You Need Configuration For DataBase."
                });
            }

            return _database.connector;
        },
        createTransactionBlock: function (){
            var _connector = this.getConnector();
            if(!_connector){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 Connector is Null.",
                    detail: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }

            return _connector.createTransactionBlock();
        },
        beginTransaction: function (events, before, after){
            var _connector = this.getConnector();
            if(!_connector){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 Connector is Null.",
                    detail: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }

            return _connector.beginTransaction(events, before, after);
        },
        beginPoolTransaction: function (events, before, after){
            var _connector = this.getConnector();
            if(!_connector){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 Connector is Null.",
                    detail: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }

            return _connector.beginPoolTransaction(events, before, after);
        },
        query: function (){
            var _connector = this.getConnector();
            if(!_connector){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 Connector is Null.",
                    detail: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }
            return _connector.query.apply(_connector, arguments);
        }
    }
});