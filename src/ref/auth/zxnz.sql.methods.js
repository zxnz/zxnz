var SQL = {
    RIGHTS: " (zxnz_rights_Enabled = 0 or (zxnz_rights_Enabled <> 0 and zxnz_rights_UserExist({0}, zxnz_rights_Users, zxnz_rights_Roles) <> 0)) ",
    OBSERVE_RIGHTS: " (zxnz_rights_Enabled = 0 or (zxnz_rights_Enabled <> 0 and zxnz_rights_UserExist({0}, zxnz_rights_Observe_Users, zxnz_rights_Observe_Roles) <> 0)) "
};

var ZXNZ_SQL = {
    rights: "(zxnz_rights_Enabled=0 or (zxnz_rights_Enabled=1 and freeorder_merchant_convert_user_exist('{0}', '{1}', zxnz_rights_users, zxnz_rights_roles)>0))",
    observe_rights: "(zxnz_rights_Enabled=0 or (zxnz_rights_Enabled=1 and freeorder_merchant_convert_user_exist('{0}', '{1}', zxnz_rights_observe_users, zxnz_rights_observe_roles)>0))"
};

module.exports = {
    rights: function (user_uuid, merchant_uuid){
        return ZXNZ_SQL.rights.format(user_uuid, merchant_uuid);
    },
    observeRights: function (user_uuid, merchant_uuid){
        return ZXNZ_SQL.observe_rights.format(user_uuid, merchant_uuid);
    },
    inRights: function (user_uuid, field){
        return "locate(',{0},', {1})<>0".format(user_uuid, field || 'zxnz_workflow_Do_Users');
    }
};