module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        Type: {
            value: null,
            type: ['int', 11],
            default: 0   //0: 登录， 1: 登出, 2: 系统内操作
        },
        Address: {
            value: null,
            type: ['varchar', 250],
            default: ''
        },
        Sql: {
            value: null,
            type: ['varchar', 500],
            default: ''
        }
    }
});