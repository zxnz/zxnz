var ModelSql = zn.Class({
    properties: {
        application: null,
        model: null,
        table: null
    },
    methods: {
        init: {
            auto: true,
            value: function (application, model){
                this._application = application;
                this._model = model;
                this._table = model.getTable();
                this._fields = model.getFields();
            }
        },
        table: function (table){
            var _table = this._table;
            if(!table) return _table;
            if(zn.is(table, 'function')){
                _table = table(_table, this);
            }

            return _table;
        },
        fields: function (fields){
            var _fields = this._fields;
            if(!fields) return _fields;
            if(zn.is(fields, 'function')){
                _fields = fields(_fields, this);
            }

            return _fields;
        },
        select: function (argv){
            return zxnz.sql.select(zn.extend({
                table: this._table
            }, argv));
        },
        update: function (argv){
            return zxnz.sql.update(zn.extend({
                table: this._table
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

    return zn.Class(ModelSql, _meta);
}

module.exports = ModelSql;