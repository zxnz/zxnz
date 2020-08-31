var Controllers = require('./application.controller/index');
module.exports = zn.Middleware.Application({
    methods: {
        initial: function (application, config, serverContext){
            if(config.databases){
                var _events = config.databases.events;
                config.databases.events = null;
                delete config.databases.events;
                zxnz.store.registerDataBases(config.databases, _events);
            }
        },
        initControllers: function (application, controllers){
            var _config = zn.extend({}, application._config, application._serverContext._config),
                _mode = _config.mode || process.env.NODE_ENV;
            /*
            if(_mode == 'development'){
                Controllers.forEach(function (Controller){
                    controllers[Controller.getMeta('controller')] = Controller;
                });
            }*/
            Controllers.forEach(function (Controller){
                controllers[Controller.getMeta('controller')] = Controller;
            });
        }
    }
});