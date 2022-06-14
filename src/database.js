// Requirements
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'ECONNREFUSED') {
            console.log('No has encendido la base de datos (Xampp)');
        }
    }

    if (connection) connection.release();
    console.log('Db is connected'); 
    return;
});

pool.query = promisify(pool.query);

// Export
module.exports = pool;