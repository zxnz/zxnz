module.exports = zn.Model({
    properties: {
        id: {
            value: null,
            type: ['bigint', 20],
            ignore: true,
            primary: true
        },
        zn_id: {
            value: null,
            type: ['char', 36],
            default: 0,
            get: function (){
                return zn.uuid();
            }
        },
        zn_title: {
            value: null,
            type: ['varchar', 100],
            default: ''
        },
        zn_create_time: {
            value: null,
            type: ['timestamp'],
            ignore: true,
            format: "date_format({},'%Y-%c-%d %h:%i:%s')",
            default: 'now()'
        },
        zn_create_user: {
            value: null,
            type: ['int', 11],
            convert: 'zn_plugin_admin_convert_user({})',
            //hidden: true,
            default: 0
        },
        zn_modify_time: {
            value: null,
            type: ['datetime'],
            ignore: true,
            auto_update: '{{now()}}',
            format: "date_format({},'%Y-%c-%d %h:%i:%s')",
            //hidden: true,
            default: null
        },
        zn_modify_user: {
            value: null,
            type: ['int', 11],
            convert: 'zn_plugin_admin_convert_user({})',
            ignore: true,
            //hidden: true,
            default: 0
        },
        zn_deleted: {
            value: null,
            type: ['int', 4],
            ignore: true,
            hidden: true,
            default: 0
        },
        zn_note: {
            value: null,
            type: ['varchar', 250],
            default: ''
        }
    }
});
