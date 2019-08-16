var Store = require('../entity/Store');
module.exports = zn.Middleware.Server({
    methods: {
        started: function (config, server){
            Store.getStore(config.databases || [], server.context);
        }
    }
});