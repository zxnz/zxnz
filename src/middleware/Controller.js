var db_mysql = require('zeanium-database-mysql');
console.log(db_mysql);
module.exports = zn.Middleware.Controller({
    methods: {
        init: function (controller, application){
            //zn.info(controller);
        },
        define: function (name, mate){
            //zn.info(name, mate);

        }
    }
});