/**
 * Created by yangyxu on 8/20/14.
 */
module.exports = zn.Class({
    static: true,
    methods: {
        setSessionId: function (sessionid){
            this._sessionId = sessionid;
        },
        getSessionId: function (){
            return this._sessionId;
        },
        rights: function (userId){
            return " (zn_rights_enabled = 0 or (zn_rights_enabled <> 0 and zn_plugin_admin_user_exist({0}, zn_rights_users, zn_rights_roles) <> 0)) ".format(userId || this.getSessionId());
        },
        observeRights: function (userId){
            return " (zn_rights_enabled = 0 or (zn_rights_enabled <> 0 and zn_plugin_admin_user_exist({0}, zn_rights_observe_users, zn_rights_observe_roles) <> 0)) ".format(userId || this.getSessionId());
        }
    }
});