/**
 * Created by yangyxu on 9/17/14.
 */
var TreeTransactionBlock = require('./TreeTransactionBlock.js');
module.exports = zxnz.Dao({
    methods: {
        init: function (){
            this._block = new TreeTransactionBlock();
        },
        orderTreeNode: function (id, order){
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
        },
        moveTreeNode: function (source, target){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this._block.moveNode(this._table, source, target))
                .on('error', function (sender, error){
                    _defer.reject(error);
                })
                .on('finally', function (sender, data){
                    _defer.resolve(data);
                })
                .commit();

            return _defer.promise;
        },
        addTreeNode: function (values){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this._block.addNode(this._table, values))
                .on('error', function (sender, error){
                    _defer.reject(error);
                })
                .on('finally', function (sender, data){
                    _defer.resolve(data);
                })
                .commit();

            return _defer.promise;
        },
        addTreeNodeByPid: function (pid, values){
            var _defer = zn.async.defer();
            values.zxnz_tree_Pid = pid;
            this.beginTransaction()
                .block(this._block.addNode(this._table, values))
                .on('error', function (sender, error){
                    _defer.reject(error);
                })
                .on('finally', function (sender, data){
                    _defer.resolve(data);
                })
                .commit();

            return _defer.promise;
        },
        deleteTreeNode: function (where){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this._block.deleteNode(this._table, where))
                .on('error', function (sender, error){
                    _defer.reject(error);
                })
                .on('finally', function (sender, data){
                    _defer.resolve(data);
                })
                .commit();

            return _defer.promise;
        },
        deleteAllChildByPid: function (pid){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this._block.deleteAllChildByPid(this._table, pid))
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