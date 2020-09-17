/**
 * Created by yangyxu on 7/14/15.
 */
require('./index');
var fs = require('fs'),
    os = require('os'),
    node_child_process = require('child_process'),
    node_path = require('path');

module.exports = zn.Class({
    statics: {
        start: function (env, argv, events) {
            return new this(env, argv, events);
        }
    },
    properties: {
        env: null,
        argv: null,
        events: null,
        server: null
    },
    methods: {
        init: function (env, argv, events){
            this._env = env;
            this._argv = argv;
            this._events = events;
            this._count = 0;
            this.start(argv);
        },
        __initProcessEvents: function (){
            require('events').EventEmitter.defaultMaxListeners = 100;
            process.on('beforeExit', function (code) {
                zn.error('process.beforeExit', code);
            }.bind(this));
            process.on('disconnect', function (err, origin) {
                zn.error('process.disconnect', err, origin);
            }.bind(this));
            process.on('exit', function (code) {
                zn.error("process.exit(", code + ")");
            }.bind(this));
            process.on('message', function (message, sendHandle) {
                zn.error('process.message', message, sendHandle);
            }.bind(this));
            process.on('multipleResolves', function (type, promise, value) {
                zn.error('process.multipleResolves', type, promise, value);
            }.bind(this));
            process.on('rejectionHandled', function (promise) {
                zn.error('process.rejectionHandled', promise);
            }.bind(this));
            process.on('unhandledRejection', function (reason, promise) {
                zn.error('process.unhandledRejection', reason, promise);
            }.bind(this));
            process.on('uncaughtException', function (err, origin) {
                zn.error('process.uncaughtException', err, origin);
            }.bind(this));
            process.on('uncaughtExceptionMonitor', function (err, origin) {
                zn.error('process.uncaughtExceptionMonitor', err, origin);
            }.bind(this));
            process.on('warning', function (err, origin) {
                zn.warn('process.warning', err, origin);
            }.bind(this));
            process.on('SIGHUP', function (){

            }.bind(this));
        },
        start: function (argv){
            var _configFilePath = this.getConfigFilePath(),
                _config = argv || this._argv;
            if(fs.existsSync(_configFilePath)){
                this.createHttpServer(zn.deepAssign(require(_configFilePath), _config));
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
            this.__initProcessEvents();
            var _config = config || this._config,
                _restart = zn.extend({
                    timeout: 5000,
                    max: 5
                }, _config.restart);
            if(this._count > _restart.max){
                return zn.error('Restart count has over max value.'), false;
            }

            this._config = _config;
            this._count = this._count + 1;
            try {
                if(this._argv.debug){
                    zn.debug('config: ', _config);
                }
                if(_config.node_paths){
                    zxnz.resolve(_config.node_paths, _config.includeParentPath);
                }
                if(_config.server_path){
                    zxnz.http = zxnz.require(node_path.resolve(_config.server_path, 'zeanium-http-server'), node_path.resolve(_config.server_path, '@zeanium/http-server'));
                }else{
                    zxnz.http = zxnz.require('@zeanium/http-server', 'zeanium-http-server');
                }
                this._server = zxnz.http.Server.createServer(_config);
                this._server.uses(require('./src/middleware/index.js'));
                this._server.start();
            } catch (err) {
                zn.error(err);
            }
        }
    }
});
