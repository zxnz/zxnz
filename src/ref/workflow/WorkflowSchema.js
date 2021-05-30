module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        child_index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Befores: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Afters: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Wechat_Notify_Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        SMS_Notify_Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Email_Notify_Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Previous_Nodes: {
            value: null,
            type: ['varchar', 2000],
            default: ','
        },
        Next_Nodes: {
            value: null,
            type: ['varchar', 2000],
            default: ','
        },
        Previous_Ids: {
            value: null,
            type: ['varchar', 200],
            default: ','
        },
        Next_Ids: {
            value: null,
            type: ['varchar', 200],
            default: ','
        },
        Type: {
            value: null,
            type: ['varchar', 10],
            default: 'normal'
        },
        Icon: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Attrs: {
            value: null,
            type: ['varchar', 3000],
            default: ""
        }
    }
});