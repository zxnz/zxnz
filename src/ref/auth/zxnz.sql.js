if(zxnz && zxnz.sql){
    var SQL = {
        RIGHTS: " (zxnz_rights_Enabled = 0 or (zxnz_rights_Enabled <> 0 and zxnz_rights_UserExist({0}, zxnz_rights_Users, zxnz_rights_Roles) <> 0)) ",
        OBSERVE_RIGHTS: " (zxnz_rights_Enabled = 0 or (zxnz_rights_Enabled <> 0 and zxnz_rights_UserExist({0}, zxnz_rights_Observe_Users, zxnz_rights_Observe_Roles) <> 0)) "
    };
    
    zxnz.sql.extendMethod('rights', function (userId){
        return SQL.RIGHTS.format(userId);
    });

    zxnz.sql.extendMethod('observeRights', function (userId){
        return SQL.OBSERVE_RIGHTS.format(userId);
    });
}