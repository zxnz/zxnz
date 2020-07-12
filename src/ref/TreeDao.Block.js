/**
 * Created by yangyxu on 9/17/14.
 */
module.exports = zxnz.Block({
    methods: {
        addNode: function (table, model){
            var _pid = model.zxnz_tree_Pid || 0;
            return this.createTransactionBlock()
                .query(this.sql.select({
                    table: table,
                    fields: 'zxnz_ID, zxnz_tree_Depth, zxnz_tree_Parent_Path, zxnz_tree_Order',
                    where: {
                        zxnz_ID: _pid
                    }
                }, {
                    table: table,
                    fields: 'max(zxnz_tree_Order)+1 as zxnz_tree_Order',
                    where: {
                        zxnz_Deleted: 0,
                        zxnz_tree_Pid: _pid
                    }
                }))
                .query('Insert node && Update parent node', function (sql, rows, fields){
                    var _pidModel = rows[0][0],
                        _treeOrder = rows[1][0].zxnz_tree_Order|| 1,
                        _pid = _pidModel ? _pidModel.zxnz_ID: 0,
                        _depth = (_pidModel?_pidModel.zxnz_tree_Depth:0) + 1,
                        _parentPath = (_pidModel?_pidModel.zxnz_tree_Parent_Path:'') + (_pid === 0 ? '' : _pid) + ',';
                    if(typeof model == 'string'){
                        model = JSON.parse(model);
                    }
                    model.zxnz_tree_Parent_Path = _parentPath;
                    model.zxnz_tree_Order = _treeOrder;
                    model.zxnz_tree_Depth = _depth;
                    return this.sql.insert({
                        table: table,
                        values: model
                    }) + this.sql.update({
                        table: table,
                        updates: 'zxnz_tree_Son_Count=zxnz_tree_Son_Count+1',
                        where: {
                            zxnz_ID: _pid
                        }
                    });
                });
        },
        deleteNode: function (table, where){
            return this.createTransactionBlock()
                .query(this.sql.select({
                    table: table,
                    fields: 'zxnz_ID, zxnz_tree_Pid, zxnz_tree_Order',
                    where: where
                }))
                .query('delete', function (sql, rows, fields, tran){
                    var _model = rows[0];
                    if(!_model){
                        throw new Error('The node is not exist!');
                    }
                    var _sql = 'delete from {0} where zxnz_ID={1};'.format(table, _model.zxnz_ID),
                        _pid = +_model.zxnz_tree_Pid;

                    if(_pid){
                        _sql += 'update {0} set zxnz_tree_Son_Count=zxnz_tree_Son_Count-1 where zxnz_ID={1};'.format(table, _pid);
                    }
                    _sql += 'update {0} set zxnz_tree_Order=zxnz_tree_Order-1 where zxnz_tree_Order>{1} and zxnz_tree_Pid={2};'.format(table, _model.zxnz_tree_Order, _pid);
                    _sql += "delete from {0} where locate(',{1},', zxnz_tree_Parent_Path)<>0;".format(table, _model.zxnz_ID);
                    return _sql;
                });
        },
        deleteAllChildByPid: function (table, pid){
            return this.createTransactionBlock()
                .query(this.sql.select({
                    table: table,
                    fields: 'zxnz_ID, zxnz_tree_Pid, zxnz_tree_Order',
                    where: {
                        zxnz_ID: pid
                    }
                }))
                .query('delete', function (sql, rows, fields, tran){
                    var _model = rows[0];
                    if(!_model){
                        throw new Error('The node is not exist!');
                    }
                    var _sql = 'delete from {0} where zxnz_ID={1};'.format(table, _model.zxnz_ID),
                        _pid = +_model.zxnz_tree_Pid;

                    if(_pid){
                        _sql += 'update {0} set zxnz_tree_Son_Count=zxnz_tree_Son_Count-1 where zxnz_ID={1};'.format(table, _pid);
                    }
                    _sql += 'update {0} set zxnz_tree_Order=zxnz_tree_Order-1 where zxnz_tree_Order>{1} and zxnz_tree_Pid={2};'.format(table, _model.zxnz_tree_Order, _pid);
                    _sql += "delete from {0} where locate(',{1},', zxnz_tree_Parent_Path)<>0;".format(table, _model.zxnz_ID);
                    return _sql;
                });
        },
        orderNode: function (table, id, order){
            return this.createTransactionBlock()
                .query('select {0} from {1} where zxnz_ID={2};select count(zxnz_ID) as count from {1} where zxnz_tree_Pid=(select zxnz_tree_Pid from {1} where zxnz_ID={2});'.format('zxnz_ID, zxnz_tree_Pid, zxnz_tree_Order', table, id))
                .query('order', function (sql, rows, fields){
                    var _model = rows[0][0],
                        _count = rows[1][0].count;

                    if(!_model){
                        throw new Error('The node is not exist!');
                    }
                    var _treeOrder = +_model.zxnz_tree_Order,
                        _newOrder = _treeOrder - 1;

                    if(order=='down'){
                        _newOrder = _treeOrder + 1;
                    }

                    if(_newOrder < 1 ){
                        _newOrder = 1;
                    }

                    if(_newOrder > _count){
                        _newOrder = _count;
                    }

                    var _sql = 'update {0} set zxnz_tree_Order={1} where zxnz_tree_Order={2} and zxnz_tree_Pid={3};'.format(table, _treeOrder, _newOrder, _model.zxnz_tree_Pid);
                    _sql += 'update {0} set zxnz_tree_Order={1} where zxnz_ID={2};'.format(table, _newOrder, _model.zxnz_ID);
                    return _sql;
                });
        },
        moveNode: function (table, source, target){
            var _fields = "zxnz_ID, zxnz_tree_Pid, zxnz_tree_Depth, zxnz_tree_Order, zxnz_tree_Son_Count, zxnz_tree_Max_Son_Count, zxnz_tree_Parent_Path";
            return this.createTransactionBlock()
                .query(this.sql.select({
                    table: table,
                    fields: _fields,
                    where: { zxnz_ID: source }
                }) + this.sql.select({
                    table: table,
                    fields: _fields,
                    where: { zxnz_ID: target }
                }) + this.sql.select({
                    table: table,
                    fields: "max(zxnz_tree_Order) as target_zn_tree_order",
                    where: { zxnz_tree_Pid: target }
                }))
                .query('order', function (sql, rows, fields){
                    var _source = rows[0][0],
                        _target = rows[1][0],
                        _target_zn_tree_order = rows[2][0].target_zn_tree_order;

                    if(_source.zxnz_tree_Parent_Path == _target.zxnz_tree_Parent_Path + _source.zxnz_ID + ','){
                        throw new Error('The source has in target node!');
                    }
                    if(!_target || !_source){
                        throw new Error('The target or source is not exist!');
                    }

                    var _sqls = [];
                    _sqls.push(this.sql.update({
                        table: table,
                        updates: "zxnz_tree_Son_Count=zxnz_tree_Son_Count-1",
                        where: {
                            zxnz_ID: _source.zxnz_tree_Pid
                        }
                    }));

                    _sqls.push(this.sql.update({
                        table: table,
                        updates: {
                            zxnz_tree_Pid: _target.zxnz_ID,
                            zxnz_tree_Depth: _target.zxnz_tree_Depth + 1,
                            zxnz_tree_Order: _target.zxnz_tree_Order + 1,
                            zxnz_tree_Parent_Path: _target.zxnz_tree_Parent_Path + _target.zxnz_ID + ','
                        },
                        where: {
                            zxnz_ID: _source.zxnz_ID
                        }
                    }));

                    _sqls.push(this.sql.update({
                        table: table,
                        updates: {
                            zxnz_tree_Son_Count: _target.zxnz_tree_Son_Count + 1
                        },
                        where: {
                            zxnz_ID: _target.zxnz_ID
                        }
                    }));

                    _sqls.push(this.sql.update({
                        table: table,
                        updates: "zxnz_tree_Order = zxnz_tree_Order - 1",
                        where: "zxnz_tree_Pid = " + _source.zxnz_ID + " and zxnz_tree_Order > " + _source.zxnz_tree_Order
                    }));

                    _sqls.push(this.sql.update({
                        table: table,
                        updates: "zxnz_tree_Parent_Path=replace(zxnz_tree_Parent_Path, '"+_source.zxnz_tree_Parent_Path+"', '"+_target.zxnz_tree_Parent_Path + _target.zxnz_ID + ",')",
                        where: "locate('"+_source.zxnz_tree_Parent_Path + _source.zxnz_ID +"', zxnz_tree_Parent_Path)<>0"
                    }));

                    return _sqls.join('');
                });
        }
    }
});