var TreeDao = require('./TreeDao');
module.exports = zn.Class({
    dao: TreeDao,
    properties: {
        zxnz_tree_Pid: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_tree_Depth: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_Order: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_Parent_Path: {
            value: null,
            type: ['varchar', 250],
            ignore: true,
            default: ','
        },
        zxnz_tree_Son_Count: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_Max_Son_Count: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_Extend: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_tree_Type: {
            value: null,
            type: ['int', 11],
            default: 0
        }
    }
});