module.exports = zxnz.ModelRef('zxnz_tree_', {
    Dao: require('./TreeDao'),
    properties: {
        Pid: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Depth: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        Order: {
            value: null,
            type: ['int', 11],
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
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        Max_Son_Count: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        Extend: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        Type: {
            value: null,
            type: ['int', 11],
            default: 0
        }
    }
});