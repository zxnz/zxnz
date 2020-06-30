var open = require('open');
module.exports = zn.Middleware.ServerContext({
    methods: {
        init: function (){

        },
        accept: function (clientRequest, serverResponse){
            /*
            if(this.config.session){
                clientRequest.session = new Session(clientRequest, serverResponse, this);
                if(clientRequest.session.validate() === false) return;
            }*/
        },
        loadCompleted: function (timestamp, urls, contenxt){
            if(contenxt._config.open) {
                var _open = zn.deepAssign({
                    browser: 'google chrome'
                }, contenxt._config.open);
                if((this._openChildProcess && !this._openChildProcess.killed)) {
                    return false;
                }
                this._openChildProcess = open(_open.url || urls[0], _open.browser, function(err) {
                    if (err) throw err;
                });
            }
            if(process.env.NODE_ENV == 'development') {
                zn.debug('routes( ' + contenxt.routes.length + ' ): ')
                contenxt.routes.forEach(function (route){
                    zn.debug('route: ',  route.path);
                });
            }
        }
    }
});