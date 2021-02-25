if(zxnz && zxnz.sql){
    /*
    zxnz.sql.parser.on('parsedWhere', function (parser, value, data){
        return value + ' and ';
    });*/
    
    zxnz.sql.parser.on('parsedUpdates', function (parser, value, data){
        return value + ', zxnz_Updated_Time=now()';
    });
}