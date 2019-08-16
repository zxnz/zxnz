var Store = require('../entity/Store');
var ApplicationController = require('./Application.Controller');
module.exports = zn.Middleware.Application({
    methods: {
        initial: function (application, config, serverContext){
            Store.getStore(config.databases || [], application);
        },
        initControllers: function (application, controllers){
            controllers['__zxnz__'] = ApplicationController;
        }
    }
});