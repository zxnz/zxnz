/**
 * Created by yangyxu on 7/14/15.
 */
require('./index');
var fs = require('fs'),
    os = require('os'),
    node_path = require('path');

module.exports = zn.Class({
    statics: {
        start: function (env, argv) {
            return new this(env, argv);
        }
    },
    properties: {
        env: null,
        argv: null,
        server: null
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
            return node_path.resolve(process.cwd(), (this._argv.config || 'zn.server.config.js'));
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
                if(config.node_paths){
                    zxnz.resolve(config.node_paths, config.includeParentPath);
                }
                zxnz.http = zxnz.require('@zeanium/http-server', 'zeanium-http-server');
                this._server = zxnz.http.Server.createServer(config);
                this._server.uses(require('./src/middleware/index.js'));
                this._server.start();
            } catch (err) {
                zn.error(err.message);
                zn.error(err);
            }
        }
    }
});
