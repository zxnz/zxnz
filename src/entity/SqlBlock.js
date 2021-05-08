var SqlBlock = zn.Class({
    properties: {
        table: {
            readonly: true,
            get: function (){
                return this._table;
            }
        },
        store: {
            readonly: true,
            get: function (){
                return this._store;
            }
        }
    },
    methods: {
        init: {
            auto: true,
            value: function (table, store){
                this._table = table;
                this._store = store;
            }
        },
        createTransactionBlock: function (){
            if(this._store){
                return this._store.createTransactionBlock();
            } else {
                throw new zn.ERROR.HttpRequestError({
                    code: 403,
                    message: "store is Null.",
                    detail: "store is Null."
                });
            }
        }
    }
});

zxnz.SqlBlock = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(SqlBlock, _meta);
}

module.exports = SqlBlock;
