var SnowflakeId = require('snowflake-id').default;

module.exports = zn.Class({
    static: true,
    properties: {
        default: null,
        order: null
    },
    methods: {
        init: function (){
            this.default = new SnowflakeId({
                mid : 42,
                offset : (2022 - 1970 ) * 31536000 * 1000
            });
            this.order = new SnowflakeId();
        },
        generate: function (){
            return this.default.generate();
        },
        generateOrderId: function (){
            return this.order.generate();
        }
    }
});