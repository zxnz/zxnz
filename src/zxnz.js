/*Add current path to NODE_PATH*/
var path = require('path');
var _curr = process.cwd() + path.sep + 'node_modules',
    _curr_node_path = process.env.NODE_PATH || '', 
    _parents = module.constructor._nodeModulePaths(_curr),
    _node_path = null;
process.argv.forEach(function (argument){
    if(argument.toString().indexOf('node_path:') == 0){
        _node_path = path.resolve(process.cwd(), argument.split(':')[1]);
    }
});

if(_node_path){
    _curr_node_path = _curr_node_path + path.delimiter + _node_path;
}
process.env.NODE_PATH = _curr_node_path + path.delimiter + _parents.join(path.delimiter);
module.constructor._initPaths();
module.exports = require('zeanium'), zn.ZN_PATH = __dirname;
