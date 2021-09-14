/**
 * Created by yangyxu on 7/14/15.
 */
var node_redis = require('redis');
module.exports = zn.SessionContext('ZNSession-Redis', {
    reset: false,
    properties: {
        redisClient: null
    },
    methods: {
        init: function (config, serverContext){
            try {
                config.retry_strategy = function(options) {
                    if (options.error && options.error.code === "ECONNREFUSED") {
                      // End reconnecting on a specific error and flush all commands with
                      // a individual error
                      return new Error("The server refused the connection");
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                      // End reconnecting after a specific timeout and flush all commands
                      // with a individual error
                      return new Error("Retry time exhausted");
                    }
                    if (options.attempt > 10) {
                      // End reconnecting with built in error
                      return undefined;
                    }
                    // reconnect after
                    return Math.min(options.attempt * 100, 3000);
                };
                var _client = this._redisClient = node_redis.createClient(config);
                _client.select(0, function (err, res){
                    if(err){
                        return false;
                    }else{
                        zn.trace('Redis Session Context Connect DB0 Success.');
                    }
                });
                _client.on('error', function (err){
                    zn.error('Redis Session Context Client Error.', err);
                });
                _client.on('ready', function (){
                    zn.info('Redis Session Context Client Ready.');
                });
                _client.on('connect', function (){
                    zn.info('Redis Session Context Client Connect.');
                });
                _client.on('reconnecting', function (){
                    zn.info('Redis Session Context Client Reconnecting.');
                });
                _client.on('end', function (){
                    zn.error('Redis Session Context Client End.');
                });
                _client.on('warning', function (){
                    zn.warn('Redis Session Context Client Warning.');
                });
                //node_redis.debug_mode = true;
                process.nextTick(function() {
                    // Force closing the connection while the command did not yet return
                    //zn.error('redis client end.');
                    //_client.end(true);
                    //node_redis.debug_mode = false;
                });
            } catch (err) {
                zn.error('Redis Client Error: ', err);
            }
        },
        getIds: function (success, error){
            return this._redisClient.keys("*", function (){

            }), this;
        },
        getSession: function (sessionId, success, error){
            var _data = this.jwtVerifyToken(sessionId);
            if(_data.exp > Date.now()){
                return error && error(new zn.ERROR.HttpRequestError({
                    code: 401,
                    message: "401.1 Token失效",
                    detail: "登录Token已经过期失效。"
                })), this;
            }

            return this.getSessionByKey(_data.data, success, error);
        },
        getSessionByKey: function (sessionKey, success, error){
            zn.debug('RedisSessionContext sessionKey: ', sessionKey);
            return this._redisClient.get(sessionKey, function (err, value){
                if(err) {
                    return error && error(err);
                }
                if(value) {
                    var _session = this.newSession(JSON.parse(value));
                    _session.updateExpiresTime();
                    _session.isNew = false;
                    _session.save();
                    return success && success(_session);
                }

                return error && error(new zn.ERROR.HttpRequestError({
                    code: 401,
                    message: "401.1 Token失效",
                    detail: "登录Token已经过期失效。"
                }));
            }.bind(this)), this;
        },
        removeSession: function (session){
            var _key = session.getKey();
            if(!_key) {
                return zn.error('Session key is not exist!'), this;
            }

            return this._redisClient.expire(session.getKey(), -1), this;
        },
        saveSession: function (session){
            var _key = session.getKey(),
                _expire = this._config.expire || 60 * 60 * 24;
            if(!_key){
                return zn.error('Session key is not exist!'), this;
            }

            zn.info('save session (redis): ', {
                key: _key,
                createdTime: session._createdTime,
                expiresTime: session._expiresTime,
                expire: _expire,
                session: session.getProps()
            });
            this._redisClient.set(_key, session.serialize(), node_redis.print);
            if(session.isNew){
                this._redisClient.expire(_key, _expire);
            }

            return this;
        },
        empty: function (success, error){
            var _this = this;
            this._redisClient.keys("*", function (err, res){
                if(err){
                    return error && error(err);
                }
                for(var key of res){
                    _this._redisClient.expire(key, -1);
                }

                success && success();
            });
        },
        all: function (success, error){
            this._redisClient.keys("*", function (err, res){
                if(err){
                    return error && error(err);
                }
                success && success(res);
            });
        },
        size: function (success, error){
            this._redisClient.keys("*", function (err, res){
                if(err){
                    return error && error(err);
                }
                success && success(res.length);
            });
        },
        setKeyValue: function (key, value){
            zn.debug('redis setKey: ', key, value);
            return this._redisClient.set(key, value), this;
        },
        getKeyValue: function (key, callback){
            if(!key){
                return zn.error('redis getKey: key is null or undefined.');
            }
            zn.debug('redis getKey: ', key, callback);
            return this._redisClient.get(key, callback || function (){});
        },
        removeKey: function (key){
            zn.debug('redis removeKey: ', key);
            return this._redisClient.expire(key, -1), this;
        }
    }
});