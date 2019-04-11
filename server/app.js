const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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
require('../mockData/addMochData'); // uncommenting this adds moch data to your database if it is empty.
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.user(bodyParser.json());

app.get('/listings', (req, res) => {
  getListings()
    .then((listings) => {
      res.send(listings);
    })
})

app.post('/user/signup', (req, res) => {
  makeAccount()
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});