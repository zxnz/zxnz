module.exports = zxnz.ModelRef('zxnz_tree_', {
    Dao: require('./TreeDao'),
    properties: {
        Pid: {
            value: null,
            type: ['bigint', 20],
            default: 0
        },
        Depth: {
            value: null,
            type: ['tinyint', 1],
            ignore: true,
            default: 0
        },
        Order: {
            value: null,
            type: ['tinyint', 2],
            ignore: true,
            default: 0
        },
        Parent_Path: {
            value: null,
            type: ['varchar', 250],
            ignore: true,
            default: ','
        },
        Son_Count: {
            value: null,
            type: ['tinyint', 2],
            ignore: true,
            default: 0
        },
        Max_Son_Count: {
            value: null,
            type: ['tinyint', 2],
            ignore: true,
            default: 0
        },
        Extend: {
            value: null,
            type: ['text'],
            default: null
        },
        Type: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        }
    }
});