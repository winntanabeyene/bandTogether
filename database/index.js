const { Account, Musician, Band, Listing, Profile, Instrument } = require('./config.js/index.js');

const account = new Account();
const musician = new Musician();
const band = new Band();
const listing = new Listing();
const profile = new Profile();
const instrument = new Instrument();
// don't know how to use the get<column> method yet, but these are here for that.

// sudo coded relationships like this so that we can get used to reading and using sequelize
// Musician.belongsTo(Account);
// Account.hasOne(Musician); // may cause errors, may just add functionality to the instatiation of Account
// Band.belongsTo(Account);
// Musician.hasMany(Listing);
// Band.hasMany(Listing);
// Listing.belongsTo(Musician);
// Listing.belongsTo(Band);
// Band.belongsToMany(Musician, {through: 'band_musician'});
// Musician.belongsToMany(Band, {through: 'band_musician'});
// Musician.belongsToMany(Instrument, {through: 'musician_instrument'});
// Instrument.belongsToMany(Musician, {through: 'musician_instrument'});





module.exports = {};
