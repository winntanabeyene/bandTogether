const express = require('express');
const path = require('path');
// Does not export anything yet. Just there to test the sequelize database.
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
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/listings', () => {
  getListings()
    .then((listings) => {
      console.log(listings);
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});