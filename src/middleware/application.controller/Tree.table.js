module.exports = zn.Controller('zxnz.tree.table', {
    validate: true,
    methods: {
        orderNode: {
            method: 'GET/POST',
            argv: {
                table: null,
                id: null,
                order: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.orderNode(request.getValue('id'), request.getValue('order')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        moveNode: {
            method: 'GET/POST',
            argv: {
                table: null,
                source: null,
                target: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.moveNode(request.getValue('source'), request.getValue('target')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        editNodeById: {
            method: 'GET/POST',
            argv: {
                table: null,
                data: null,
                id: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.editNodeById(request.getJSON('data'), request.getValue('id')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        addNode: {
            method: 'GET/POST',
            argv: {
                table: null,
                data: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.addNode(request.getJSON('data')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        addNodeByPid: {
            method: 'GET/POST',
            argv: {
                table: null,
                data: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.addNodeByPid(request.getValue('pid'), request.getJSON('data')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        deleteNode: {
            method: 'GET/POST',
            argv: {
                table: null,
                where: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.deleteNode(request.getJSON('where')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        deleteChildByPid: {
            method: 'GET/POST',
            argv: {
                table: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.deleteChildByPid(request.getValue('pid')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        deleteAllChildByPid: {
            method: 'GET/POST',
            argv: {
                table: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.deleteAllChildByPid(request.getValue('pid')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        selectChild: {
            method: 'GET/POST',
            argv: {
                table: null,
                where: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.selectChild(request.getValue()))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        selectChildByPid: {
            method: 'GET/POST',
            argv: {
                table: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.selectChildByPid(request.getValue('pid')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        },
        selectAllChildByPid: {
            method: 'GET/POST',
            argv: {
                table: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _table = request.getValue('table');
                var _sqlBlock = new zxnz.ref.TreeSqlBlock(_table, zxnz.store);
                zxnz.store
                    .beginPoolTransaction()
                    .block(_sqlBlock.selectAllChildByPid(request.getValue('pid')))
                    .commit()
                    .then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
            }
        }
    }
});
