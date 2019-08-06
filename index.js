require('./src/zxnz.js');
module.exports = zn.GLOBAL.zxnz = {
    Launcher: require('./src/Launcher'),
    entity: require('./src/entity/index'),
    middleware: require('./src/middleware/index'),
    ref: require('./src/ref/index')
};