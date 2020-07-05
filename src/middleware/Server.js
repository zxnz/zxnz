module.exports = zn.Middleware.Server({
    methods: {
        started: function (config, server){
            if(config.databases){
                zxnz.store.registerDataBases(config.databases, {
                    
                });
            }
        }
    }
});