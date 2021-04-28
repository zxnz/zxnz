var node_fs = require('fs');
var node_path = require('path');
module.exports = zn.Controller('zxnz.logger', {
    methods: {
        dirs: {
            method: 'GET/POST',
            argv: {

            },
            value: function (request, response, application, context, router){
                var _values = request.getValue();
                var _logger = context.logger;
                var _filePath = _logger.resolveDirPath(_values.year, _values.month, _values.date);
                if(_filePath){
                    var _dirs = node_fs.readdirSync(_filePath).map(function (name){
                        var _stat = node_fs.statSync(node_path.join(_filePath, name));
                        return {
                            name: name,
                            size: _stat.size,
                            atime: _stat.atime.toLocaleString(),
                            birthtime: _stat.birthtime.toLocaleString(),
                            mtime: _stat.mtime.toLocaleString(),
                            ctime: _stat.ctime.toLocaleString(),
                            isFile: _stat.isFile(),
                            isDirectory: _stat.isDirectory()
                        };
                    });

                    response.success(_dirs);
                }else{
                    response.error('文件不存在');
                }
            }
        },
        logs: {
            method: 'GET/POST',
            argv: {
                year: null,
                month: null,
                date: null,
                module: null
            },
            value: function (request, response, application, context, router){
                var _values = request.getValue();
                var _logger = context.logger;
                var _filePath = _logger.resolveModuleDirPath(_values.year, _values.month, _values.date, _values.module);
                if(_filePath){
                    var _data = node_fs.readFileSync(_filePath, 'utf8');
                    response.success(_data.split(_logger.rowSeparator));
                }else{
                    response.error('文件不存在');
                }
            }
        },
        jsons: {
            method: 'GET/POST',
            argv: {
                year: null,
                month: null,
                date: null,
                module: null
            },
            value: function (request, response, application, context, router){
                var _values = request.getValue();
                var _logger = context.logger;
                var _filePath = _logger.resolveModuleDirPath(_values.year, _values.month, _values.date, _values.module);
                if(_filePath){
                    var _data = require(_filePath);;
                    response.success(_data);
                }else{
                    response.error('文件不存在');
                }
            }
        }
    }
});
