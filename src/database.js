const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('CONEXION PERDIDA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('DEMASIADAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('CONEXION RECHAZADA');
        }
    }

    if (connection) connection.release();
    console.log('Db esta conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;