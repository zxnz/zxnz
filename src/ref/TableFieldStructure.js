module.exports = zn.Class({
    properties: {
        zxnz_table_field_Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_field_Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_field_Length: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_field_Unsigned: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Zerofill: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Binary: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Allow_Null: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Key: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_field_Default: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_field_Extra: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_field_Encoding: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_field_Collation: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_field_Comment: {
            value: null,
            type: ['varchar', 50],
            default: ''
        }
    }
});