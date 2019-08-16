var node_path = require('path'),
    __slice = Array.prototype.slice;

var __ = {
    getProcessArgvNodePaths: function (){
        var _node_paths = [];
        process.argv.forEach(function (_argument){
            _argument = _argument.toString();
            if(_argument.indexOf('node_path:') == 0){
                _node_paths.push(_argument.split(':')[1]);
            }

            if(_argument.indexOf('node_paths:') == 0){
                _node_paths.concat(_argument.split(':')[1].split(','));
            }
        });

        return _node_paths;
    },
    resolve: function (paths, includeParentPath){
        if(typeof paths == 'string'){
            paths = [paths];
        }
        
        paths = paths || [];
        if(!paths || !paths.forEach || !paths.length){
            return false;
        }

        var _path = null;
            _resolvePaths = [],
            _cwd = process.cwd(),
            _curr_node_path = node_path.resolve(_cwd, 'node_modules'),
            _env_node_path = process.env.NODE_PATH || '';
        
        paths.forEach(function (path){
            _path = node_path.resolve(_cwd, path);
            _resolvePaths.push(_path);
            if(includeParentPath){
                _resolvePaths = _resolvePaths.concat(module.constructor._nodeModulePaths(_path));
            }
        });

        _resolvePaths.unshift(_curr_node_path);
        if(_env_node_path){
            _resolvePaths.push(_env_node_path);
        }

        process.env.NODE_PATH = _resolvePaths.join(node_path.delimiter);
        module.constructor._initPaths();
        zn.NODE_PATHS = _resolvePaths;

        return _resolvePaths;
    }
}


var zxnz = {
    app: {},
    plugin: {},
    store: {},
    require: function (){
        var _argv = __slice.call(arguments);
        if(_argv.length == 1 && zn.is(_argv[0], 'array')){
            _argv = _argv[0];
        }
        
        var _value = _argv.shift();
        if(_value){
            try {
                _value = require(_value);
            } catch (err){
                if(_argv.length){
                    return arguments.callee.apply(null, _argv);
                }else{
                    zn.error(err);
                    throw err;
                }
            }
        }
        
        return _value;
    },
    resolve: function (paths, includeParentPath){
        return __.resolve(paths, includeParentPath);
    }
}

__.resolve(__.getProcessArgvNodePaths(), true)

if(!zn){
    zxnz.require('@zeanium/core', 'zeanium');
}

module.exports = zn.GLOBAL.zxnz = zxnz;
