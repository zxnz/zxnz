var Controllers = require('./application.controller/index');
module.exports = zn.Middleware.Application({
    reset: false,
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
            zn.debug('mode: ', _mode)
            if(_mode == 'development' || _config.debug){
                Controllers.forEach(function (Controller){
                    controllers[Controller.getMeta('controller')] = Controller;
                });
            }
            /*
            Controllers.forEach(function (Controller){
                if(Controller && Controller.getMeta('controller')) {
                    controllers[Controller.getMeta('controller')] = Controller;
                }
            });
            */
        },
        modelLoaded: function (key, model, application, serverContext){
            model.createModelSql(key, application, serverContext);
        }
    }
});