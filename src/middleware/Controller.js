var dbmysql = require('zeanium-database-mysql');
var ControllerMixin = require('./Controller.Mixin');
module.exports = zn.Middleware.Controller({
    methods: {
        initial: function (controller, application, serverContext){
            var _databases = serverContext.config.databases,
                _database = null,
                _stores = {};
            for(var key in _databases){
                _database = _databases[key];
                _stores[key] = dbmysql.Store.getStore(_database);
                if(_database.default && !this._store){
                    controller._store = _stores[key];
                }
            }

            controller._stores = _stores;
        },
        define: function (name, meta){
            meta.mixins = [ ControllerMixin ];
            return meta;
        }
    }
});