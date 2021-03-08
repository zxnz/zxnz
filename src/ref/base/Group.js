module.exports = zxnz.ModelRef('zxnz_group_', {
    properties: {
        Name: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Label: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Number: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        Type: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        State: {
            value: null,
            type: ['int', 11],
            default: 0,
            options: [ //0: 待审核, 1: 正常, -1: 已锁定
                { text: '待审核', value: 0 },
                { text: '正常', value: 1 },
                { text: '已锁定', value: -1 },
            ]
        },
        Phone: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Email: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Email_Verified: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Address: {
            value: null,
            type: ['varchar', 250],
            default: ''
        },
        Logo: {
            value: null,
            type: ['varchar', 250],
            default: ''
        },
        Attachments: {
            value: null,
            type: ['varchar', 5000],
            default: ','
        },
        Owner: {
            value: null,
            type: ['bigint', 20],
            default: 0
        },
        Owners: {
            value: null,
            type: ['varchar', 200],
            default: ','
        }
    }
});