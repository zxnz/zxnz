module.exports = zn.Controller('zxnz.database', {
    Service: require('./DataBaseService'),
    methods: {
        getAllTables: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                this.service.getAllTables()
                    .then(function (data){
                        response.success(data);
                    }, function (error){
                        response.error(error);
                    });
            }
        },
        getAllFieldByTable: {
            method: 'GET/POST',
            argv: {
                table: null
            },
            value: function (request, response, application, context, router){
                var _table = request.getValue('table');
                this.service.getAllFieldByTable(_table)
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        dropTable: {
            method: 'GET/POST',
            argv: {
                table: null
            },
            value: function (request, response, application, context, router){
                this.service.dropTable(request.getValue('table'))
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        dropColumn: {
            method: 'GET/POST',
            argv: {
                table: null,
                column: null
            },
            value: function (request, response, application, context, router){
                this.service.dropColumn(request.getValue('table'), request.getValue('column'))
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        addColumn: {
            method: 'GET/POST',
            argv: {
                table: null,
                column: null
            },
            value: function (request, response, application, context, router){
                this.service.addColumn(request.getValue('table'), request.getJSON('column'))
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        changeColumn: {
            method: 'GET/POST',
            argv: {
                table: null,
                column: null
            },
            value: function (request, response, application, context, router){
                this.service.changeColumn(request.getValue('table'), request.getJSON('column'))
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        }
    }
});
