module.exports = zxnz.ModelRef('zxnz_chain_', {
    properties: {
        start_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        is_start: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        end_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        is_end: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        from_table: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        from_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        to_table: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        to_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        }
    }
});
