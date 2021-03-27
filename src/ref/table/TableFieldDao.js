module.exports = zxnz.Dao({
    Block: require('./TableFieldDaoBlock'),
    methods: {
        alterField: function (uuid, data){
            return this.beginPoolTransaction()
                .block(this.block.alterField(uuid, data))
                .commit();
        }
    }
});