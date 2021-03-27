var DaoBlock = zn.Class({
    properties: {
        dao: {
            readonly: true,
            get: function (){
                return this._dao;
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
            value: function (dao){
                this._dao = dao;
                this._table = dao._table;
            }
        },
        createTransactionBlock: function (){
            if(this._dao){
                return this._dao.createTransactionBlock();
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

zxnz.DaoBlock = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(DaoBlock, _meta);
}

module.exports = DaoBlock;
