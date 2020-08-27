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
            var _tran = zxnz.store.beginPoolTransaction();
            for(var model of this.application._modelArray){
                _tran.query(model.getCreateModelSql());
            }

            return _tran.commit();
        },
        initFunction: function (request, response, application, context, router){
            var _config = this.application.config,
                _dataPath = _config.dataPath || './src/data/';
            _dataPath = node_path.join(_config.root, _dataPath);
            if(!node_fs.existsSync(_dataPath)){
                return response.error('dataPath "' + _dataPath + '" is not exist!');
            }
            var _tran = zxnz.store.beginPoolTransaction();
            var _file = null,
                _content = null;
            node_fs.readdirSync(_dataPath).forEach(function (file){
                _content = node_fs.readFileSync(node_path.join(_dataPath, file), 'utf-8');
                _file = node_path.parse(node_path.join(_dataPath, file));
                if(_file.ext.toLowerCase() == '.sql'){
                    _content.split('----').forEach(function (sqlString){
                        if(sqlString){
                            _tran.query(sqlString);
                        }
                    });
                }
            });

            return _tran.commit();
        }
    }
});