module.exports = zxnz.ModelRef('zxnz_user_', {
    mixins: [ 
        require('./GroupFK'),
        require('./RoleFK')
    ],
    properties: {
        Group_Owner_ID: {
            value: null,
            type: ['bigint', 20],
            default: 0
        },
        Roles: {
            value: null,
            type: ['varchar', 500],
            convert: 'zxnz_rights_roles_convert({})',
            default: ','
        },
        Name: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Mobile: {
            value: null,
            type: ['varchar', 20],
            default: ''
        },
        Mobile_Verified: {
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
        State: {
            value: null,
            type: ['bit', 4],
            default: 0
        },
        Actived: {
            value: null,
            type: ['tinyint', 1],
            default: 0
        },
        Agents: {
            value: null,
            type: ['varchar', 500],
            convert: 'zxnz_rights_roles_convert({})',
            default: ','
        },
        Login_Name: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Login_Password: {
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