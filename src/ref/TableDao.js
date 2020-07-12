module.exports = zxnz.Dao({
    Block: require('./TableDao.Block'),
    methods: {
        buildTable: function (uuid, tableField){
            return this.beginPoolTransaction()
                .block(this.block.buildTable(uuid, tableField))
                .commit();
        }
    }
});