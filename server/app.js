const express = require('express');
const path = require('path');
const session = require('express-session');
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database/index');
const { sequelize, Account } = require('../database/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// require('../mockData/addMochData')();

passport.use(new LocalStrategy((username, password, done) => {
  Account.findOne({ where: { username: username }})
    .then((account) => {
      if (!account) {
        return done(null, false, {message: 'Unknown User'});
      }
      bcrypt.compare(password, account.password)
        .then((isValid) => {
          if (isValid) {
            return done(null, account);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        })
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Account.findOne({ where: {id: id}})
    .then((account) => {
      done(null, account);
    })
    .catch((err) => {
      done(err, false);
    })
})

// Does not export anything yet. Just there to test the sequelize database.
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
    return uuid()
  },
  store: sessionStorage,
  secret: 'papa watzke sucks',
  // need to change this secret in production to a rand string as an env variable
  resave: false,
  saveUninitialized: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());


app.get('/listings', (req, res) => {
  db.getListings()
  .then((listings) => {
      res.send(listings);
    })
  .catch((err) => {
    res.send(err);
  })
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

app.get('/artist', (reg, res) => {
    db.getAllArtists()
    .then((artists) => {
      res.send(artists)
    })

})

app.post('/artist', (req, res) => {
  const newProfile = req.body;
  // createProfile(newProfile)
  //   .then(() => {
  //     res.sendStatus(201)
  // })
})

app.post('/signup', (req, res) => {
  const { password1, password2, username, email, solo } = req.body;

  if (password1 === password2) {
    const newAccount = {
      username: username,
      email: email,
      password: password1,
      solo: solo,
    }
    db.makeAccount(newAccount)
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {
        res.status(500).send("Account already exists!");
      })
  } else {
    res.status(500).send("Passwords don't match!");
  }
})


app.post('/login', passport.authenticate('local', { successRedirect: "/success", failureRedirect: "/failure" }));

app.post('/logout', (req, res) => {
  req.logout();
  res.send('success');
})

app.get('/success', (req, res) => {
  res.send('Logged in!');
})

app.get('/failure', (req, res) => {
  res.send('Failed to log in');
})

app.get('/checkauth', (req, res) => {
  if (req.isAuthenticated()) {
    res.send("true");
  } else {
    res.send("false");
  }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});