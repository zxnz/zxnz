module.exports = zxnz.ModelRef('zxnz_table_field_', {
    mixins: [
        require('./TableFK')
    ],
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
        Order: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Status: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Ignore: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Primary: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Format: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Convert: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        As: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Auto_Update: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Hidden: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Value: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Length: {
            value: null,
            type: ['int', 10],
            default: 0
        },
        Unique: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Unsigned: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Zerofill: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Allow_Null: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Comment: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        Default: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Required: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Generated: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Repeat_Verify: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Data: {
            value: null,
            type: ['text'],
            default: null
        },
        Input_Props: {
            value: null,
            type: ['text'],
            default: null
        },
        Column_Props: {
            value: null,
            type: ['text'],
            default: null
        },
        FormItem_Props: {
            value: null,
            type: ['text'],
            default: null
        }
    }
});