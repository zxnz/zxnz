var refSqlMetas = require('./ref/zxnz.sql.js');
module.exports = zn.Class({
    events: [ 'onSqlBuilderCreate', 'onZxnzSqlCreate' ],
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
        }
    },
    methods: {
        init: function (){
            this._database = null;
            this._databases = {};
        },
        createSql: function (session, database){
            return this.createSqlBuilder(session, database);
        },
        createSqlBuilder: function (session, database){
            var _database = database || this._database;
            if(!_database || !_database.createSqlBuilder) {
                throw new Error('database or database.getSqlBuilder is null.');
            }
            var _sqlBuilder = _database.createSqlBuilder(session);
            _sqlBuilder.loadMetas(refSqlMetas);

            this.fire('onSqlBuilderCreate', _sqlBuilder);

            return _sqlBuilder;
        },
        registerDataBases: function (databases, events){
            switch(zn.type(databases)){
                case 'array':
                    for(var database of databases) {
                        this.registerDataBase(database, events);
                    }
                    break;
                case 'object':
                    this.registerDataBase(databases, events);
            }
        },
        registerDataBase: function (config, events){
            var _config = config || {};
            var _name = _config.name || _config.database;
            var _modules = _config.modules.slice(0);
            var _database = zxnz.require(_modules);
            if(_database.createConnector && typeof _database.createConnector == 'function') {
                _database.connector = _database.createConnector(_config, events);
            }
            if(_config.default){
                this.setCurrentDataBase(_database);
            }

            return this._databases[_name] = _database, _database;
        },
        setCurrentDataBase: function (database){
            this._database = database;
            zxnz.database = database;
            zxnz.connector = database.connector;
            zxnz.sql = this.createSqlBuilder();

            this.fire('onZxnzSqlCreate', zxnz.sql);
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