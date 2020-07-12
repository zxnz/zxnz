/**
 * Created by yangyxu on 9/17/14.
 */
module.exports = zxnz.Block({
    methods: {
        createTable: function (values){
            var _self = this;
        },
        buildTable: function (uuid, tableField){
            var _tableName = this._tableName,
                _table = null,
                _self = this;
            return this.createTransactionBlock()
                .query(_self.sql.select({
                    table: _tableName,
                    where: {
                        zxnz_UUID: uuid
                    }
                }))
                .query('Verify table: ', function (sql, rows, fields, transaction){
                    _table = rows[0];
                    if(!_table){
                        throw new Error('The table is not exist!');
                    }
                    if(!_rebuild && _table.zxnz_table_Generated){
                        throw new Error('The table has been generated!');
                    }

                    return _self.sql.select({
                        table: tableField,
                        where: {
                            zxnz_table_ID: _table.zxnz_ID
                        }
                    });
                })
                .query('Build table: ', function (sql, data, fields, transaction){
                    if(!data.length){
                        throw new Error('The table has no field!');
                    }
                    var _fields = [],
                        _field = [];
                        _tableSql = "DROP TABLE IF EXISTS `" + _table.zxnz_table_Name + "`;CREATE TABLE IF NOT EXISTS `" + _table.zxnz_table_Name + "`(";
                    data.forEach(function (field, index){
                        _field = ["`" + field.zxnz_table_Field_Name + "`"];
                        if(field.zxnz_table_Field_Length){
                            _field.push(field.zxnz_table_Field_Type + "(" + field.zxnz_table_Field_Length + ")");
                        }else{
                            _field.push(field.zxnz_table_Field_Type);
                        }
                        if(!field.zxnz_table_Field_Allow_Null){
                            _field.push('NOT NULL');
                        }
                        if(field.zxnz_table_Field_Unsigned){
                            _field.push('UNSIGNED');
                        }
                        if(field.zxnz_table_Field_Extra){
                            _field.push(field.zxnz_table_Field_Extra);
                        }
                        if(!field.zxnz_table_Field_Default){
                            _field.push("DEFAULT " + field.zxnz_table_Field_Default + "");
                        }
                        if(field.zxnz_table_Field_Key == 'PRI'){
                            _fields.push("PRIMARY KEY (" + field.zxnz_table_Field_Name + ")");
                        }
                        _fields.push(_field.join(' '));
                    });

                    _tableSql += _fields.join(',') + ")ENGINE=InnoDB DEFAULT CHARSET=utf8;";
                    return _tableSql + _self.sql.update({
                        table: _tableName,
                        updates: {
                            zxnz_table_Generated: 1
                        },
                        where: {
                            zxnz_UUID: uuid
                        }
                    }) + _self.sql.update({
                        table: tableField,
                        updates: {
                            zxnz_table_Field_Generated: 1
                        },
                        where: {
                            zxnz_table_UUID: uuid
                        }
                    });
                });
        }
    }
});