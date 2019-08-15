var ApplicationController = require('./Application.Controller');
module.exports = zn.Middleware.Application({
    methods: {
        initial: function (application, config, serverContext){
            
        },
        initControllers: function (application, controllers){
            controllers['__zxnz__'] = ApplicationController;
        }
    }
});