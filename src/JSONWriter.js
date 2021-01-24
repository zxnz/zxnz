var node_path = require('path');
var node_fs = require('fs');
var _slice = Array.prototype.slice;

module.exports = zn.Class({
    properties: {
        output: {
            readonly: true,
            get: function (){
                return this._output;
            }
        }
    },
    methods: {
        init: {
            auto: true,
            value: function (output, options){
                this._output = output || 'json_output.json';
                this._options = zn.extend({ 
                    dir: './',
                }, options);
                this._dir = node_path.resolve(process.cwd(), this._options.dir);
                if(!node_fs.existsSync(this._dir)){
                    node_fs.mkdirSync(this._dir, { recursive: true });
                }
            }
        },
        setKeyValue: function (key, value){
            if(!key) return null;
            var _file = node_path.join(this._dir, this._output),
                _content = {};
            
            if(node_fs.existsSync(_file)){
                _content = require(_file);
            }

            zn.path(_content, key, value);
    
            return node_fs.writeFileSync(_file, JSON.stringify(_content, null, 4)), this;
        },
        getKeyValue: function (key){
            return this.getKey(key);
        },
        getKey: function (key){
            if(!key) return null;
            var _file = node_path.join(this._dir, this._output),
                _content = {};
            
            if(node_fs.existsSync(_file)){
                _content = require(_file);
            }

            return zn.path(_content, key);
        }
    }
});