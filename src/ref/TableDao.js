/**
 * Created by yangyxu on 9/17/14.
 */
var TableTransactionBlock = require('./TableTransactionBlock.js');
module.exports = zxnz.Dao({
    methods: {
        init: function (){
            this._block = new TableTransactionBlock();
        },
        buildTable: function (id, order){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this._block.orderNode(this._table, id, order))
                .on('error', function (sender, error){
                    _defer.reject(error);
                })
                .on('finally', function (sender, data){
                    _defer.resolve(data);
                })
                .commit();

            return _defer.promise;
        }
    }
});