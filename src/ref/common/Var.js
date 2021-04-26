module.exports = zxnz.ModelRef('zxnz_var_', {
    properties: {
        Disabled: {
            value: null,
            type: ['bit', 4],
            default: 0
        },
        Value: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Label: {
            value: null,
            type: ['varchar', 1000],
            default: ''
        },
        Icon: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Status: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Url: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Url_Hash: {
            value: null,
            type: ['varchar', 200],
            default: '',
        }
    }
});