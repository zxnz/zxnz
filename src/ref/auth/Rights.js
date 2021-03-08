module.exports = zxnz.ModelRef('zxnz_rights_', {
    properties: {
        Type: {
            value: null,
            type: ['int', 11],
            default: 0
        },
        Owner: {
            value: null,
            type: ['int', 11],
            default: 0,
            convert: 'zxnz_user({})'
        },
        Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0,
            ignore: true
        },
        Groups: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_groups({})',
            default: ','
        },
        Observe_Groups: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_groups({})',
            default: ','
        },
        Users: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_users({})',
            default: ','
        },
        Roles: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_roles({})',
            default: ','
        },
        Observe_Users: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_users({})',
            default: ','
        },
        Observe_Roles: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_roles({})',
            default: ','
        }
    }
});