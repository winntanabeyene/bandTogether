const accounts = require('./account');
const listings = require('./listing');
const artists = require('./artist');
const db = require('../database/index');

const addData = () => {
  setTimeout(() => {
    accounts.forEach((account, index) => {
      return db.makeAccount(account)
        .then(() => db.makeArtist(artists[index].account_id, artists[index]))
    })
    setTimeout(() => {
      listings.forEach((listing) => {
        db.makeListing(listing.artistId, listing)
      })
    }, 300)
  }, 300)
}
// addData();

module.exports = addData;