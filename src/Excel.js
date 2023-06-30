var node_xlsx = require('xlsx');
var node_officegen = require('officegen');

module.exports = zn.Class({
    static: true,
    properties: {
        
    },
    methods: {
        init: function (){
            
        },
        __parseColumns__: function (columns){
            var _columns = [], _column = null;
            zn.each(columns, (column)=>{
                if(column){
                    _column = {  
                        label: column.label, 
                        name: column.name,
                        text: column.text
                    };
                    if(column.filter && column.filter.data) {
                        _column.data = this.arrayToValueMap(column.filter.data, 'value', 'text');
                    }
                    _columns.push(_column);
                }
            });

            return _columns;
        },
        arrayToValueMap: function (ary, valueKey, labelKey){
            if(!zn.is(ary, 'array')){
                throw new Error('data is not array.');
            }
            var _obj = {};
            var _valueKey = valueKey || 'value', _labelKey = labelKey || 'text';
            for(var item of ary) {
                _obj[item[_valueKey]] = item[_labelKey] || item.label || '';
            }
    
            return _obj;
        },
        loadRequestExcels: function (request, file_callback, sheet_callback){
            var _arrayData = [], _objectData = {}, _file_data = [], _sheets = null;
            var _files = request.uploadFiles({}, ()=>{ });
            console.log(_files);
            for(var _file of _files){
                var _return  = file_callback && file_callback(_file);
                if(_return === false) {
                    continue;
                }
                if(_file.ext == '.xlsx' || _file.ext == '.csv'){
                    _sheets = node_xlsx.readFile(_file.savedPath).Sheets;
                    for(var name in _sheets) {
                        _file_data = node_xlsx.utils.sheet_to_json(_sheets[name], { /*header: 1, raw: false*/ });
                        var _return  = sheet_callback && sheet_callback(_file_data, name, _sheets[name]);
                        if(_return === false) {
                            continue;
                        }
                        _objectData[name] = _file_data;
                        if(zn.is(_file_data, 'array')){
                            _arrayData = _arrayData.concat(_file_data);
                        }
                    }
                }
            }

            return {
                arrayData: _arrayData,
                objectData: _objectData
            };
        },
        generate: function (data, callback){
            if(!data || !data.length){
                return;
            }
            var _xlsx = node_officegen('xlsx'), _sheet = null;
            var _labels = [], _names = [], _data = [], _return = null;
            var _columns = [], _value = null;
            for(var sheet of data) {
                _sheet = _xlsx.makeNewSheet();
                _sheet.name = sheet.name;
                _columns = [];
                _labels = []; 
                _names = []; 
                _data = [];
                if(zn.is(sheet.columns, 'object')){
                    for(var key in sheet.columns) {
                        _columns.push({
                            label: key,
                            name: sheet.columns[key]
                        });
                    }
                }else if(zn.is(_columns, 'array')){
                    _columns = sheet.columns.slice(0);
                }
                for(var column of _columns){
                    _labels.push(column.label);
                    _names.push(column.name);
                }
                _sheet.data[0] = _labels;
                for(item of sheet.data) {
                    var _return = sheet.each && sheet.each(item, sheet);
                    if(_return === false){
                        continue;
                    }
                    _data = [];
                    if(zn.is(item, 'array')) {
                        _data = item;
                    }else if(zn.is(item, 'object')) {
                        for(var name of _names){
                            _value = '';
                            switch(zn.type(name)) {
                                case 'string':
                                    _value = item[name];
                                    break;
                                case 'array':
                                    _value = zxnz.resolveObjectValueFromKeys(item, name);
                                    break;
                                case 'function':
                                    //_value = name.call(null, item, name, _value);
                                    _value = name.call(null, item);
                                    break;
                            }
                            if(_value == null) {
                                _value = '';
                            }
                            _data.push(_value);
                        }
                    }
                    _return = callback && callback(_data, _names, item);
                    if(_return !== false){
                        _sheet.data.push(_data);
                    }
                }
            }

            return _xlsx;
        },
        createExcelDownloadStreamer: function (sheets){
            var _xlsx = node_officegen('xlsx'), _sheet = null, _columns = [], _headers = [];
            for(var sheet of sheets){
                _headers = [];
                _columns = this.__parseColumns__(sheet.columns);
                _sheet = _xlsx.makeNewSheet();
                _sheet.name = sheet.name;

                for(var _header of _columns){
                    _headers.push(_header.label);
                }
                _sheet.data[0] = _headers;

                for(var _item of sheet.data){
                    var _row = [];
                    for(var _column of _columns){
                        if(_column.data) {
                            _row.push(_column.data[_item[_column.name]]||'');
                        }else{
                            _row.push((_item[_column.text]||'').format(_item)||_item[_column.name]||'');
                        }
                    }
                    _sheet.data.push(_row);
                }
            }

            return _xlsx;
        }
    }
});