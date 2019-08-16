require('./src/zxnz');
module.exports = zn.extend(zxnz, {
    entity: require('./src/entity/index'),
    ref: require('./src/ref/index')
});