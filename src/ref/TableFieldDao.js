module.exports = zxnz.Dao({
    Block: require('./TableFieldDao.Block'),
    methods: {
        alterField: function (uuid, data){
            var _defer = zn.async.defer();
            this.beginTransaction()
                .block(this.block.alterField(uuid, data))
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