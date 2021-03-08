module.exports = zxnz.ModelRef('zxnz_constant_', {
    properties: {
        Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Namespace: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Value: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Text: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Data: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        Column_Props: {
            value: null,
            type: ['varchar', 500],
            default: '{}'
        },
        Input_Props: {
            value: null,
            type: ['varchar', 500],
            default: '{}'
        },
        FormItem_Props: {
            value: null,
            type: ['varchar', 500],
            default: '{}'
        }
    }
});