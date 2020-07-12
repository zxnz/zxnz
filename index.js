require('./src/zxnz');

if(process.env.NODE_ENV == 'development'){
    zn.debug('zxnz_path: ', __dirname);
}
module.exports = zn.extend(zxnz, {
    entity: require('./src/entity/index.js'),
    ref: require('./src/ref/index.js')
});