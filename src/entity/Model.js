/**
 * Created by yangyxu on 9/17/14.
 */
var Dao = require('./Dao.js');
var ModelSqlClass = require('./ModelSql.js');
var __ = {
    __getPropertyCreateSql: function (property, context){
        var _key = property.name,
            _type = property.type || [],
            _t1 = _type[0],
            _t2 = _type[1],
            _keys = [_key];

        if(Object.prototype.toString.call(_t2) == '[object Array]'){
            _t2 = _t2.join(',');
        }

        _keys.push(_t1+(_t2?'('+_t2+')':''));

        if(property.primary){
            property.notNull = true;
            _keys.push("PRIMARY KEY");
        }
        var _isnull = property.notNull?'NOT NULL':'';

        if(_isnull){
            _keys.push(_isnull);
        }

        var _default = this.__getPropertyDefaultValue(property, context);

        if(_default){
            _keys.push(_default);
        }
        var _autoIncrement = property.primary?'AUTO_INCREMENT':'';

        if(_autoIncrement){
            _keys.push(_autoIncrement);
        }

        return _keys.join(' ');
    },
    __getPropertyDefaultValue: function (property, context) {
        if(property.default !== undefined){
            var _value = property.default;
            if(zn.is(_value, 'function')){
                _value = _value.call(context, property, property.name);
            }

            switch(property.type[0].toLowerCase()){
                case 'nvarchar':
                case 'varchar':
                case 'longtext':
                case 'char':
                    _value = _value || '';
                    if(zn.is(_value, 'string')){
                        if(_value.indexOf('{') === 0 && _value.indexOf('}') === (_value.length-1)){
                            _value = _value.substring(1, _value.length-1);
                        }else {
                            _value = "'" + _value + "'";
                        }
                    }
                    break;
                case 'date':

                    break;
                case 'int':
                    _value = _value==null?0:_value;
                    break;
            }

            return 'DEFAULT '+_value;
        }
    }
};

var Model = zn.Class({
    statics: {
        getTable: function (){
            return (this.getMeta('tablePrefix')||'') + (this.getMeta('table')||'');
        },
        getCreateModelSql: function (){
            var _fields = [];
            this.getProperties(function (prop, key){
                if(!prop.type){
                    return -1;
                }
                prop.name = key;
                var _sql = __.__getPropertyCreateSql(prop, this);
                if(prop.primary){
                    _fields.unshift(_sql);
                }else {
                    _fields.push(_sql);
                }

                return -1;
            }, this);

            return zxnz.sql.SCHEMA.TABLE.CREATE.format({
                table: this.getTable(),
                fields: _fields.join(',')
            });
        },
        getValues: function (values){
            var _values = {},
                _value = null;
            this.getProperties(function (prop, key, props){
                if(!prop.type || prop.ignore){
                    return -1;
                }
                _value = values[key];
                if(_value == null){
                    _value = prop.get && prop.get.call(this, key, prop, values);
                }
                switch (prop.type[0].toLowerCase()) {
                    case 'int':
                    case 'float':
                        _value = +_value;
                        if(isNaN(_value)){
                            return -1;
                        }
                        break;
                    case 'datetime':
                        if(!_value){
                            return -1;
                        }
                        _value = _value.trim();
                        break;
                }
                if(_value != null) {
                    _values[key] = _value;
                }
            }, this);

            return _values;
        },
        getUpdates: function (updates){
            var _updates = {},
                _value = null;
            this.getProperties(function (prop, key, props){
                if(!prop.type){
                    return -1;
                }
                var _auto_update = prop.auto_update;
                if(_auto_update){
                    if(typeof _auto_update == 'function'){
                        _auto_update = _auto_update.call(this, prop, key, props);
                    }
                    if(_auto_update!=null){
                        _updates[key] = _auto_update;
                    }
                }else {
                    if(updates[key]!=null){
                        _updates[key] = updates[key];
                    }
                }
            }, this);

            return _updates;
        },
        getFields: function (inFields, hidden){
            var _props = this.getProperties(),
                _hidden = hidden || [];
            var fields = inFields||Object.keys(_props);

            if(typeof fields == 'function'){
                fields = fields.call(this);
            }
            if(fields){
                if(typeof fields == 'string'){
                    fields = fields.split(',');
                }
            }else {
                fields = Object.keys(_props);
            }

            var _prop = null,
                _fields = [],
                _format = null,
                _convert = null;
            zn.each(fields, function (field, index){
                field = field.trim();
                if((field).toString().indexOf(' as ')!=-1){
                    _fields.push(field);
                    return -1;
                }
                if(_hidden.indexOf(field)!=-1){
                    return -1;
                }

                if(typeof index == 'string'){
                    _fields.push(field + ' as ' + index);
                } else {
                    _prop = _props[field];
                    if(!_prop || !_prop.type || _prop.hidden){
                        return -1;
                    }
                    _format = _prop.format;
                    _convert = _prop.convert;
                    if(_convert){
                        _fields.push(_convert.replace(/\{\}/g, field) + ' as ' + field + '_convert')
                    }
                    if(_format){
                        _fields.push(_format.replace(/\{\}/g, field) + ' as ' + field);
                    }else {
                        _fields.push(field);
                    }
                }
            });

            return _fields.join(',');
        },
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
        },
        createModelSql: function (key, application){
            if(application && key && application.resolveModelSql(key)){
                return application.resolveModelSql(key);
            }
            
            var _ModelSqlClass = this.getMeta('ModelSql') || ModelSqlClass;
            var _key = key || _ModelSqlClass.getMeta('table');
            var _modelSql = new _ModelSqlClass(application, this);

            return application.registerModelSql(_key, _modelSql), _modelSql;
        }
    },
    methods: {
        init: {
            auto: true,
            value: function (args){
                this.sets(args);
            }
        },
        getTable: function (){
            return this.constructor.getTable();
        },
        getProperties: function (){
            return this.constructor.getProperties();
        }
    }
});

zxnz.Model = function (){
    var _args = arguments,
        _meta = {},
        _prefix = null;
    if(_args.length == 1){
        _meta = _args[0];
    }

    if(_args.length == 2){
        _meta = _args[1];
        _meta.table = _args[0];
    }
    _prefix = _meta.prefix || _meta.propertyPrefix;

    if(_prefix && _meta.properties){
        for(var _porp in _meta.properties){
            _meta.properties[_prefix + _porp] = _meta.properties[_porp];
            _meta.properties[_porp] = null;
            delete _meta.properties[_porp];
        }
    }

    return zn.Class(Model, (zxnz.http.Middleware.callMiddlewareMethod(zxnz.http.Middleware.TYPES.MODEL, "define", [_meta]) || _meta));
}

module.exports = Model;
