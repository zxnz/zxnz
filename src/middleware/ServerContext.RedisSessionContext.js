/**
 * Created by yangyxu on 7/14/15.
 */
var node_redis = require('redis');
module.exports = zn.SessionContext('ZNSESSIONID_REDIS', {
    properties: {
        redisClient: null
    },
    methods: {
        init: function (config, serverContext){
            try {
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
            } catch (err) {
                zn.error('Redis Client Error: ', err);
            }
            this.super(config, serverContext);
        },
        getIds: function (success, error){
            return this._redisClient.keys("*", function (){

            }), this;
        },
        getSession: function (sessionId, success, error){
            this._redisClient.get(sessionId, function (err, value){
                if(value && !err) {
                    var _session = this.newSession();
                    _session.setProps(JSON.parse(value));
                    _session.setId(sessionId);
                    _session.updateExpiresTime();
                    _session.save();
                    success && success(_session);
                }else{
                    error && error(err);
                }
            }.bind(this));

            return this;
        },
        removeSession: function (sessionId){
            return this._redisClient.expire(sessionId, -1), this;
        },
        saveSession: function (session){
            var _id = session.getId(),
                _expire = this._config.expire || 60 * 60 * 24;
            if(!_id){
                zn.error('Session id is not exist!');
            }else{
                zn.info('save session: ', _expire, _id);
                this._redisClient.set(_id, session.serialize());
                this._redisClient.expire(_id, _expire);
            }

            return this;
        },
        empty: function (){
            
        },
        size: function (success, error){
            this._redisClient.keys('*', function (){

            });
        }
    }
});