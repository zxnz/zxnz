var zeanium_mysql = require("@zeanium/database-mysql");

module.exports = zn.Class({
    properties: {
        connector: null,
        sql: null
    },
    methods: {
        init: function (config, events){
            this._connector = zeanium_mysql.createConnector(config, events);
            this._sql = zeanium_mysql.createSqlBuilder();
        },
        getConnector: function (){
            return this._connector;
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