module.exports = zxnz.ModelRef('zxnz_table_', {
    properties: {
        id: {
            value: null,
            type: ['bigint', 20],
            default: 0
        },
        uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        }
    }
});