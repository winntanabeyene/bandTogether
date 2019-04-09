const Sequelize = require('sequelize');
require('dotenv').config();

// Creates connection. As a matter of flexiblity, security, and habit the password has been moved to .env
// May move user name to .env incase of same reasons stated for password 
const sequelize = new Sequelize('bandtogether', 'root', process.env.SQL_PASSWORD, {
  host: 'localhost',
  // port: 3306, // default port for mysql. There incase anyone needs it.
  dialect: 'mysql',
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
const Model = Sequelize.Model;

// circular dependances are problemact, therefore tabels with no foriegn keys are listed first

// these tables are made from classes so all the classes holding them will be capitalized for convention and understanding
class Account extends Model {};

// creates new table if it hasn't been made already. Methods made for these columns by sequelize are not created until sync and a class instantiation.
Account.init({
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
}, {
  sequelize, 
  modelName: 'account', // because the schema doesn't have caps I wanted to remove the capital letter at the start.
  freezeTableName: true, // keeps table from pluralizing name.
  underscored: true, // when an association is made with this tables id it will make it user_id as opposed to userId.
                     // if a primary key is set then associations will use that key name in place of id
                      // ex: superid being the name of the new primary key, will make a col user_superid or userSuperid.
});


class Instrument extends Model {};
Instrument.init({
  name: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'instrument',
  freezeTableName: true,
  underscored: true,
});

// from here tables will be created who's dependencies are already made. Still ignoring circular dependancies for now.

class Musician extends Model {};

// foriegn keys can be created in the init constructor, but will be made in functions following them instead.

Musician.init({
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  age: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: 'musician',
  freezeTableName: true,
  underscored: true,
});

// MAY BE ABLE TO USE BELONGSTO AND HASONE TOGETHER. NOT 100% SURE.

Musician.belongsTo(Account) // adds a account_id row to hold the account reference. 
                            // One-to-one association.
                            // a second argument with an object that has a few useful properties 
                            // one property is foreignKey that allows you to directly name the column that is created.
                            // so if we wanted to name the row the same way it is written in the schema we'd do this.
                              // Musician.belongsTo(Account, {foreignKey: 'id_musician'})
                            // creates .getAccount, .setAccount, and createAccount methods on Musician instantiation after sync.
                              // Musician.belongsTo(Account, {as: 'Acc'}) will set the names of these methods to setAcc, getAcc and createAcc.
                                // very useful for joining a table twice.
                            // .hasOne method does the same thing as the belongsTo method except Muscician and Account reverse rolls.
                              // in addition .getAccount and .setAccount will become .getMusician, setMusician, and createMusician on the Account instantiation.
                            // there is also a targetKey and sourceKey (for belongsTo and hasOne respectively) property to designate a reference besides the primary key. We don't use that so I'm not worried about it.
// Account.hasOne(Musician);


class Band extends Model {};
Band.init({
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  genre: Sequelize.STRING,
  year_formed: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: 'band',
  freezeTableName: true,
  underscored: true,
}); 

Band.belongsTo(Account);


class Listing extends Model {};

Listing.init({
  title: Sequelize.STRING,
  date: Sequelize.STRING,
  description: Sequelize.STRING(500), // will probably need to extend the length.
  venue: Sequelize.STRING,
  type: Sequelize.STRING,
  url_image: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'listing',
  freezeTableName: true,
  underscored: true,
});

Musician.hasMany(Listing); // same as belongsTo just for a one-to-many relationship
Band.hasMany(Listing);


class Profile extends Model {};

Profile.init({
  url_image: Sequelize.STRING,
  bio: Sequelize.STRING(500), // may need to increase
  url_bandcamp: Sequelize.STRING,
  url_spotify: Sequelize.STRING,
  url_facebook: Sequelize.STRING,
  url_homepage: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'profile',
  freezeTableName: true,
  underscored: true,
});

Musician.hasMany(Listing);
Band.hasMany(Listing);

// the many-to-many method .belongsToMany must be used both ways and in the object as its second argument must have the property through to define and/or create the table.

Band.belongsToMany(Musician, {through: 'band_musician'});
Musician.belongsToMany(Band, {through: 'band_musician'});
// can do this as Band.belongsToMany(Musician, {through: 'band_musician', otherKey: 'musician_id'}); but I don't know what the consequences are.
// if you want to own yourself you can do this Band.belongsToMany(Band, {through: 'owned'});

// band_musician table has been created.
// getBands, setBands, addBand, and addBands are now on Musician instantiations
// getMusicians, setMusicians, add Musician, and addMusicians are now on Band instantiations
// when using add property you can set it equal to an object with plural and singluar properties in order to name these methods like so:
  // Band.belongsToMany(Musician, {through: 'band_musician', as: {singluar: 'band', plural: 'bands'}})

Musician.belongsToMany(Instrument, {through: 'musician_instrument'});
Instrument.belongsToMany(Musician, {through: 'musician_instrument'});


// turns out no tables were circular, so just keep in mind that circular tables can cause problems and you will need to 
// set the constrains property to false in the relationship method second argument like so:
  // Musician.hasOne(Account, {constrains: false});
  // See docs for more info.


sequelize.sync()
  .then(() => {
    module.exports = {
      musician: new Musician(),
      band: new Band(),
      instrument: new Instrument(),
    };
  })
  .catch(err => {console.error(err)});

  