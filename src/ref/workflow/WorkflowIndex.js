module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
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
            type: ['varchar', 3000],
            default: ""
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
            type: ['varchar', 3000],
            default: ""
        },
        Xml_Schema: {
            value: null,
            type: ['varchar', 3000],
            default: ''
        }
    }
});