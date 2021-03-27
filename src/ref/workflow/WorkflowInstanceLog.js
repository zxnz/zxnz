module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        instance_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        instance_step_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Content: {
            value: null,
            type: ['varchar', 5000],
            default: ''
        },
        Attachments: {
            value: null,
            type: ['varchar', 5000],
            default: ","
        }
    }
});