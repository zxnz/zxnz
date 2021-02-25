/**
 * Created by yangyxu on 9/17/14.
 */

module.exports = zxnz.Dao({
    //Block: require('./TableDao.Block'),
    methods: {
        orderTreeNode: function (id, order){
            return this.beginPoolTransaction()
                .block(this.block.orderNode(this._table, id, order))
                .commit();
        },
        moveTreeNode: function (source, target){
            return this.beginPoolTransaction()
                .block(this.block.moveNode(this._table, source, target))
                .commit();
        },
        addTreeNode: function (values){
            return this.beginPoolTransaction()
                .block(this.block.addNode(this._table, values))
                .commit();
        },
        addTreeNodeByPid: function (pid, values){
            values.zxnz_tree_Pid = pid;
            return this.beginPoolTransaction()
                .block(this.block.addNode(this._table, values))
                .commit();
        },
        deleteTreeNode: function (where){
            return this.beginPoolTransaction()
                .block(this.block.deleteNode(this._table, where))
                .commit();
        },
        deleteAllChildByPid: function (pid){
            return this.beginPoolTransaction()
                .block(this.block.deleteAllChildByPid(this._table, pid))
                .commit();
        }
    }
});