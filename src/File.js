var node_fs = require('fs');
var node_path = require('path');

module.exports = zn.Class({
    static: true,
    properties: {
        
    },
    methods: {
        init: function (){
            
        },
        existsSync: function (file){
            return node_fs.existsSync(file);
        },
        createFile: function (path, data, options) {
            var _options = zn.extend({ forcerm: false }, options);
            if(_options.forcerm && node_fs.existsSync(path)){
                node_fs.unlinkSync(path);
            }
            node_fs.writeFileSync(path, data, options);
        },
        copyFile: function (source, target, flags) {
            node_fs.copyFileSync(source, target, flags || node_fs.constants.COPYFILE_FICLONE);
        },
        copyFolder: function (source, target, options) {
            var _options = zn.extend({ forcerm: true }, options),
                _forcerm = _options.forcerm,
                _dir = node_fs.readdirSync(source, {
                    withFileTypes: true
                });
    
            _dir.forEach((dirent)=>{
                var _sfile = node_path.resolve(source, dirent.name),
                    _tfile = node_path.resolve(target, dirent.name),
                    _tExist = node_fs.existsSync(_tfile);
                
                if(!_forcerm && _tExist){
                    return false;
                }
    
                if(dirent.isDirectory()){
                    if(!_tExist) {
                        node_fs.mkdirSync(_tfile);
                    }
                    this.copyFolder(_sfile, _tfile, _options);
                }else if(dirent.isFile()){
                    if(_forcerm && _tExist) {
                        node_fs.chmodSync(_tfile, 0o777);
                        node_fs.unlinkSync(_tfile);
                    }
                    this.copyFile(_sfile, _tfile);
                    _options.callback && _options.callback(dirent, _tfile);
                }
            });
        },
        unlinkFile: function (path){
            node_fs.chmodSync(path, 0o777);
            node_fs.unlinkSync(path);
        },
        unlinkFolder: function (path, callback){
            if(node_fs.existsSync(path)){
                var _dir = node_fs.readdirSync(path, { withFileTypes: true });
                _dir.forEach((dirent)=>{
                    var _path = node_path.resolve(path, dirent.name);
                    if(dirent.isDirectory()){
                        this.unlinkFolder(_path, callback);
                        node_fs.rmdirSync(_path);
                    }else if(dirent.isFile()){
                        this.unlinkFile(_path);
                    }
    
                    callback && callback(dirent);
                });
            }
        },
        eachdir: function (path, callback){
            if(node_fs.existsSync(path)){
                var _dir = node_fs.readdirSync(path, { withFileTypes: true });
                _dir.forEach((dirent)=>{
                    callback && callback(dirent, node_path.resolve(path, dirent.name));
                });
            }
        },
        mkdir: function (dir){
            if(dir && !node_fs.existsSync(dir)){
                node_fs.mkdirSync(dir, { recursive: true });
            }
        },
        checkFilePath: function (filePath){
            if(node_fs.existsSync(filePath)) {
                return true;
            }
            if(filePath){
                var _paths = filePath.split('/'), _dir = '/';
                for(var path of _paths) {
                    if(path.indexOf('.') == -1){
                        _dir += path + '/';
                        if(!node_fs.existsSync(_dir)) {
                            node_fs.mkdirSync(_dir, { recursive: true });
                        }
                    }
                }
            }
        },
        getTimePath: function (separator, year, month, day){
            var _now = new Date(), _paths = [];
            if(year){
                _paths.push(_now.getFullYear());
            }
            if(month){
                _paths.push(_now.getMonth() + 1);
            }
            if(day){
                _paths.push(_now.getDate());
            }

            return _paths.join(separator || '/');
        },
        getCwdFilePath: function (file) {
            return node_path.resolve(process.cwd(), file);
        },
        getDirFilePath: function (file) {
            return node_path.resolve(__dirname, file);
        },
        appendText: function (fileName, text, rowSeparator){
            if(!fileName) return false;
            if(rowSeparator){
                text = text + rowSeparator;
            }
            if(fileName.charAt(0) != '/'){
                fileName = this.getCwdFilePath(fileName);
            }
            this.checkFilePath(fileName);
            
            if(!node_fs.existsSync(fileName)){
                node_fs.writeFileSync(fileName, text);
            }else{
                node_fs.appendFileSync(fileName, text);
            }

            return this;
        },
        requireJson: function (path){
            return require(path);
        },
        readJsonSync: function (filename) {
            return JSON.parse(node_fs.readFileSync(filename, 'utf8'));
        },
        writeText: function (fileName, text){
            if(!fileName) return false;
            if(fileName.charAt(0) != '/'){
                fileName = this.getCwdFilePath(fileName);
            }
            this.checkFilePath(fileName);
            node_fs.writeFileSync(fileName, text);

            return;
        },
        writeJSON: function (fileName, jsonContent){
            if(!fileName) return false;
            var _filePath = this.getCwdFilePath(fileName);
            this.checkFilePath(filePath);
            return node_fs.writeFileSync(_filePath, JSON.stringify(jsonContent, null, 4)), this;
        },
        writeJsonSync: function (filePath, jsonContent){
            if(!filePath) return false;
            this.checkFilePath(filePath);
            //node_fs.writeFileSync(filename, JSON.stringify(json, null, "\t"));
            return node_fs.writeFileSync(filePath, (zn.is(jsonContent, 'object')||zn.is(jsonContent, 'array'))?JSON.stringify(jsonContent, null, 4):jsonContent), this;
        }
    }
});