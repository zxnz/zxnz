var node_path = require('path'),
    __slice = Array.prototype.slice;
var __ = {
    getProcessArgvNodePaths: function (){
        var _paths = {
                zn_path: [],
                node_path: []
            },
            _path = null;
        process.argv.forEach(function (_argument){
            _argument = _argument.toString().trim();
            if(_argument.indexOf(':') == -1){
                return;
            }

            _path = (_argument.split(':')[1]).trim();
            if(_argument.indexOf('zn_path:') == 0){
                _paths['zn_path'].push(_path);
            }

            if(_argument.indexOf('node_path:') == 0){
                _paths['node_path'].push(_path);
            }

            if(_argument.indexOf('node_paths:') == 0){
                _path = _path.split(',');
                _paths['node_path'].concat(_path);
            }
        });

        return _paths;
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
    store: {},
    plugin: {},
    module: {},
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

var _path = __.getProcessArgvNodePaths();
__.resolve(_path.node_path, true);

if(!zn){
    if(_path.zn_path.length){
        zxnz.require.apply(zxnz, _path.zn_path);
    }else{
        zxnz.require('@zeanium/core', 'zeanium');
    }
}

module.exports = zn.GLOBAL.zxnz = zxnz;
