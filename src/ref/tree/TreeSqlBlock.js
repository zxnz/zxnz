/**
 * Created by yangyxu on 9/17/14.
 */

var TREE_FIELDS = "zxnz_ID, zxnz_Label, zxnz_tree_Pid, zxnz_tree_Depth, zxnz_tree_Order, zxnz_tree_Son_Count, zxnz_tree_Max_Son_Count, zxnz_tree_Parent_Path";
module.exports = zxnz.SqlBlock({
    methods: {
        editNodeById: function (data, id){
            return this.createTransactionBlock()
                .query(zxnz.sql.update({
                    table: this._table,
                    updates: data,
                    where: {
                        zxnz_ID: id
                    },
                    filter: true
                }));
        },
        selectChild: function (argv){
            return this.createTransactionBlock()
                .query(zxnz.sql.select(zn.extend({
                    table: this._table,
                    filter: true
                }, argv)));
        },
        selectChildByPid: function (pid){
            return this.createTransactionBlock()
                .query(zxnz.sql.select({
                    table: this._table,
                    where: {
                        zxnz_tree_Pid: pid
                    },
                    filter: true
                }));
        },
        selectAllChildByPid: function (pid){
            return this.createTransactionBlock()
                .query(zxnz.sql.select({
                    table: this._table,
                    where: "locate('," + pid +",', zxnz_tree_Parent_Path)<>0",
                    filter: true
                }));
        },
        addNodeByPid: function (pid, data){
            data.zxnz_tree_Pid = pid;
            return this.addNode(data);
        },
        addNode: function (model){
            var table = this._table;
            if(typeof model == 'string'){
                model = JSON.parse(model);
            }

            var _pid = model.zxnz_tree_Pid || 0;
            return this.createTransactionBlock()
                .query([
                    zxnz.sql.select({
                        table: table,
                        fields: TREE_FIELDS,
                        where: {
                            zxnz_ID: _pid
                        },
                        filter: true
                    }),
                    zxnz.sql.select({
                        table: table,
                        fields: 'max(zxnz_tree_Order)+1 as zxnz_tree_Order',
                        where: {
                            zxnz_Deleted: 0,
                            zxnz_tree_Pid: _pid
                        },
                        filter: true
                    })
                ])
                .query('Insert node && Update parent node', function (sql, rows, fields){
                    var _pidModel = rows[0][0],
                        _treeOrder = rows[1][0].zxnz_tree_Order|| 1,
                        _pid = _pidModel ? _pidModel.zxnz_ID: 0,
                        _depth = (_pidModel?_pidModel.zxnz_tree_Depth:0) + 1,
                        _parentPath = (_pidModel?_pidModel.zxnz_tree_Parent_Path:'') + (_pid === 0 ? '' : _pid) + ',';
                    
                    if(_pidModel && _pidModel.zxnz_tree_Max_Son_Count && _pidModel.zxnz_tree_Max_Son_Count == _pidModel.zxnz_tree_Son_Count){
                        throw new Error('The zxnz_tree_Max_Son_Count of the node is full!');
                    }

                    model.zxnz_UUID = zn.uuid();
                    model.zxnz_tree_Parent_Path = _parentPath;
                    model.zxnz_tree_Order = _treeOrder;
                    model.zxnz_tree_Depth = _depth;

                    return [
                        zxnz.sql.insert({
                            table: table,
                            values: model,
                            filter: true
                        }),
                        zxnz.sql.update({
                            table: table,
                            updates: 'zxnz_tree_Son_Count=zxnz_tree_Son_Count+1',
                            where: {
                                zxnz_ID: _pid
                            },
                            filter: true
                        })
                    ];
                });
        },
        deleteNode: function (where){
            var table = this._table;
            return this.createTransactionBlock()
                .query(zxnz.sql.select({
                    table: table,
                    fields: TREE_FIELDS,
                    where: where,
                    filter: true
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
        deleteChildByPid: function (pid){
            var table = this._table;
            return this.createTransactionBlock()
                .query(zxnz.sql.select({
                    table: table,
                    fields: TREE_FIELDS,
                    where: {
                        zxnz_ID: pid
                    },
                    filter: true
                }))
                .query('deleteChildByPid: ', function (sql, rows, fields, tran){
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
                    _sql += "delete from {0} where zxnz_tree_Pid={1};".format(table, _model.zxnz_ID);
                    return _sql;
                });
        },
        deleteAllChildByPid: function (pid){
            var table = this._table;
            return this.createTransactionBlock()
                .query(zxnz.sql.select({
                    table: table,
                    fields: TREE_FIELDS,
                    where: {
                        zxnz_ID: pid
                    },
                    filter: true
                }))
                .query('deleteAllChildByPid: ', function (sql, rows, fields, tran){
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
        orderNode: function (id, order){
            var table = this._table;
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
        moveNode: function (source, target){
            var table = this._table;
            return this.createTransactionBlock()
                .query([
                    zxnz.sql.select({
                        table: table,
                        fields: TREE_FIELDS,
                        where: { zxnz_ID: source },
                        filter: true
                    }),
                    zxnz.sql.select({
                        table: table,
                        fields: TREE_FIELDS,
                        where: { zxnz_ID: target },
                        filter: true
                    }),
                    zxnz.sql.select({
                        table: table,
                        fields: "max(zxnz_tree_Order) as target_max_zxnz_tree_Order",
                        where: { zxnz_tree_Pid: target },
                        filter: true
                    })
                ])
                .query('order', function (sql, rows, fields){
                    var _source = rows[0][0],
                        _target = rows[1][0],
                        _target_max_zxnz_tree_Order = rows[2][0].target_max_zxnz_tree_Order || 0;
                    
                    if(target == 0 && _source) {
                        return [
                            zxnz.sql.update({
                                table: table,
                                updates: "zxnz_tree_Son_Count=zxnz_tree_Son_Count-1",
                                where: {
                                    zxnz_ID: _source.zxnz_tree_Pid
                                },
                                filter: true
                            }),
                            zxnz.sql.update({
                                table: table,
                                updates: {
                                    zxnz_tree_Pid: 0,
                                    zxnz_tree_Depth: 1,
                                    zxnz_tree_Order: _target_max_zxnz_tree_Order + 1,
                                    zxnz_tree_Parent_Path: ','
                                },
                                where: {
                                    zxnz_ID: _source.zxnz_ID
                                },
                                filter: true
                            }),
                            zxnz.sql.update({
                                table: table,
                                updates: "zxnz_tree_Order = zxnz_tree_Order - 1",
                                where: "zxnz_tree_Pid = " + _source.zxnz_tree_Pid + " and zxnz_tree_Order > " + _source.zxnz_tree_Order,
                                filter: true
                            })
                        ];
                    }

                    if(!_target || !_source){
                        throw new Error('The target or source is not exist!');
                    }

                    if(_source.zxnz_tree_Pid == _target.zxnz_ID){
                        throw new Error('The source has in target node!');
                    }

                    if(_source.zxnz_tree_Parent_Path == _target.zxnz_tree_Parent_Path + _source.zxnz_ID + ','){
                        throw new Error('The source has in target node!');
                    }

                    return [
                        zxnz.sql.update({
                            table: table,
                            updates: "zxnz_tree_Son_Count=zxnz_tree_Son_Count-1",
                            where: {
                                zxnz_ID: _source.zxnz_tree_Pid
                            },
                            filter: true
                        }),
                        zxnz.sql.update({
                            table: table,
                            updates: {
                                zxnz_tree_Pid: _target.zxnz_ID,
                                zxnz_tree_Depth: _target.zxnz_tree_Depth + 1,
                                zxnz_tree_Order: _target_max_zxnz_tree_Order + 1,
                                zxnz_tree_Parent_Path: _target.zxnz_tree_Parent_Path + _target.zxnz_ID + ','
                            },
                            where: {
                                zxnz_ID: _source.zxnz_ID
                            },
                            filter: true
                        }),
                        zxnz.sql.update({
                            table: table,
                            updates: {
                                zxnz_tree_Son_Count: _target.zxnz_tree_Son_Count + 1
                            },
                            where: {
                                zxnz_ID: _target.zxnz_ID
                            },
                            filter: true
                        }),
                        zxnz.sql.update({
                            table: table,
                            updates: "zxnz_tree_Order = zxnz_tree_Order - 1",
                            where: "zxnz_tree_Pid = " + _source.zxnz_tree_Pid + " and zxnz_tree_Order > " + _source.zxnz_tree_Order,
                            filter: true
                        }),
                        zxnz.sql.update({
                            table: table,
                            updates: "zxnz_tree_Parent_Path=replace(zxnz_tree_Parent_Path, '"+_source.zxnz_tree_Parent_Path+"', '"+_target.zxnz_tree_Parent_Path + _target.zxnz_ID + ",')",
                            where: "locate('"+_source.zxnz_tree_Parent_Path + _source.zxnz_ID +"', zxnz_tree_Parent_Path)<>0",
                            filter: true
                        })
                    ];
                });
        }
    }
});