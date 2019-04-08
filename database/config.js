const mysql = require('mysql');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('bandtogether', 'root', 'password', {
    host: 'localhost',
    dialect: mysql,
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });




