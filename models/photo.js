/**
 * Created by Administrator on 2017/7/18.
 */
const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'node_test'
});

/*function query(sql,callback){
    db.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}*/

module.exports = db;

