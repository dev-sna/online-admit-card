const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'examination',
    debug    :  false
});
module.exports = pool;