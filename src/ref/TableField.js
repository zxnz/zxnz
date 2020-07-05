module.exports = zn.Class({
    mixins: [
        require('./TableFK'),
        require('./TableFieldStructure')
    ],
    properties: {
        zxnz_table_Field_Order: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_Field_Generated: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_Field_Convert: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_Field_Hidden: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Repeat_Verify: {
            value: null,
            type: ['tinyint', 4],
            default: 0
        },
        zxnz_table_Field_Data: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_table_Field_Input_Meta: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_table_Field_Column_Meta: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_table_Field_FormItem_Meta: {
            value: null,
            type: ['varchar', 500],
            default: ''
        }
    }
});