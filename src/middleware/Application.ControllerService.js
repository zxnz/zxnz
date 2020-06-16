var node_fs = require('fs'),
    node_path = require('path');
module.exports = zn.ControllerService({
    methods: {
        initDataBase: function (){
            return zxnz.store.createDataBase();
        },
        initModel: function (Model){
            return zxnz.store.query(Model.getCreateModelSql());
        },
        initModels: function (){
            var _defer = zn.async.defer();
            var _tran = zxnz.store.beginTransaction();
            for(var model of this.application._modelArray){
                _tran.query(model.getCreateModelSql());
            }

            _tran.on('error', function (sender, err){
                _defer.reject(err);
            }).on('finally', function (sender, data){
                _defer.resolve(data);
            }).commit();

            return _defer.promise;
        },
        initFunction: function (){
            var _defer = zn.async.defer(),
                _config = this.application.config;
            if(!_config.dataPath){
                return response.error('The dataPath of config is not exist!');
            }
            var _dataPath = node_path.join(_config.root, _config.dataPath);
            if(!node_fs.existsSync(_dataPath)){
                return response.error('dataPath "' + _dataPath + '" is not exist!');
            }
            var _fns = [],
                _sql = '',
                _file = null,
                _content = null;
            node_fs.readdirSync(_dataPath).forEach(function (file){
                _content = node_fs.readFileSync(node_path.join(_dataPath, file), 'utf-8');
                _file = node_path.parse(node_path.join(_dataPath, file));
                switch (_file.ext.toLowerCase()) {
                    case '.sql':
                    case '.txt':
                        if(file.indexOf('zxnz_function_') != -1){
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
                _defer.reject(err);
            }).on('finally', function (sender, data){
                _defer.resolve(data);
            }).commit();

            return _defer.promise;
        }
    }
});