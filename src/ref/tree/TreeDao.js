/**
 * Created by yangyxu on 9/17/14.
 */

module.exports = zxnz.Dao({
    Block: require('./TreeDaoBlock'),
    methods: {
        addNode: function (values){
            return this.beginPoolTransaction()
                .block(this.block.addNode(this._table, values))
                .commit();
        },
        addNodeByPid: function (pid, values){
            values.zxnz_tree_Pid = pid;
            return this.beginPoolTransaction()
                .block(this.block.addNode(this._table, values))
                .commit();
        },
        editNodeById: function (data, id){
            return this.beginPoolTransaction()
                .query(zxnz.sql.update({
                    table: this._table,
                    updates: data,
                    where: {
                        zxnz_ID: id
                    }
                }))
                .commit();
        },
        selectChild: function (argv){
            return this.beginPoolTransaction()
                .query(zxnz.sql.select(zn.extend({
                    table: this._table
                }, argv)))
                .commit();
        },
        selectChildByPid: function (pid){
            return this.beginPoolTransaction()
                .query(zxnz.sql.select({
                    table: this._table,
                    where: {
                        zxnz_tree_Pid: pid
                    }
                }))
                .commit();
        },
        selectAllChildByPid: function (pid){
            return this.beginPoolTransaction()
                .query(zxnz.sql.select({
                    table: this._table,
                    where: "locate('," + pid +",', zxnz_tree_Parent_Path)<>0"
                }))
                .commit();
        },
        deleteNode: function (where){
            return this.beginPoolTransaction()
                .block(this.block.deleteNode(this._table, where))
                .commit();
        },
        deleteChildByPid: function (pid){
            return this.beginPoolTransaction()
                .block(this.block.deleteChildByPid(this._table, pid))
                .commit();
        },
        deleteAllChildByPid: function (pid){
            return this.beginPoolTransaction()
                .block(this.block.deleteAllChildByPid(this._table, pid))
                .commit();
        },
        orderNode: function (id, order){
            return this.beginPoolTransaction()
                .block(this.block.orderNode(this._table, id, order))
                .commit();
        },
        moveNode: function (source, target){
            return this.beginPoolTransaction()
                .block(this.block.moveNode(this._table, source, target))
                .commit();
        }
    }
});