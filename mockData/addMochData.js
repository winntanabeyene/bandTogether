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

  makeAccount(profileArr[0])

  // profileArr.forEach(profile => {
  //   return makeAccount(profile);
  // });

  // listing.forEach(listing => {
  //   makeListing(listing.id, listing);
  // });
}
addData();

module.exports = addData;