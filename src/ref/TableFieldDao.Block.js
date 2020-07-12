/**
 * Created by yangyxu on 9/17/14.
 */
module.exports = zxnz.Block({
    methods: {
        alterField: function (uuid, tableField){
            var _pid = model.zxnz_tree_Pid || 0,
                _self = this;
            return this.createTransactionBlock()
                .query(_self.sql.select({
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
                    return _self.sql.insert({
                        table: table,
                        values: model
                    }) + _self.sql.update({
                        table: table,
                        updates: 'zxnz_tree_Son_Count=zxnz_tree_Son_Count+1',
                        where: {
                            zxnz_ID: _pid
                        }
                    });
                });
        }
    }
});