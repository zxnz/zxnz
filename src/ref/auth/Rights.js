module.exports = zxnz.ModelRef('zxnz_rights_', {
    properties: {
        owner: {
            value: null,
            type: ['varchar', 50],
            convert: 'zxnz_rights_user_id({})',
            default: 0
        },
        owners: {
            value: null,
            type: ['varchar', 1000],
            default: ','
        },
        users: {
            value: null,
            type: ['text'],
            convert: 'zxnz_users({})',
            default: null
        },
        roles: {
            value: null,
            type: ['text'],
            convert: 'zxnz_roles({})',
            default: null
        },
        observe_users: {
            value: null,
            type: ['text'],
            convert: 'zxnz_users({})',
            default: null
        },
        observe_roles: {
            value: null,
            type: ['text'],
            convert: 'zxnz_roles({})',
            default: null
        },
        Logic: {
            value: null,
            type: ['varchar', 50],
            default: ''
        },
        Enabled: {
            value: null,
            type: ['tinyint', 1],
            default: 0,
            ignore: true
        }
    }
});