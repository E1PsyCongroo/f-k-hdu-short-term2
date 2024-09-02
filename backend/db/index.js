const mysql = require('mysql');

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'focused_xy',
    password:process.env.DBPASSWORD,
    database:'financial'
});

module.exports = db;