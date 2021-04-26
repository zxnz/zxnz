module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        table_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Field_Order: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Field_Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Field_Convert: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Field_Default: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Field_Detail: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Submit_Type: {
            value: null,
            type: ['tinyint', 1],
            default: 1  //1: 用户报名字段, 2: 用户补充字段 10: 商户字段, 11: 系统字段, -1: 隐藏字段
        },
        Filter_Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 1
        },
        Async_Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Background_Color: {
            value: null,
            type: ['varchar', 10],
            default: ''
        },
        Text_Color: {
            value: null,
            type: ['varchar', 10],
            default: ''
        },
        Category: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Input: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Width: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Value: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Required: {
            value: null,
            type: ['int', 4],
            default: 0
        },
        Hint: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Data: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Props: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Attrs: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        }
    }
});