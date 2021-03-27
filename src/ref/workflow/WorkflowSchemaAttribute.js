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
            type: ['varchar', 250],
            default: ''
        },
        Value: {
            value: null,
            type: ['varchar', 2500],
            default: ''
        },
        Disabled: {
            value: null,
            type: ['int', 11],
            default: 0
        }
    }
});