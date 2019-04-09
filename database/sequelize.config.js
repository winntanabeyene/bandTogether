const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();

// Creates connection. As a matter of flexiblity, security, and habit the password has been moved to .env
// May move user name to .env incase of same reasons stated for password 
const sequelize = new Sequelize('bandtogether', 'root' /* may make env variable */, process.env.SQL_PASSWORD,{
  host: 'localhost',
  // port: 3306, // default port for mysql. There incase anyone needs it.
  database: 'mysql',
});

// checks to see if sequelize has correctly connected to the database and give an error if it hasn't.
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Any notes beyond this point may be temporary and used to help explain how sequelize works

// Sets up a model to create classes for tables. May need to move all tables to a different file for convention sake
const Model = Sequelize.Model

// circular dependances are problemact, therefore tabels with no foriegn keys are listed first

// these tables are made from classes so all the classes holding them will be capitalized for convention and understanding
class Account extends Model {}

// creates new table if it hasn't been made already. Methods made for these columns by sequelize are not created until sync and a class instantiation.
Account.init({
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
}, {
  sequelize, 
  modelName: 'account', // keeps sequelize from pluralizing the name. 
                        // There is another way to do this, this method is just a lot clearer and more intuitive.
                        // Also because the schema doesn't have caps I wanted to remove the capital letter at the start.
})

class instrament extends Model {}
instrament.init({
  name: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'instrament',
})

// from here tables will be created who's dependencies are already made. Still ignoring circular dependancies for now.

class band extends Model {}

// foriegn keys can be created in the init constructor, but will be made in functions following them instead.

band.init({
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  genre: Sequelize.STRING,
  year_formed: Sequelize.NUMBER,
}, {
  sequelize,
  modelName: 'band',
})

band.belongsTo(Account)

