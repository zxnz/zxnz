module.exports = zn.Class({
    Dao: require('./TableDao'),
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
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Importable: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Exportable: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Inputable: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Outputable: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        }
    }
});