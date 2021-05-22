module.exports = zn.Controller('zxnz.redis.session', {
    Service: require('./RedisSessionService'),
    methods: {
        size: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _sessionContext = context.sessionContext;
                _sessionContext.size(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        all: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _sessionContext = context.sessionContext;
                _sessionContext.all(function (data){
                    response.success(data);
                }, function (err){
                    response.error(err);
                });
            }
        },
        getKey: {
            method: 'GET/POST',
            route: '/getKey/:key',
            argv: {
                key: null,
            },
            value: function (request, response, application, context, router){
                var _sessionContext = context.sessionContext;
                var _key = request.getValue('key');
                _sessionContext.getKeyValue(_key, function (err, res){
                    if(err){
                        response.error(err);
                    }else{
                        if(res){
                            if(res.charAt(0)=='{'){
                                var _session = JSON.parse(res||'{}');
                                if(_session.expiresTime){
                                    var _expiresTime = new Date(_session.expiresTime);
                                    _session.expiresTimeString = _expiresTime.toLocaleDateString() + ' ' + _expiresTime.toLocaleTimeString();
                                }
                                response.success(_session);
                            }else{
                                response.success(res);
                            }
                        }else{
                            response.error('未找到key是"'+_key+'"的值。');
                        }
                    }
                });
            }
        },
        removeKey: {
            method: 'GET/POST',
            route: '/removeKey/:key',
            argv: {
                key: null,
            },
            value: function (request, response, application, context, router){
                var _sessionContext = context.sessionContext;
                _sessionContext.removeKey(request.getValue('key'));
                response.success('删除成功');
            }
        }
    }
});
