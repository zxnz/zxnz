/**
 * Created by yangyxu on 9/17/14.
 */

var Collection = zn.Class({
    properties: {
        store: {
            readonly: true,
            get: function (){
                return this._store;
            }
        },
        table: {
            readonly: true,
            get: function (){
                return this._table;
            }
        },
        Model: {
            readonly: true,
            get: function (){
                return this._Model;
            }
        }
    },
    methods: {
        init: {
            auto: true,
            value: function (store, Model){
                this._store = store;
                this._table = Model.getMeta('table');
                this._Model = Model;
            }
        },
        beginTransaction: function (){
            return this._store.beginTransaction();
        },
        insert: function (values){
            return this._store.query(this.insertSql(values));
        },
        insertSql: function (values){
            return this._Model.getInsertSql({ values: values });
        },
        select: function (argv){
            return this._store.query(this.selectSql(argv));
        },
        selectSql: function (argv){
            return this._Model.getSelectSql(argv);
        },
        selectOne: function (argv){
            var _defer = zn.async.defer();
            this.select(argv)
                .then(function (rows){
                    _defer.resolve(rows[0]);
                }, function (error){
                    _defer.reject(error);
                });

            return _defer.promise;
        },
        paging: function (argv){
            return this._store.query(this.pagingSql(argv));
        },
        pagingSql: function (argv){
            return this._Model.getPagingSql(argv);
        },
        update: function (updates, where){
            return this._store.query(this.updateSql(updates, where));
        },
        updateSql: function (updates, where){
            return this._Model.getUpdateSql({ updates: updates, where: where });
        },
        delete: function (where){
            return this._store.query(this.deleteSql(where));
        },
        deleteSql: function (where){
            return this._Model.getDeleteSql({ where : where });
        }
    }
});

zn.Collection = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(Collection, _meta);
}

module.exports = Collection;
