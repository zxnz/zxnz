module.exports = zn.Controller('zxnz.redis.session', {
    Service: require('./RedisSessionService'),
    methods: {
        size: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _sessionContext = context.sessionContext;
                _sessionContext.size(function (err){
                    response.error(err);
                }, function (data){
                    response.success(data);
                });
            }
        },
        all: {
            method: 'GET/POST',
            value: function (request, response, application, context, router){
                var _sessionContext = context.sessionContext;
                _sessionContext.all(function (err){
                    response.error(err);
                }, function (data){
                    response.success(data);
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
                _sessionContext.getKey(request.getValue('key'), function (err, res){
                    if(err){
                        response.error(err);
                    }else{
                        var _session = JSON.parse(res||'{}');
                        if(_session.expiresTime){
                            var _expiresTime = new Date(_session.expiresTime);
                            _session.expiresTimeString = _expiresTime.toLocaleDateString() + ' ' + _expiresTime.toLocaleTimeString();
                        }
                        response.success(_session);
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
