module.exports = zxnz.ModelRef('zxnz_table_constraint_', {
    properties: {
        ID: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Columns: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        FK_Database: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        FK_Table: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        FK_Columns: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        On_Update: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        On_Delete: {
            value: null,
            type: ['varchar', 100],
            default: ''
        }
    }
});