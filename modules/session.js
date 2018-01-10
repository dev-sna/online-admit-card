var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
 
var options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'examinationsession'
};
 
var sessionStore = new MySQLStore(options);
 
module.exports= function(app){ 
    app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
    }))
    };