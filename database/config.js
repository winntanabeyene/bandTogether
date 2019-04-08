const mysql = require('mysql');
const Sequelize = require('sequelize');

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'bandtogether',
 });
 