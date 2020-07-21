module.exports = zn.Controller('zxnz.file', {
    Service: require('./FileService'),
    methods: {
        uploadFile: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.uploadFile(request)
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        uploadFiles: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.uploadFiles(request)
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        }
    }
});
