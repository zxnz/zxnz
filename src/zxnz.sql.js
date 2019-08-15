/**
 * Created by yangyxu on 8/11/19.
 */
module.exports = zxnz.sql = zn.Class({
    static: true,
    properties: {
        
    },
    methods: {
        initial: function (data){
            for(var key in data){
                this[key] = data[key];
            }
        },
        getBuilder: function (){
            if(!this.Builder){
                throw new zn.ERROR.HttpRequestError({
                    code: 401,
                    message: "HTTP/1.1 401 Unauthorized.",
                    details: "HTTP/1.1 401 Unauthorized, You Need Login Into System First."
                });
            }

            return this.Builder;
        },
        paging: function (){
            var _builder = this.getBuilder();
            return _builder.paging.apply(_builder, arguments);
        },
        select: function (){
            var _builder = this.getBuilder();
            return _builder.select.apply(_builder, arguments);
        },
        insert: function (){
            var _builder = this.getBuilder();
            return _builder.insert.apply(_builder, arguments);
        },
        update: function (){
            var _builder = this.getBuilder();
            return _builder.update.apply(_builder, arguments);
        },
        delete: function (){
            var _builder = this.getBuilder();
            return _builder.delete.apply(_builder, arguments);
        }
    }
});