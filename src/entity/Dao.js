var SqlBlock = require('./SqlBlock');
var Dao = zn.Class({
    properties: {
        Model: {
            readonly: true,
            get: function (){
                return this._Model;
            }
        },
        table: {
            readonly: true,
            get: function (){
                return this._table;
            }
        },
        sql: {
            readonly: true,
            get: function (){
                return this._sql;
            }
        },
        sqlBlock: {
            readonly: true,
            get: function (){
                return this._sqlBlock;
            }
        },
        connector: {
            readonly: true,
            get: function (){
                return this._connector;
            }
        },
        database: {
            readonly: true,
            get: function (){
                return this._database;
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
                        code: 403,
                        message: "Database or Model is Null.",
                        detail: "Database or Model is Null, You Need Configuration For DataBase."
                    }); 
                }
                this._Model = Model;
                this._table = Model.getTable();
                this._database = database;
                this._connector = database.connector;
                this._sql = database.Builder;
                this._sqlBlock = this.createSqlBlock();
            }
        },
        createSqlBlock: function (){
            var _mixins = this.constructor.getMeta('mixins')||[],
                _SqlBlock = this.constructor.getMeta('SqlBlock'),
                _SqlBlocks = [];
            _mixins.filter(function (mixin){
                if(mixin.getMeta('SqlBlock')){
                    _SqlBlocks.push(mixin.getMeta('SqlBlock'));
                }
            });
            if(_SqlBlock){
                _SqlBlocks.push(_SqlBlock);
            }
            if(_SqlBlocks.length){
                var _SqlBlockClass = zxnz.SqlBlock({ mixins: _SqlBlocks });
                return new _SqlBlockClass(this._table, this._database);
            }
            
            return new SqlBlock(this._table, this._database);
        },
        createTransactionBlock: function (context){
            return this._database.createTransactionBlock(context);
        },
        beginTransaction: function (events, before, after){
            return this._connector.beginTransaction(events, before, after);
        },
        beginPoolTransaction: function (events, before, after){
            return this._connector.beginPoolTransaction(events, before, after);
        },
        query: function (){
            return this._connector.query.apply(this._connector, arguments);
        },
        insert: function (values){
            values.zxnz_UUID = zn.uuid();
            return this._connector.query(this._sql.insert({
                table: this._table,
                values: values
            }));
        },
        select: function (argv){
            return this._connector.query(this._sql.select(zn.extend({
                table: this._table,
                fields: this._Model.getFields()
            }, argv)));
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
            return this._connector.query(this._sql.paging(zn.extend({
                table: this._table,
                fields: this._Model.getFields()
            }, argv)));
        },
        update: function (updates, where){
            return this._connector.query(this._sql.update({
                table: this._table,
                updates: updates, 
                where: where
            }));
        },
        delete: function (where){
            return this._connector.query(this._sql.delete({
                table: this._table,
                where: where
            }));
        }
    }
});

zxnz.Dao = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(Dao, _meta);
}

module.exports = Dao;
