module.exports = zn.Class({
    properties: {
        zxnz_table_importable: {
            value: null,
            type: ['tinyint', 1],
            default: true
        },
        zxnz_table_exportable: {
            value: null,
            type: ['tinyint', 1],
            default: true
        },
        zxnz_table_inputable: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_outputable: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_parent_id: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_generated: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_mixins: {
            value: null,
            type: ['varchar', 100],
            default: 'zxnz.ref.Base'
        }
    }
});