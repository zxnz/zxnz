module.exports = zn.Class({
    properties: {
        zxnz_table_Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_Parent_ID: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_Generated: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_Mixins: {
            value: null,
            type: ['varchar', 100],
            default: 'zxnz.ref.Base'
        },
        zxnz_table_Importable: {
            value: null,
            type: ['tinyint', 1],
            default: true
        },
        zxnz_table_Exportable: {
            value: null,
            type: ['tinyint', 1],
            default: true
        },
        zxnz_table_Inputable: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_Outputable: {
            value: null,
            type: ['tinyint', 1],
            default: false
        }
    }
});