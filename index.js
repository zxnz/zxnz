require('./src/zxnz');
require('./src/zxnz.sql');
module.exports = zn.extend(zxnz, {
    entity: require('./src/entity/index'),
    ref: require('./src/ref/index')
});