var open = require('open');
module.exports = zn.Middleware.ServerContext({
    methods: {
        init: function (){

        },
        loadCompleted: function (timestamp, urls, contenxt){
            var _open = zn.deepAssign({
                browser: 'google chrome'
            }, contenxt._config.open);
            if(process.env.NODE_ENV == 'development') {
                zn.debug('Routers: ', Object.keys(contenxt.routers));
                if((this._openChildProcess && !this._openChildProcess.killed)) {
                    return false;
                }
                this._openChildProcess = open(_open.url || urls[0], _open.browser, function(err) {
                    if (err) throw err;
                });
            }
        }
    }
});