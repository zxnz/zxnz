var ModelSqlClass = zn.Class({
    properties: {
        application: null,
        model: null
    },
    methods: {
        init: {
            auto: true,
            value: function (application, model){
                this._application = application;
                this._model = model;
                this._table_ = model.getTable();
                this._fields_ = model.getFields();
            }
        },
        table: function (table){
            var _table = this._table_;
            if(!table) return _table;
            if(zn.is(table, 'function')){
                _table = table(_table, this);
            }

            return _table;
        },
        fields: function (fields){
            var _fields = this._fields_;
            if(!fields) return _fields;
            if(zn.is(fields, 'function')){
                _fields = fields(_fields, this);
            }

            return _fields;
        },
        select: function (argv){
            return zxnz.sql.select(zn.extend({
                table: this._table_,
                fields: this.fields()
            }, argv));
        },
        update: function (argv){
            return zxnz.sql.update(zn.extend({
                table: this._table
            }, argv));
        },
        delete: function (argv){
            return zxnz.sql.delete(zn.extend({
                table: this._table_
            }, argv));
        },
        paging: function (argv){
            return zxnz.sql.paging(zn.extend({
                table: this._table_,
                fields: this.fields()
            }, argv));
        }
    }
});

zxnz.ModelSql = function (){
    var _args = arguments,
        _meta = {};
    if(_args.length == 1){
        _meta = _args[0];
    }else if(_args.length == 2){
        _meta = _args[1];
        _meta.table = _args[0];
    }

    return zn.Class(ModelSqlClass, _meta);
}

module.exports = ModelSqlClass;