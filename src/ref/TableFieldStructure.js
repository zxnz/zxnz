module.exports = zn.Class({
    properties: {
        zxnz_table_Field_Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_Field_Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_Field_Length: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_Field_Unsigned: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Zerofill: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Binary: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Allow_Null: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Key: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_Field_Default: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_Field_Extra: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_Field_Encoding: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_Field_Collation: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_Field_Comment: {
            value: null,
            type: ['varchar', 50],
            default: ''
        }
    }
});