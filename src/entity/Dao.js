var Dao = zn.Class({
    properties: {
        connector: {
            readonly: true,
            get: function (){
                return this._connector;
            }
        },
        sql: {
            readonly: true,
            get: function (){
                return this._sql;
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
            value: function (Model, database){
                if(typeof database == 'string' && zxnz.store){
                    database = zxnz.store.getDataBase(database);
                }
                if(!database && zxnz.store){
                    database = zxnz.store.getDataBase();
                }
                if(!Model || !database){
                    throw new zn.ERROR.HttpRequestError({
                        code: 401,
                        message: "HTTP/1.1 403 db or Model is Null.",
                        details: "HTTP/1.1 403 db or Model is Null, You Need Configuration For DataBase."
                    }); 
                }
                this._Model = Model;
                this._table = Model.getTable();
                this._connector = database.connector;
                this._sql = database.Builder;
            }
        },
        beginTransaction: function (){
            return this._connector.beginTransaction();
        },
        query: function (){
            return this._connector.query.apply(this._connector, arguments);
        },
        insert: function (values){
            return this._connector.query(this._Model.getInsertSql({ values: values }));
        },
        select: function (argv){
            return this._connector.query(this._Model.getSelectSql(argv));
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
            return this._connector.query(this._Model.getPagingSql(argv));
        },
        update: function (updates, where){
            return this._connector.query(this._Model.getUpdateSql({ updates: updates, where: where }));
        },
        delete: function (where){
            return this._connector.query(this._Model.getDeleteSql({ where : where }));
        }
    }
});

zxnz.Dao = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(Dao, _meta);
}

module.exports = Dao;
