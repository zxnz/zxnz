module.exports = zn.Controller('zxnz.web.logger', {
    Service: require('./WebLoggerService'),
    methods: {
        info: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.info(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        debug: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.debug(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        trace: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.trace(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        success: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.success(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        warn: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.warn(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        error: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.error(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        log: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.log(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        }
    }
});
