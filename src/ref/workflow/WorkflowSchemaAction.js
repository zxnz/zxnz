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
            type: ['varchar', 250],
            default: 'url'  //url, email, message, sms
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
        Parameters: {
            value: null,
            type: ['varchar', 2500],
            default: ''
        },
        Disabled: {
            value: null,
            type: ['int', 11],
            default: 1
        }
    }
});