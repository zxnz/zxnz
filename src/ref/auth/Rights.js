module.exports = zxnz.ModelRef('zxnz_rights_', {
    properties: {
        groups: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_groups({})',
            default: ','
        },
        groups_uuid: {
            value: null,
            type: ['text'],
            convert: 'zxnz_groups_uuid({})'
        },
        owner: {
            value: null,
            type: ['int', 11],
            convert: 'zxnz_rights_user_id({})',
            default: 0
        },
        owner_uuid: {
            value: null,
            type: ['varchar', 50],
            convert: 'zxnz_rights_user_uuid({})',
            default: ''
        },
        users: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_users({})',
            default: ','
        },
        users_uuid: {
            value: null,
            type: ['text'],
            convert: 'zxnz_users_uuid({})'
        },
        roles: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_roles({})',
            default: ','
        },
        roles_uuid: {
            value: null,
            type: ['text'],
            convert: 'zxnz_roles_uuid({})'
        },
        observe_groups: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_groups({})',
            default: ','
        },
        observe_groups_uuid: {
            value: null,
            type: ['text'],
            convert: 'zxnz_groups({})'
        },
        observe_users: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_users({})',
            default: ','
        },
        observe_users_uuid: {
            value: null,
            type: ['text'],
            convert: 'zxnz_users_uuid({})'
        },
        observe_roles: {
            value: null,
            type: ['varchar', 250],
            convert: 'zxnz_roles({})',
            default: ','
        },
        observe_roles_uuid: {
            value: null,
            type: ['text'],
            convert: 'zxnz_roles_uuid({})'
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