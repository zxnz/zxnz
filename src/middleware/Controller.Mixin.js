module.exports = zn.Class({
    methods: {
        beginTransaction: {
            router: null,
            value: function (){
                return this._store.beginTransaction.apply(this._store, arguments);
            }
        },
        query: {
            router: null,
            value: function (){
                return this._store.query.apply(this._store, arguments);
            }
        },
        store: {
            router: null,
            value: function (name){
                if(!name && this._store){
                    return this._store;
                }
                var _store = name ? this._stores[name]: this._stores;
                if(!_store){
                    throw new Error('The database '+name+' is not exist.');
                }

                return _store;
            }
        }
    }
});