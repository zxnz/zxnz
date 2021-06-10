module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        schema_node_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Key: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Value: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Disabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        }
    }
});