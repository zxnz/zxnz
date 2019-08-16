/**
 * Created by yangyxu on 9/17/14.
 */
module.exports = zn.Class({
    statics: {
        getStore: function (config, context) {
            return new this(config, context);
        }
    },
    properties: {
        config: {
            readonly: true,
            get: function (){
                return this._config;
            }
        },
        sql: {
            readonly: true,
            get: function (){
                return this._db.Builder;
            }
        }
    },
    methods: {
        init: {
            auto: true,
            value: function (config, context){
                this._dbs = {};
                this._db = null;
                this.__initDBConfig(config);
                context.store = this;
            }
        },
        __initDBConfig: function (config){
            switch(zn.type(config)){
                case 'array':
                    return config.map((db, index)=>this.__initDBConnector(db, index));
                case 'object':
                    return this.__initDBConnector(config);
            }
        },
        __initDBConnector: function (config, name){
            var _name = config.name || name;
            var _db = zxnz.require(config.modules);
            _db.connector = new _db.Connector(config);
            if(_name){
                this._dbs[_name] = _db;
                if(config.default){
                    this._db = _db;
                    zxnz.store = this;
                    zxnz.sql = _db.Builder;
                }
            }else{
                this._db = _db;
                zxnz.store = this;
                zxnz.sql = _db.Builder;
            }

            return _db;
        },
        getConnector: function (name){
            var _db = this._dbs[name||''] || this._db;
            if(_db){
                return _db.connector;
            } else {
                throw new zn.ERROR.HttpRequestError({
                    code: 401,
                    message: "HTTP/1.1 403 Connector is Null.",
                    details: "HTTP/1.1 403 Connector is Null, You Need Configuration For DataBase."
                });
            }
        },
        beginTransaction: function (){
            return this.getConnector().beginTransaction();
        },
        query: function (){
            var _connector = this.getConnector();
            return _connector.query.apply(_connector, arguments);
        },
        createDataBase: function () {
            return this.getConnector().createDataBase();
        }
    }
});