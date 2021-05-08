require('./src/zxnz');

if(process.env.NODE_ENV == 'development'){
    var node_path = require('path');
    var node_fs = require('fs');
    var _version = '';
    if(node_fs.existsSync(node_path.join(__dirname, './package.json'))){
        _version = require(node_path.join(__dirname, './package.json')).version;
    }
    zn.debug('zxnz_path', (_version?'[ ' + _version + ' ]':''), ': ', __dirname);
}
module.exports = zn.extend(zxnz, {
    entity: require('./src/entity/index.js'),
    ref: require('./src/ref/index.js')
});