var node_fs = require('fs'),
    node_path = require('path');

module.exports = zn.Controller('__zxnz__', {
    service: require('./Application.ControllerService'),
    methods: {
        setup: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){

            }
        },
        initDataBase: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                zxnz.store.createDataBase().then(function (data){
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
                var _model = request.getValue('model'),
                    _Model = application.models[_model];
                if(_Model){
                    zxnz.store.query(_Model.getCreateModelSql()).then(function (data){
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
                var _models = application.models;
                var _tran = zxnz.store.beginTransaction();
                for(var key in _models){
                    _tran.query(_models[key].getCreateModelSql());
                }

                _tran.on('error', function (sender, err){
                    response.error(err);
                }).on('finally', function (sender, data){
                    response.success(data);
                }).commit();
            }
        },
        initData: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _basePath = application.config.root,
                    _dataPath = node_path.join(_basePath, 'src', 'data'),
                    _self = this;
                if(node_fs.existsSync(_dataPath)){
                    var _fns = [],
                        _sql = '',
                        _data = {},
                        _file = null,
                        _content = null;
                    node_fs.readdirSync(_dataPath).forEach(function (file){
                        _content = node_fs.readFileSync(node_path.join(_dataPath, file), 'utf-8');
                        _file = node_path.parse(node_path.join(_dataPath, file));
                        switch (_file.ext.toLowerCase()) {
                            case '.sql':
                                if(file.indexOf('zn_function_')!=-1){
                                    _fns = _fns.concat(_content.split('----'));
                                }else {
                                    _sql += _content;
                                }
                                break;
                            case '.json':
                                _data[_file.name] = JSON.parse(_content);
                                break;
                        }
                    });
                    var _tran = zxnz.store.beginTransaction(),
                        _dataSql = this._service.parseJsonData(_data);
                    _fns.length && _fns.forEach(function (fn_sql){
                        fn_sql && _tran.query(fn_sql);
                    });
                    _sql && _tran.query(_sql);
                    _dataSql.length && _tran.query(_dataSql.join(''));
                    _tran.on('error', function (sender, err){
                        response.error(err);
                    }).on('finally', function (sender, data){
                        response.success(data);
                    }).commit();
                }else {
                    response.error('不存在 ./src/data 路径');
                }
            }
        },
        initFunction: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _basePath = application.config.root,
                    _dataPath = node_path.join(_basePath, 'src', 'function'),
                    _self = this;
                if(node_fs.existsSync(_dataPath)){
                    var _fns = [],
                        _sql = '',
                        _data = {},
                        _file = null,
                        _content = null;
                    node_fs.readdirSync(_dataPath).forEach(function (file){
                        _content = node_fs.readFileSync(node_path.join(_dataPath, file), 'utf-8');
                        _file = node_path.parse(node_path.join(_dataPath, file));

                        switch (_file.ext.toLowerCase()) {
                            case '.sql':
                            case '.txt':
                                if(file.indexOf('zn_function_')!=-1){
                                    _fns = _fns.concat(_content.split('----'));
                                }else {
                                    _sql += _content;
                                }
                                break;
                        }
                    });
                    var _tran = zxnz.store.beginTransaction();
                    _fns.length && _fns.forEach(function (fn_sql){
                        fn_sql && _tran.query(fn_sql);
                    });
                    _sql && _tran.query(_sql);
                    _tran.on('error', function (sender, err){
                        response.error(err);
                    }).on('finally', function (sender, data){
                        response.success(data);
                    }).commit();
                }else {
                    response.error('不存在 ./src/function 路径');
                }
            }
        }
    }
});
