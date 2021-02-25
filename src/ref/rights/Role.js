module.exports = zxnz.ModelRef('zxnz_role_', {
    mixins: [ require('./GroupFK') ],
    properties: {
        Name: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Owners: {
            value: null,
            type: ['varchar', 100],
            default: ','
        },
        Type: {
            value: null,
            type: ['int', 11],
            default: 0  //0: 分类, 1: 部门, 2: 角色, 3: 临时数据
        },
        State: {
            value: null,
            type: ['bit', 4],
            default: 0
        }
    }
});