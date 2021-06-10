module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
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
            type: ['text'],
            default: null
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