module.exports = zxnz.Dao({
    Block: require('./TableDao.Block'),
    methods: {
        buildTable: function (uuid, tableField){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this.block.buildTable(uuid, tableField))
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