var Dao = require('./Dao.js');
var ModelRef = zn.Class({
    statics: {
        createDao: function (database){
            var _mixins = this.getMeta('mixins')||[],
                _Dao = this.getMeta('Dao'),
                _Daos = [];
            _mixins.filter(function (mixin){
                if(mixin.getMeta('Dao')){
                    _Daos.push(mixin.getMeta('Dao'));
                }
            });
            if(_Dao){
                _Daos.push(_Dao);
            }
            if(_Daos.length){
                var _DaoClass = zxnz.Dao({ mixins: _Daos });
                return new _DaoClass(this, database);
            }
            
            return new Dao(this, database);
        }
    },
    properties: {
        
    },
    methods: {
        init: {
            auto: true,
            value: function (database, dao){
                
            }
        }
    }
});

zxnz.ModelRef = function (){
    var _args = arguments,
        _meta = {},
        _prefix = null;
    if(_args.length == 1){
        _meta = _args[0];
    }

    if(_args.length == 2){
        _meta = _args[1];
        _meta.prefix = _args[0];
    }
    _prefix = _meta.prefix || _meta.propertyPrefix;

    if(_prefix && _meta.properties){
        for(var _porp in _meta.properties){
            _meta.properties[_prefix + _porp] = _meta.properties[_porp];
            _meta.properties[_porp] = null;
            delete _meta.properties[_porp];
        }
    }

    return zn.Class(ModelRef, _meta);
}

module.exports = ModelRef;
