const accounts = require('./account');
const listings = require('./listing');
const artists = require('./artist');
const db = require('../database/index');
const Listing = require('../database/config').Listing;

const addData = () => {
  accounts.forEach((account) => {
    db.makeAccount(account);
  })

  artists.forEach((artist) => {
    db.makeProfile(artist);
  })

  listings.forEach((listing) => {
    Listing.create(listing);
  })
}
// addData();

module.exports = addData;