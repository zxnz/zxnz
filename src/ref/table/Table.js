module.exports = zxnz.ModelRef('zxnz_table_', {
    Dao: require('./TableDao'),
    properties: {
        Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Mixins: {
            value: null,
            type: ['varchar', 200],
            default: ','
        },
        Forced: {
            value: null,
            type: ['tinyint', 1],
            default: 1
        },
        Engine: {
            value: null,
            type: ['varchar', 100],
            default: 'InnoDB'
        },
        Charset: {
            value: null,
            type: ['varchar', 100],
            default: 'utf-8'
        },
        Comment: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        Prefix: {
            value: null,
            type: ['varchar', 100],
            default: 'zxnz_user_defined_table_'
        },
        Parent_ID: {
            value: null,
            type: ['bigint', 20],
            default: 0
        },
        Status: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Type: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Generated: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Importable: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Exportable: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Inputable: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Outputable: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        }
    }
});