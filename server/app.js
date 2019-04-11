const express = require('express');
const path = require('path');
const session = require('express-session');
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { sequelize, Account } = require('../database/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

passport.use(new LocalStrategy((username, password, done) => {
  Account.findOne({ username: username })
    .then((account) => {
      if (!account) {
        return done(null, false);
      }

      if (account.password != password) {
        return done(null, false);
      }
      return done(null, account);
    })
}))

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// sets up the session storage in sequelize database
const sessionStorage = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  genid: (req) => {
    console.log(req.sessionID);
    return uuid()
  },
  store: sessionStorage,
  secret: 'papa watzke sucks',
  // need to change this secret in production to a rand string as an env variable
  resave: false,
  saveUninitialized: true
}));


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

app.post('/signup', (req, res) => {
  // makeAccount()
})

app.get('/login', (req, res) => {
  console.log('Inside GET /login')
})

app.post('/login', (req, res) => {
  console.log('Inside POST /login')
})

app.post('/user/logout', (req, res) => {
  // End user's session
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});