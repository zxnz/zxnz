module.exports = zn.Class({
    properties: {
        zxnz_id: {
            value: null,
            type: ['bigint', 20],
            ignore: true,
            primary: true
        },
        zxnz_uuid: {
            value: null,
            type: ['char', 36],
            default: ''
        },
        zxnz_label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_insert_time: {
            value: null,
            type: ['timestamp'],
            ignore: true,
            format: "date_format({},'%Y-%c-%d %h:%i:%s')",
            default: 'now()'
        },
        zxnz_update_time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        zxnz_delete_time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        zxnz_select_time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        zxnz_deleted: {
            value: null,
            type: ['tinyint', 4],
            ignore: true,
            hidden: true,
            default: 0
        },
        zxnz_note: {
            value: null,
            type: ['varchar', 250],
            default: ''
        }
    }
});
