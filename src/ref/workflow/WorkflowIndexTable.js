module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        index_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        parent_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Import_Enabled: {
            value: null,
            type: ['int', 4],
            default: 0
        },
        Export_Enabled: {
            value: null,
            type: ['int', 4],
            default: 0
        },
        Input_Enabled: {
            value: null,
            type: ['int', 4],
            default: 0
        },
        Table_Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Generated: {
            value: null,
            type: ['int', 4],
            default: 0
        },
        Mixins: {
            value: null,
            type: ['varchar', 100],
            default: ''
        }
    }
});