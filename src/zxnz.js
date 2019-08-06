/*Add current path to NODE_PATH*/
var path = require('path'),
    _node_path = path.resolve(process.cwd(), 'node_modules'),
    _curr_node_path = process.env.NODE_PATH || '';
process.argv.forEach(function (argument){
    if(argument.toString().indexOf('node_path:') == 0){
        _node_path = path.resolve(process.cwd(), argument.split(':')[1]);
    }
});

var _parents = module.constructor._nodeModulePaths(_node_path);
_parents.unshift(_node_path);
_parents.push(_curr_node_path);
process.env.NODE_PATH = _parents.join(path.delimiter);
module.constructor._initPaths();
module.exports = require('@zeanium/core'), zn.ZN_PATH = __dirname;
