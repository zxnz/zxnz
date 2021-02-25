var node_path = require('path'),
    node_fs = require('fs'),
    __slice = Array.prototype.slice;

var __ = {
    __parseArgv__: function (argv){
        var _env = [],
            _keys = {},
            _key = '',
            _value = null,
            _counter = {},
            _started = false;
        for(var i = 0, _len = argv.length; i < _len; i++){
            _value = argv[i];
            if(_value.indexOf('--') !== -1){
                _key = _value.replace('--', '');
                _keys[_key] = true;
                _counter[i+1] = _key;
                if(!_started) {
                    _started = true;
                }
            }else{
                if(_started){
                    if(_counter[i]) {
                        _keys[_counter[i]] = _value;
                    }else{
                        var _i = i - 1;
                        while (!_counter[_i] && _i > 0) {
                            _i = _i - 1;
                        }
                        if(_counter[_i]){
                            var _keyValue = _keys[_counter[_i]];
                            if(_keyValue != null){
                                if(typeof _keyValue === 'string'){
                                    _keys[_counter[_i]] = [_keyValue, _value];
                                } else if(typeof _keyValue === 'object'){
                                    _keys[_counter[_i]].push(_value);
                                }
                            }else {
                                _keys[_counter[_i]] = _value;
                            }
                        }
                    }
                }else {
                    _env.push(_value);
                }
            }
        }

        return {
            env: _env,
            argv: _keys
        };
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
                    zn.error('zxnz.require', err);
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

var _argv = __.__parseArgv__(process.argv).argv,
    _config = {};
if(node_fs.existsSync(node_path.resolve(process.cwd(), _argv.config || './zn.server.config.js'))) {
    _config = require(node_path.resolve(process.cwd(), _argv.config || './zn.server.config.js'));
}

if(_argv.mode){
    process.env.NODE_ENV = _argv.mode;
}else{
    process.env.NODE_ENV = "production";
}

if(_argv.node_path) {
    __.resolve(_argv.node_path, true);
}

if(_config.node_path) {
    __.resolve(_config.node_path, true);
}

if(!global.zn){
    if(_argv.zn_path){
        zxnz.require(_argv.zn_path);
    }else if(_config.zn_path){
        zxnz.require(_config.zn_path);
    }else {
        zxnz.require('zeanium', '@zeanium/core');
    }
}

zxnz.JSONWriter = require('./JSONWriter');
zxnz.store = require('./zxnz.store.js');

module.exports = global.zxnz = zxnz;