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
// require('../mockData/addMochData')(); // uncommenting this adds moch data to your database if it is empty. Make sure to run the code once to build the tables before you run this.
require('dotenv').config();


const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());


app.get('/listings', (req, res) => {
  const { artistId } = req.query;
  if (!artistId) {
    // getListingsByArtistId()
    //   .then((listings) => {
    //     res.send(listings);
    // })
  } else {
    // getListings()
    //   .then((listings) => {
    //     res.send(listings);
    // })
  }
})

app.get('/listings/:city', (req, res) => {
  const { city } = req.params;
  // getListingsByCity(city)
  //   .then((listings) => {
  //     res.send(listings);
  // })
})

app.get('/listings/search', (req, res) => {
  const search = req.query.q;
  // getListingsBySearch(search)
  //  .then((listings) => {
  //    res.send(listings)
  //})
})

app.get('/listings/contact', (req, res) => {
  const listingId = req.query.id;
  // getContactInfo(listingId)
  //   .then((contactInfo) => {
  //     res.send(contactInfo)
  // })
})

app.post('/listings', (req, res) => {
  const newListing = req.body;
  // createListing(newListing)
  //   .then(() => {
  //   res.sendStatus(201);
  // })
})

app.get('/artist/:artistname', (req, res) => {
  const { artistName } = req.params;
  // getProfileInfo(artistName)
  //   .then((profile) => {
  //      res.send(profile);
  // })
})

app.post('/artist', (req, res) => {
  const newProfile = req.body;
  // createProfile(newProfile)
  //   .then(() => {
  //     res.sendStatus(201)
  // })
})

app.post('/user/signup', (req, res) => {
  // makeAccount()
})

app.post('/user/login', (req, res) => {
  // Verify the user info
  // Give the user a session token
})

app.post('/user/logout', (req, res) => {
  // End user's session
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});