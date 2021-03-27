module.exports = zn.Controller('zxnz.application', {
    Service: require('./ApplicationService'),
    methods: {
        setup: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){

            }
        },
        initDataBase: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.initDataBase()
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        initModel: {
            method: 'GET/POST',
            argv: {
                model: null
            },
            value: function (request, response, application, context, router){
                //zn.debug(Object.keys(context._models));
                var _model = request.getValue('model'),
                    _Model = application.resolveModel(_model) || context.resolveModel(_model);
                if(_Model){
                    this.service.initModel(_Model)
                        .then(function (data){
                            response.success(data);
                        }, function (err){
                            response.error(err);
                        });
                }else{
                    response.error('The model ' + _model + ' is not exist!');
                }
            }
        },
        initModels: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.initModels()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        initFunction: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.initFunction(request, response, application, context, router)
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        }
    }
});
