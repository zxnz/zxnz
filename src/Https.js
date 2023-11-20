var node_url = require('url');
var node_https = require('https');

module.exports = zn.Class({
    static: true,
    properties: {
        
    },
    methods: {
        init: function (){
            
        },
        get: function (url, success, error){
            return node_https.get(url, (res) => {
                var _list = [];
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    _list.push(chunk);
                });
                res.on('end', () => {
                    var data = JSON.parse(Buffer.concat(_list).toString());
                    success && success(data);
                });
            }).on('error', (err) => {
                zn.error('【zxnz.https】Error: ', err);
                error && error(err);
            });
        },
        post: function (url, options, success, error){
            var _obj = node_url.parse(url, true, false);
            var _cookies = [];
            if(options.request && options.request._cookies) {
                for(var cookie of options.request._cookies) {
                    _cookies.push(cookie._name + '=' + cookie._value);
                }
            }
            var _post_params = zn.querystring.stringify(options.data || {});
            var _request = node_https.request({
                method: 'POST',
                host: _obj.host,
                port: _obj.port || '443',
                path: _obj.path,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(_post_params),
                    'Cookie': _cookies.join(';')
                }
            }, (res)=>{
                var _chuck = '';
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    _chuck += data;
                });
                res.on('end', function (){
                    var _data = JSON.parse(_chuck);
                    if(_data.code == 200){
                        success && success(_data);
                    }else{
                        error && error(_data);
                    }
                });
            });
            _request.on('error', (err) => {
                zn.error('【zxnz.https】Error: ', err);
                error && error(err);
            });
            _request.write(_post_params);
            _request.end();
        }
    }
});