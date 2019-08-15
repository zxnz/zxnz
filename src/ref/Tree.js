var TreeCollection = require('./TreeCollection');
module.exports = zn.Class({
    collection: TreeCollection,
    properties: {
        zxnz_tree_pid: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_tree_depth: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_order: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_parent_path: {
            value: null,
            type: ['varchar', 250],
            ignore: true,
            default: ','
        },
        zxnz_tree_son_count: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_max_son_count: {
            value: null,
            type: ['int', 11],
            ignore: true,
            default: 0
        },
        zxnz_tree_extend: {
            value: null,
            type: ['varchar', 500],
            default: ''
        },
        zxnz_tree_type: {
            value: null,
            type: ['int', 11],
            default: 0
        }
    }
});