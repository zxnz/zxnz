module.exports = zn.Middleware.Server({
    methods: {
        started: function (config, server){
            var _databases = config.databases || [],
                _exports = null;
            _databases.map(function (db){
                if(db.default){
                    _exports = zxnz.require(db.modules);
                    zxnz.store = new _exports.Store(db);
                    zxnz.sql.initial(_exports);
                }else if(db.name){

                }
            });
        }
    }
});