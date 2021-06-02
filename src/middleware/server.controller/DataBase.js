module.exports = zn.Controller('zxnz.database', {
    Service: require('./DataBaseService'),
    methods: {
        getAllProcedures: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _config = zxnz.store.database.connector.config;
                var _fields = request.getValue('fields');
                zxnz.store
                    .beginPoolTransaction()
                    .query(zxnz.sql.select({
                        table: 'mysql.proc',
                        fields: _fields || 'db, name, type, specific_name, param_list, returns, body, created, modified, body_utf8',
                        where: {
                            db: _config.database,
                            type: 'PROCEDURE'
                        }
                    }))
                    .commit()
                    .then(function (data){
                        data.forEach(function (item){
                            if(item.param_list) {
                                item.param_list = item.param_list.toString('utf8');
                            }
                            if(item.returns) {
                                item.returns = item.returns.toString('utf8');
                            }
                            if(item.body) {
                                item.body = item.body.toString('utf8');
                            }
                            if(item.body_utf8) {
                                item.body_utf8 = item.body_utf8.toString('utf8');
                            }
                        })
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        getAllFunctions: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _config = zxnz.store.database.connector.config;
                var _fields = request.getValue('fields');
                zxnz.store
                    .beginPoolTransaction()
                    .query(zxnz.sql.select({
                        table: 'mysql.proc',
                        fields: _fields || 'db, name, type, specific_name, param_list, returns, body, created, modified, body_utf8',
                        where: {
                            db: _config.database,
                            type: 'FUNCTION'
                        }
                    }))
                    .commit()
                    .then(function (data){
                        data.forEach(function (item){
                            if(item.param_list) {
                                item.param_list = item.param_list.toString('utf8');
                            }
                            if(item.returns) {
                                item.returns = item.returns.toString('utf8');
                            }
                            if(item.body) {
                                item.body = item.body.toString('utf8');
                            }
                            if(item.body_utf8) {
                                item.body_utf8 = item.body_utf8.toString('utf8');
                            }
                        })
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
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
