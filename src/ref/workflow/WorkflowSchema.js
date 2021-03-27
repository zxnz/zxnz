module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        child_index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Before: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        After: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Previous_Nodes: {
            value: null,
            type: ['varchar', 2000],
            default: ','
        },
        Next_Nodes: {
            value: null,
            type: ['varchar', 2000],
            default: ','
        },
        Previous_Ids: {
            value: null,
            type: ['varchar', 200],
            default: ','
        },
        Next_Ids: {
            value: null,
            type: ['varchar', 200],
            default: ','
        },
        Type: {
            value: null,
            type: ['varchar', 10],
            default: 'normal'
        },
        Rights_Logic: {
            value: null,
            type: ['varchar', 100],
            default: 'rights.logic.default'
        },
        Icon: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Attrs: {
            value: null,
            type: ['varchar', 3000],
            default: ""
        }
    }
});