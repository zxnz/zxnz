module.exports = zn.Class({
    mixins: [
        require('./TableFK'),
        require('./TableFieldStructure')
    ],
    properties: {
        zxnz_table_field_Order: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_field_Generated: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_field_Convert: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_field_Hidden: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Repeat_Verify: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_Input_Meta: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_table_field_Column_Meta: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_table_field_Form_Meta: {
            value: null,
            type: ['varchar', 500],
            default: ''
        }
    }
});