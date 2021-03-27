module.exports = zxnz.Dao({
    Block: require('./TableDaoBlock'),
    methods: {
        buildTable: function (uuid, tableField){
            return this.beginPoolTransaction()
                .block(this.block.buildTable(uuid, tableField))
                .commit();
        }
    }
});