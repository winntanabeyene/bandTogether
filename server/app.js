const express = require('express');
const path = require('path');
const session = require('express-session');
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database/index');
const { sequelize, Account, Listing, Artist } = require('../database/config');
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
    console.error(err);
    res.send(500);
  })
});

app.get('/listings/contact', (req, res) => {
  const {id} = req.query;
  Listing.findOne({ where: {id}})
    .then(listing => Artist.findOne({ where: {id: listing.artistId}}))
    .then((artist) => {
      res.send(artist);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
});

app.post('/listings', (req, res) => {
  const newListing = req.body;
  if(req.isAuthenticated()) {
    Account.findOne({ where: {id: req.user.id}})
      .then(account => account.getArtist())
      .then(artist => db.makeListing(artist.id, newListing))
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});

app.get('/artist/:artistname', (req, res) => {
  const { artistname } = req.params;
  db.getArtist({name: artistname})
    .then(profile => {
      res.send(profile);
    })
    .catch(err => {
      res.sendStatus(500);
    })
});

app.get('/artist', (reg, res) => {
  db.getAllArtists()
  .then((artists) => {
    res.send(artists)
  })
  .catch(err => {
    console.error(err);
    res.send(500);
  })
});

app.post('/signup', (req, res) => {
  const { password1, password2, username, email, solo, contact_email, city, name } = req.body;
  if(!password1 || !username || !email || solo === undefined || !contact_email || !city || !name){
    res.status(500).send("Please give all required information");
  } else if (password1 === password2) {
    const newAccount = {
      username,
      email,
      password: password1,
      solo,
      city,
      name,
      contact_email,
    };
    db.makeAccount(newAccount)
      .then(account => db.makeArtist(account.id, newAccount)
        .then(() => {
          req.login(account, (err) => {
            if (err) throw err;
            res.send('success')
          });
        })
      )
      .catch((error) => {
        res.status(500).send("Account already exists!");
      })
  } else {
    res.status(500).send("Passwords don't match!");
  };
});

app.patch('/artist', (req, res) => {
  const details = req.body;
  console.log(details);
  if(req.isAuthenticated()) {
    db.getAccountInformation({id: req.user.id})
      .then(account => account.getArtist())
      .then(artist => db.updateArtistDetails(artist.id, details))
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.error(err);
        res.send(500);
      })
  } else {
    res.sendStatus(403);
  }
});

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
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});