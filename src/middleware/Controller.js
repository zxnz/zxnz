
var zndbmysql = null;
try {
    zndbmysql = require('@zeanium/database-mysql');
} catch (error) {
    try {
        zndbmysql = require('zeanium-database-mysql');
    } catch (error) {
        return zn.error(error), false;
    }
}

zn.mysql = zndbmysql.Builder;
 
var ControllerMixin = require('./Controller.Mixin');
module.exports = zn.Middleware.Controller({
    methods: {
        initial: function (controller, application, serverContext){
            var _databases = serverContext.config.databases,
                _database = null,
                _stores = {};
            for(var key in _databases){
                _database = _databases[key];
                _stores[key] = zndbmysql.Store.getStore(_database);
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