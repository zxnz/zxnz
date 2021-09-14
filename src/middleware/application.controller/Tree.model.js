module.exports = zn.Controller('zxnz.tree.model', {
    validate: true,
    methods: {
        orderNode: {
            method: 'GET/POST',
            argv: {
                model: null,
                id: null,
                order: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.orderNode(request.getValue('id'), request.getValue('order')).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        moveNode: {
            method: 'GET/POST',
            argv: {
                model: null,
                source: null,
                target: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.moveNode(request.getValue('source'), request.getValue('target')).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        editNodeById: {
            method: 'GET/POST',
            argv: {
                model: null,
                data: null,
                id: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.editNodeById(request.getJSON('data'), request.getValue('id')).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        addNode: {
            method: 'GET/POST',
            argv: {
                model: null,
                data: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.addNode(request.getJSON('data'), session).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        addNodeByPid: {
            method: 'GET/POST',
            argv: {
                model: null,
                data: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.addNodeByPid(request.getValue('pid'), request.getJSON('data'), session).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        deleteNode: {
            method: 'GET/POST',
            argv: {
                model: null,
                where: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.deleteNode(request.getJSON('where')).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        deleteChildByPid: {
            method: 'GET/POST',
            argv: {
                model: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.deleteChildByPid(request.getValue('pid')).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        deleteAllChildByPid: {
            method: 'GET/POST',
            argv: {
                model: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.deleteAllChildByPid(request.getValue('pid')).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        selectChild: {
            method: 'GET/POST',
            argv: {
                model: null,
                where: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.selectChild(request.getValue(), session).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        selectChildByPid: {
            method: 'GET/POST',
            argv: {
                model: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.selectChildByPid(request.getValue('pid'), session).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        selectAllChildByPid: {
            method: 'GET/POST',
            argv: {
                model: null,
                pid: null
            },
            value: function (request, response, application, context, router, session){
                var _Model = context.resolveModel(request.getValue('model'));
                if(!_Model){
                    return response.error('model is not exist.'), false;
                }

                var _dao = _Model.createDao();
                _dao.selectAllChildByPid(request.getValue('pid'), session).then(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        }
    }
});
