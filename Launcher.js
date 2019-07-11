/**
 * Created by yangyxu on 7/14/15.
 */
var fs = require('fs'),
    os = require('os'),
    node_path = require('path'),
    HttpServer = null;

try {
    HttpServer = require('@zeanium/http-server').Server;
} catch (error) {
    try {
        HttpServer = require('zeanium-http-server').Server;
    } catch (error) {
        return zn.error('zeanium-http-server is not exist.');
    }
}

var middlewares = require('./src/middleware');

module.exports = zn.Class({
    properties: {
        env: null,
        argv: null
    },
    methods: {
        init: function (env, argv){
            this._env = env;
            this._argv = argv;
            this.start();
        },
        start: function (){
            var _configFilePath = this.getConfigFilePath(),
                _config = this._argv;
            if(fs.existsSync(_configFilePath)){
                this.createHttpServer(zn.overwrite(require(_configFilePath), _config));
            }else {
                this.createHttpServer(_config);
            }
        },
        getConfigFilePath: function (){
            return process.cwd() + node_path.sep + (this._argv.config || 'zn.server.config.js');
        },
        getHost: function (){
            var _host = os.platform() === 'darwin'?'127.0.0.1':'0.0.0.0';
            if(!this._argv.debug){
                zn.each(os.networkInterfaces(), function (env){
                    zn.each(env, function (item){
                        if(item.family=='IPv4'&&!item.internal){
                            _host = item.address;
                        }
                    })
                });
            }

            return _host;
        },
        createHttpServer: function (config){
            if(this._argv.debug){
                zn.debug('Config: ', config);
            }else {
                process.on('uncaughtException', function (err) {
                    zn.error(err);
                    zn.error(err.stack);
                });
                process.on('exit', function (code) {
                    zn.info('Exit code: ', code);
                });
            }
            try {
                var server =  HttpServer.createServer(config);
                server.uses(middlewares);
                server.start();
            } catch (err) {
                zn.error(err.message);
                zn.error(err);
            }
        }
    }
});
