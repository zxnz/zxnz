module.exports = zn.Class({
    properties: {
        zxnz_ID: {
            value: null,
            type: ['bigint', 20],
            ignore: true,
            primary: true
        },
        zxnz_UUID: {
            value: null,
            type: ['char', 36],
            default: ''
        },
        zxnz_Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_Inserted_Time: {
            value: null,
            type: ['timestamp'],
            ignore: true,
            format: "date_format({},'%Y-%c-%d %h:%i:%s')",
            default: 'now()'
        },
        zxnz_Updated_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        zxnz_Deleted_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        zxnz_Deleted: {
            value: null,
            type: ['bit', 4],
            ignore: true,
            hidden: true,
            default: 0
        },
        zxnz_Selected_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        zxnz_Note: {
            value: null,
            type: ['varchar', 250],
            default: ''
        }
    }
});
