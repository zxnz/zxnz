var SQL_TEMPLATE = "insert into {0} ({1}) values ({2});";

module.exports = zn.Class({
    methods: {
        parseJsonData: function (data){
            var _data = [];
            for(var key in data){
                _data = _data.concat(this.__getDataSql(key, data[key]));
            }

            return _data;
        },
        __getDataSql: function (table, data){
            var _sqls = [],
                _keys = [],
                _values = [],
                _dnode = {
                    zxnz_tree_depth: 1,
                    zxnz_tree_order: 1,
                    zxnz_tree_son_count: 0,
                    zxnz_tree_parent_path: ','
                },
                _pnode = null;
            data.forEach(function (item, index){
                if(item.zxnz_tree_pid){
                    _pnode = zn.overwrite(data[item.zxnz_tree_pid-1], _dnode);
                    _pnode.zxnz_tree_son_count = _pnode.zxnz_tree_son_count + 1;
                    item.zxnz_tree_order = _pnode.zxnz_tree_son_count;
                    item.zxnz_tree_depth = _pnode.zxnz_tree_depth + 1;
                    item.zxnz_tree_parent_path = _pnode.zxnz_tree_parent_path + item.zxnz_tree_pid + ',';
                }
            });

            data.forEach(function (item){
                _keys = [];
                _values = [];
                for(var key in item){
                    _keys.push(key);
                    _values.push(zn.is(item[key], 'string')?("'" +item[key]+ "'"):item[key]);
                }
                _sqls.push(SQL_TEMPLATE.format(table, _keys.join(','), _values.join(',')));
            });

            return _sqls;
        }
    }
});