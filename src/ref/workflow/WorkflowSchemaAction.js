module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ""
        },
        Order: {
            value: null,
            type: ['varchar', 10],
            default: '__init__'  //__before__, __init__, __after__
        },
        Type: {
            value: null,
            type: ['varchar', 50],
            default: 'url'  //url, email, message, sms
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
        Parameters: {
            value: null,
            type: ['text'],
            default: null
        },
        Disabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        }
    }
});