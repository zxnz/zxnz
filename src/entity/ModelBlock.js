var ModelBlock = zn.Class({
    properties: {
        Model: {
            readonly: true,
            get: function (){
                return this._connector;
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
            value: function (Model, connector){
                this._Model = Model;
                this._table = table;
                this._connector = connector || zxnz.store;
            }
        },
        createTransactionBlock: function (){
            return this._connector.createTransactionBlock();
        }
    }
});

zxnz.ModelBlock = function (){
    var _args = arguments,
        _meta = _args[0];

    return zn.Class(ModelBlock, _meta);
}

module.exports = ModelBlock;