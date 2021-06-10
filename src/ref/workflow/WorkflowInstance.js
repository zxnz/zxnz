module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        component_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        parent_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        parent_instance_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        child_instance_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        do_users: {
            value: null,
            type: ['varchar', 1000],
            default: ','
        },
        done_users: {
            value: null,
            type: ['varchar', 1000],
            default: ','
        },
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Code: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Previous: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Next: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Previous_Nodes: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_workflow_convert_schemas({})',
            default: ','
        },
        Next_Nodes: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_workflow_convert_schemas({})',
            default: ','
        },
        Type: {
            value: null,
            type: ['varchar', 10],
            default: ''
        },
        Closed: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        State: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Url: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Icon: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Props: {
            value: null,
            type: ['text'],
            default: null
        },
        Files: {
            value: null,
            type: ['text'],
            default: null
        }
    }
});