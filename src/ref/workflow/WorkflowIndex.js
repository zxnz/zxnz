module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        parent_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        schema_root_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Schema_Type: {
            value: null,
            type: ['varchar', 20],
            default: 'category'
        },
        Tags: {
            value: null,
            type: ['varchar', 2000],
            default: ","
        },
        Befores: {
            value: null,
            type: ['varchar', 2000],
            default: ","
        },
        Afters: {
            value: null,
            type: ['varchar', 2000],
            default: ","
        },
        Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
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
        Code_Format: {
            value: null,
            type: ['varchar', 20],
            default: 'CN-{Ymd}-{id, 5}'
        },
        Url: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Icon: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Json_Schema: {
            value: null,
            type: ['text'],
            default: null
        },
        Xml_Schema: {
            value: null,
            type: ['text'],
            default: null
        }
    }
});