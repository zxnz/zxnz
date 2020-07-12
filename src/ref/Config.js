module.exports = zxnz.ModelRef('zxnz_config_', {
    properties: {
        Namespace: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Namespaces: {
            value: null,
            type: ['varchar', 200],
            default: ','
        },
        Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Name: {
            value: null,
            type: ['varchar', 100],
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
        Input_Props: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        Column_Props: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        FormItem_Props: {
            value: null,
            type: ['varchar', 500],
            default: ''
        }
    }
});