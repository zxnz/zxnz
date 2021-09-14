module.exports = {
    parseValues: function (parser, value, data){
        if(zn.is(value, 'object')) {
            if(value.zxnz_UUID == null){
                value.zxnz_UUID = zn.uuid();
            }
        }
    },
    parsedUpdates: function (parser, value, data){
        if(value && value.indexOf('zxnz_Updated_Time') == -1){
            return value + ', zxnz_Updated_Time=now()';
        }
    }
};