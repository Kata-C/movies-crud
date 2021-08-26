const mysql = require('mysql');
const host = 'localhost';
const database = 'sistema_peliculas';
const user = 'root';
const password = '';

const connection = mysql.createConnection({ host, database, user, password });
const pool  = mysql.createPool({ host, database, user, password });

module.exports = pool;