var Block = zn.Class({
    properties: {
        dao: {
            readonly: true,
            get: function (){
                return this._dao;
            }
        },
        database: {
            readonly: true,
            get: function (){
                return this._database;
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
        }
    },
    methods: {
        init: {
            auto: true,
            value: function (database, dao){
                this._dao = dao;
                this._database = database;
                this._sql = database.Builder;
                this._table = dao._table;
            }
        },
        createTransactionBlock: function (){
            if(this._database){
                return this._database.createTransactionBlock();
            } else {
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "Database is Null.",
                    detail: "Database is Null, You Need Configuration For DataBase."
                });
            }
        }
    }
});

zxnz.Block = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(Block, _meta);
}

module.exports = Block;
