/**
 * Created by yangyxu on 9/17/14.
 */

module.exports = zxnz.Dao({
    SqlBlock: require('./TreeSqlBlock'),
    methods: {
        addNode: function (values, session){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.addNode(values, session))
                .commit();
        },
        addNodeByPid: function (pid, values, session){
            values.zxnz_tree_Pid = pid;
            return this.beginPoolTransaction()
                .block(this.sqlBlock.addNode(values, session))
                .commit();
        },
        editNodeById: function (data, id){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.editNodeById(data, id))
                .commit();
        },
        selectChild: function (argv, session){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.selectChild(argv, session))
                .commit();
        },
        selectChildByPid: function (pid, session){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.selectChildByPid(pid, session))
                .commit();
        },
        selectAllChildByPid: function (pid, session){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.selectAllChildByPid(pid, session))
                .commit();
        },
        deleteNode: function (where){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.deleteNode(where))
                .commit();
        },
        deleteChildByPid: function (pid){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.deleteChildByPid(pid))
                .commit();
        },
        deleteAllChildByPid: function (pid){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.deleteAllChildByPid(pid))
                .commit();
        },
        orderNode: function (id, order){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.orderNode(id, order))
                .commit();
        },
        moveNode: function (source, target){
            return this.beginPoolTransaction()
                .block(this.sqlBlock.moveNode(source, target))
                .commit();
        }
    }
});