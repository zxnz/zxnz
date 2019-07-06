require('./src/zxnz.js');
zn.GLOBAL.zxnz = {
    Launcher: require('./Launcher'),
    entity: require('./src/entity/index'),
    block: require('./src/block/index'),
    collection: require('./src/collection/index'),
    middleware: require('./src/middleware/index'),
    model: require('./src/model/index'),
    sql: require('./src/zxnz.sql')
};

module.exports = zn.GLOBAL.zxnz;
