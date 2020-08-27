module.exports = zxnz.ModelRef('zxnz_', {
    properties: {
        ID: {
            value: null,
            type: ['bigint', 20],
            ignore: true,
            primary: true
        },
        UUID: {
            value: null,
            type: ['char', 36],
            default: ''
        },
        Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Inserted_Time: {
            value: null,
            type: ['timestamp'],
            ignore: true,
            format: "date_format({},'%Y-%c-%d %h:%i:%s')",
            default: 'now()'
        },
        Updated_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        Deleted_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        Deleted: {
            value: null,
            type: ['tinyint', 1],
            ignore: true,
            hidden: true,
            default: 0
        },
        Selected_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        Note: {
            value: null,
            type: ['varchar', 250],
            default: ''
        }
    }
});
