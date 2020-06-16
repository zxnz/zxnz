module.exports = zn.Class({
    properties: {
        zxnz_api_Key: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_api_Name: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_api_Type: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_api_Path: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_api_Method: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        zxnz_api_Arguments: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        zxnz_api_Default: {
            value: null,
            type: ['varchar', 200],
            default: ''
        },
        zxnz_api_Labels: {
            value: null,
            type: ['varchar', 200],
            default: ','
        }
    }
});