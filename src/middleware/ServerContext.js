var open = require('open');
var ServerControllers = require('./server.controller/index.js');
var RedisSessionContext = require('./ServerContext.RedisSessionContext');
module.exports = zn.Middleware.ServerContext({
    methods: {
        registerSessionContext: function (sessionContext, context) {
            if(context.config.session && context.config.session.redis) {
                return new RedisSessionContext(context.config.session.redis, context);
            }
        },
        requestAcceptBefore: function (clientRequest, serverResponse, context){
            if(clientRequest.url == '/favicon.ico' && !context.existPath(clientRequest.url)){
                return serverResponse.end(), false;
            }
        },
        accept: function (clientRequest, serverResponse){
            
        },
        requestAccept: function (clientRequest, serverResponse){

        },
        loadControllers: function (Controllers, context){
            return Controllers.concat(ServerControllers);
        },
        loadCompleted: function (timestamp, urls, context){
            var _config = context._config;
            if(_config.open) {
                var _open = zn.deepAssign({
                    browser: 'google chrome'
                }, _config.open);
                if((this._openChildProcess && !this._openChildProcess.killed)) {
                    return false;
                }
                this._openChildProcess = open(_open.url || urls[0], _open.browser, function(err) {
                    if (err) throw err;
                });
            }
            if(process.env.NODE_ENV == 'development') {
                zn.debug('routes( ' + context.routes.length + ' ): ')
                context.routes.forEach(function (route){
                    zn.debug('route: ',  route.path);
                });
            }

            if(_config.redis){
                try {
                    context.redisClient = node_redis.createClient(_config.redis);
                    context.on('error', function (err){
                        zn.error('Redis Client Error: ', err);
                    });
                    context.on('ready', function (){
                        zn.debug('Redis Client Ready: ');
                    });
                    context.on('connect', function (){
                        zn.debug('Redis Client Connect: ');
                    });
                    context.on('reconnecting', function (){
                        zn.debug('Redis Client Reconnecting: ');
                    });
                    context.on('end', function (){
                        zn.debug('Redis Client End: ');
                    });
                    context.on('warning', function (){
                        zn.warn('Redis Client Warning: ');
                    });
                } catch (err) {
                    zn.error('Redis Client Error: ', err);
                }
            }
        }
    }
});