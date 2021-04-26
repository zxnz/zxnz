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
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Schema_Form_Data: {
            value: null,
            type: ['varchar', 5000],
            default: ""
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
        Do_Users: {
            value: null,
            type: ['varchar', 250],
            default: ','
        },
        Closed: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        State: {
            value: null,
            type: ['int', 11],
            default: 1
        },
        Owners: {
            value: null,
            type: ['varchar', 2000],
            default: ','
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
        Attrs: {
            value: null,
            type: ['varchar', 3000],
            default: ""
        },
        Files: {
            value: null,
            type: ['varchar', 5000],
            default: ","
        }
    }
});