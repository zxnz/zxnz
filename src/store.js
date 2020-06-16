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
        registerDataBases: function (databases){
            switch(zn.type(databases)){
                case 'array':
                    return databases.map((database)=>this.registerDataBase(database));
                case 'object':
                    return this.registerDataBase(databases);
            }
        },
        registerDataBase: function (config){
            var _name = config.name || config.database;
            var _database = zxnz.require(config.modules);
            _database.connector = new _database.Connector(config);
            if(config.default){
                this.setCurrentDataBase(_database);
            }

            return this._databases[_name] = _database, _database;
        },
        setCurrentDataBase: function (database){
            this._database = database;
            zxnz.sql = database.Builder;
        },
        getDataBase: function (name){
            return this._databases[name||''] || this._database;
        },
        getSql: function (name){
            var _database = this.getDataBase(name);
            if(!_database){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 DataBase is Null.",
                    details: "HTTP/1.1 403 DataBase is Null, You Need Configuration For DataBase."
                });
            }

            return _database.Builder;
        },
        getConnector: function (name){
            var _database = this.getDataBase(name);
            if(!_database){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 DataBase is Null.",
                    details: "HTTP/1.1 403 DataBase is Null, You Need Configuration For DataBase."
                });
            }

            return _database.connector;
        },
        beginTransaction: function (name){
            var _connector = this.getConnector(name);
            if(!_connector){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 Connector is Null.",
                    details: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }

            return _connector.beginTransaction();
        },
        query: function (){
            var _connector = this.getConnector();
            if(!_connector){
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "HTTP/1.1 403 Connector is Null.",
                    details: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }
            return _connector.query.apply(_connector, arguments);
        },
        createDataBase: function (name) {
            return this.getConnector(name).createDataBase();
        }
    }
});