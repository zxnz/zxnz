module.exports = zxnz.ModelRef('zxnz_user_', {
    mixins: [ 
        require('./RoleFK')
    ],
    properties: {
        Actived: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Agents: {
            value: null,
            type: ['varchar', 500],
            default: ','
        },
        State: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Roles: {
            value: null,
            type: ['varchar', 500],
            default: ','
        },
        Name: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Phone: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Phone_Verified: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Email: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Email_Verified: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Username: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Password: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Login_Count: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Login_Count_Max: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Login_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        Login_Last_Time: {
            value: null,
            type: ['datetime'],
            default: null
        },
        Login_Expires: {
            value: null,
            type: ['datetime'],
            default: null
        }
    }
});