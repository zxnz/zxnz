module.exports = zxnz.ModelRef('zxnz_workflow_', {
    properties: {
        schema_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        var_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        table_uuid: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Field_Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Field_Convert: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Field_Default: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Field_Detail: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        Is_Hidden: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Type: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Width: {
            value: null,
            type: ['int', 11],
            default: null
        },
        Required: {
            value: null,
            type: ['int', 4],
            default: 0
        },
        Data: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Props: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        },
        Attrs: {
            value: null,
            type: ['varchar', 2000],
            default: ''
        }
    }
});