module.exports = zn.Class({
    properties: {
        zxnz_table_ID: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        zxnz_table_Name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_Columns: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_FK_Database: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_FK_Table: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_FK_Columns: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_On_Update: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zxnz_table_On_Delete: {
            value: null,
            type: ['varchar', 100],
            default: ''
        }
    }
});