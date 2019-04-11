const account = require('./account');
const listing = require('./listing');
const artist = require('./artist');
const {
  makeAccount,
  updateArtistDetails,
  deleteArtistData,
  getAccountInformation,
  getProfileInformation,
  makeListing,
  getListings,
  updateListings,
  deleteListingProperties,
  deleteListing,
  getListingsByAccountId,
} = require('../database/index');

const addData = () => {
  const profileArr = account.map((acc, index) => {
    return Object.assign(artist[index], acc);
  });

  // profileArr.forEach(profile => {
  //   return makeAccount(profile);
  // });

  listing.forEach(listing => {
    listing.date = 01012000;
    makeListing({id: listing.artist_id}, listing);
  });
}
// addData();

module.exports = addData;