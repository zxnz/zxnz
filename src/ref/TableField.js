var Form = require('./TableFieldForm');
var Structure = require('./TableFieldStructure');
module.exports = zn.Class({
    mixins: [
        Form,
        Structure
    ],
    properties: {
        zxnz_table_id: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_field_order: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_field_convert: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_table_field_hidden: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_repeat_verify: {
            value: null,
            type: ['tinyint', 1],
            default: false
        },
        zxnz_table_field_column_width: {
            value: null,
            type: ['int', 11],
            default: null
        }
    }
});