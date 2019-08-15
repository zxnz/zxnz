/**
 * Created by yangyxu on 9/17/14.
 */
module.exports = zn.Class({
    methods: {
        addNode: function (table, model){
            var _pid = model.zxnz_tree_pid || 0;
            return zxnz.db.mysql.createTransactionBlock()
                .query(zxnz.sql.mysql.select({
                    table: table,
                    fields: 'zxnz_id, zxnz_tree_depth, zxnz_tree_parent_path, zxnz_tree_order',
                    where: {
                        zxnz_id: _pid
                    }
                }, {
                    table: table,
                    fields: 'max(zxnz_tree_order)+1 as zxnz_tree_order',
                    where: {
                        zxnz_deleted: 0,
                        zxnz_tree_pid: _pid
                    }
                }))
                .query('Insert node && Update parent node', function (sql, rows, fields){
                    var _pidModel = rows[0][0],
                        _treeOrder = rows[1][0].zxnz_tree_order|| 1,
                        _pid = _pidModel ? _pidModel.zxnz_id: 0,
                        _depth = (_pidModel?_pidModel.zxnz_tree_depth:0) + 1,
                        _parentPath = (_pidModel?_pidModel.zxnz_tree_parent_path:'') + (_pid === 0 ? '' : _pid) + ',';
                    if(typeof model == 'string'){
                        model = JSON.parse(model);
                    }
                    model.zxnz_tree_parent_path = _parentPath;
                    model.zxnz_tree_order = _treeOrder;
                    model.zxnz_tree_depth = _depth;
                    return zxnz.sql.mysql.insert({
                        table: table,
                        values: model
                    }) + zxnz.sql.mysql.update({
                        table: table,
                        updates: 'zxnz_tree_son_count=zxnz_tree_son_count+1',
                        where: {
                            zxnz_id: _pid
                        }
                    });
                });
        },
        deleteNode: function (table, where){
            return zxnz.db.mysql.createTransactionBlock()
                .query(zn.sql.select({
                    table: table,
                    fields: 'zxnz_id, zxnz_tree_pid, zxnz_tree_order',
                    where: where
                }))
                .query('delete', function (sql, rows, fields, tran){
                    var _model = rows[0];
                    if(_model){
                        var _sql = 'delete from {0} where zxnz_id={1};'.format(table, _model.zxnz_id),
                            _pid = +_model.zxnz_tree_pid;

                        if(_pid){
                            _sql += 'update {0} set zxnz_tree_son_count=zxnz_tree_son_count-1 where zxnz_id={1};'.format(table, _pid);
                        }
                        _sql += 'update {0} set zxnz_tree_order=zxnz_tree_order-1 where zxnz_tree_order>{1} and zxnz_tree_pid={2};'.format(table, _model.zxnz_tree_order, _pid);
                        _sql += "delete from {0} where locate(',{1},', zxnz_tree_parent_path)<>0;".format(table, _model.zxnz_id);
                        return _sql;
                    } else {
                        return this.rollback('The node is not exist!'), false;
                    }
                });
        },
        orderNode: function (table, id, order){
            return zxnz.db.mysql.createTransactionBlock()
                .query('select {0} from {1} where zxnz_id={2};select count(zxnz_id) as count from {1} where zxnz_tree_pid=(select zxnz_tree_pid from {1} where zxnz_id={2});'.format('zxnz_id, zxnz_tree_pid, zxnz_tree_order', table, id))
                .query('order', function (sql, rows, fields){
                    var _model = rows[0][0],
                        _count = rows[1][0].count;

                    if(_model){
                        var _treeOrder = +_model.zxnz_tree_order,
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

                        var _sql = 'update {0} set zxnz_tree_order={1} where zxnz_tree_order={2} and zxnz_tree_pid={3};'.format(table, _treeOrder, _newOrder, _model.zxnz_tree_pid);
                        _sql += 'update {0} set zxnz_tree_order={1} where zxnz_id={2};'.format(table, _newOrder, _model.zxnz_id);
                        return _sql;
                    } else {
                        return this.rollback('The node is not exist!'), false;
                    }
                });
        },
        moveNode: function (table, source, target){
            var _fields = "zxnz_id, zxnz_tree_pid, zxnz_tree_depth, zxnz_tree_order, zxnz_tree_son_count, zxnz_tree_max_son_count, zxnz_tree_parent_path";
            return zxnz.db.mysql.createTransactionBlock()
                .query(zxnz.sql.mysql.select({
                    table: table,
                    fields: _fields,
                    where: { zxnz_id: source }
                }) + zxnz.sql.mysql.select({
                    table: table,
                    fields: _fields,
                    where: { zxnz_id: target }
                })+"select max(zxnz_tree_order) as target_zn_tree_order from "+table+" where zxnz_tree_pid=" + target)
                .query('order', function (sql, rows, fields){
                    var _source = rows[0][0],
                        _target = rows[1][0],
                        _target_zn_tree_order = rows[2][0].target_zn_tree_order;

                    if(_source.zxnz_tree_parent_path == _target.zxnz_tree_parent_path + _source.id + ','){
                        return this.rollback('The source has in target node!'), false;
                    }
                    if(!_target || !_source){
                        return this.rollback('The target or source is not exist!'), false;
                    }

                    var _sqls = [];
                    _sqls.push(zxnz.sql.mysql.update({
                        table: table,
                        updates: "zxnz_tree_son_count=zxnz_tree_son_count-1",
                        where: {
                            id: _source.zxnz_tree_pid
                        }
                    }));

                    _sqls.push(zxnz.sql.mysql.update({
                        table: table,
                        updates: {
                            zxnz_tree_pid: _target.zxnz_id,
                            zxnz_tree_depth: _target.zxnz_tree_depth + 1,
                            zxnz_tree_order: _target_zn_tree_order + 1,
                            zxnz_tree_parent_path: _target.zxnz_tree_parent_path + _target.zxnz_id + ','
                        },
                        where: {
                            zxnz_id: _source.zxnz_id
                        }
                    }));

                    _sqls.push(zxnz.sql.mysql.update({
                        table: table,
                        updates: {
                            zxnz_tree_son_count: _target.zxnz_tree_son_count + 1
                        },
                        where: {
                            zxnz_id: _target.zxnz_id
                        }
                    }));

                    _sqls.push(zxnz.sql.mysql.update({
                        table: table,
                        updates: "zxnz_tree_order=zxnz_tree_order-1",
                        where: "zxnz_tree_pid=" + _source.zxnz_id + " and zxnz_tree_order>" + _source.zxnz_tree_order
                    }));

                    _sqls.push(zxnz.sql.mysql.update({
                        table: table,
                        updates: "zxnz_tree_parent_path=replace(zxnz_tree_parent_path, '"+_source.zxnz_tree_parent_path+"', '"+_target.zxnz_tree_parent_path + _target.zxnz_id + ",')",
                        where: "locate('"+_source.zxnz_tree_parent_path + _source.zxnz_id +"', zxnz_tree_parent_path)<>0"
                    }));

                    return _sqls.join('');
                });
        }
    }
});