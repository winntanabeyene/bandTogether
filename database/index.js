const { Account, Artist, Listing } = require('./config.js');

const optionalValues = ['city', 'state', 'genre', 'birthdate', 'url_image', 'bio', 'url_bandcamp', 'url_facebook', 
  'url_spotify', 'url_homepage', 'contact_email', 'contact_num', 'contact_facebook'];

/**
 * makes an object with certain variables, ignoring ones that are undefined by default.
 * @param {object} object - the object who's props are being taken.
 * @param {array} propsToTake - a list of properties to add to the object.
 * @param {boolean} allowNull - true to allow variables set to undefined or null.
 * @returns {Object}
 */
const makeObject = (object, propsToTake, allowNull = false) => {
  let returnObject = {}
  for(let key in object) {
    if (propsToTake.indexOf(key) !== -1 && !!object[key] !== allowNull) {
      returnObject[key] = object[key];
    }
  }
  return returnObject;
};



/**
 * Creates an object with id or username properties for a search. if neither are given then it returns undefined.
 * @param {account} - must have an account by id or username listed in the account table. If both are given will use id.
 * @returns {object}
 */
const makeSearchObject = (account) => {
  const { id, username } = account;
  const acc = {};
  // makes an object to use for search
  if(!username) {
    acc.id = id;
  } else if (!id) {
    acc.username = username;
  } else {
    console.error("please give id or username property in the account argument");
    return;
  }
  return acc;
};



/**
 * creates an account and an associated band or musician. I haven't worked out the kinks for returning an error yet, so for now,
 * it just console.errors an error message.
 * @param {object} accDetails - requires the properties of username, password, salt, name, solo, and email are all required.
 * city, state, genre, birthdate, image_url, url_image, bio, url_bandcamp, url_facebook, url_spotify, url_homepage, 
 * contact_email, contact_num, or contact_facebook.
 * @returns {Promise} 
 */
const makeAccount = (accDetails) => {
  const {username, password, salt, email, name, solo} = accDetails;
  if(!username || !password || !salt || !name || !solo || !email) {
    console.error("Attempted to make acc without required fields.")
    return;
  }
  const artistObj = makeObject(accDetails, ['name', 'solo'].concat(optionalValues))
  // makes account
  return Account.create({ username, password, salt, email })
  // makes artist
  .then(account => Artist.create(artistObj)
    // associates the new artist and account
    .then(artist => artist.setAccount(account.id))
  )
};



/**
 * Updates an account by id or username. If both are given will use id. Only adds or changes information. Does not remove it.
 * Does not allow for updating name or solo. 
 * @param {object} account - must have an account by id or username listed in the account table. If both are given will use id.
 * @param {object} update - properties to change. All are optional: city, state, genre, birthdate, url_image, bio, 
 * url_bandcamp, url_facebook, url_spotify, url_homepage, contact_email, contact_num, contact_facebook.
 */
const updateArtistDetails = (account, update) => {
  const acc = makeSearchObject(account);
  if (!acc) return; 
  const updateObject = makeObject(update, optionalValues);
  return Account.findOne(acc)
  // gets the associated artist
  .then(account => account.getArtist())
  // updates that artist
  .then(artist => artist.update(updateObject));
};



/**
 * deletes values from the database.
 * @param {object} account - must have an account by id or username listed in the account table. If both are given will use id.
 * @param {array} removeValues - array of values as strings to delete. Includes:city, state, genre, birthdate, url_image, bio, 
 * url_bandcamp, url_facebook, url_spotify, url_homepage, contact_email, contact_num, contact_facebook.
 */
const deleteArtistData = (account, removeValues) => {
  const acc = makeSearchObject(account);
  if (!acc) return;
  // makes an object to delete
  const updateObject = removeValues.reduce((seed, value) => {
    if(value.indexOf(optionalValues) !== -1) {
      seed[value] = null;
    }
    return seed;
  }, {});
  return Account.findOne(acc)
  // gets the associated artist
  .then(account => account.getArtist())
  // updates that artist
  .then(artist => artist.update(updateObject));
};



/**
 * Retrieves information from the account table (id, username, password, salt, email).
 * @param {object} account - must have an account by id or username listed in the account table. If both are given will use id.
 * @returns {Promise}
 */
const getAccountInformation = (account) => {
  const acc = makeSearchObject(account);
  if (!acc) return;
  return Account.findOne(acc);
};



/**
 * @param {object} account - must have an account by id or username listed in the account table. If both are given will use id.
 * @returns {Promise} - with an object containing account id, account email, and all other artist table columns.
 */
const getProfileInformation = (account) => {
  const acc = makeSearchObject(account);
  if (!acc) return;
  return Account.findOne(acc)
  .then(account => account.getArtist()
    .then(artist => {
      // builds object to be returned in promis
      const profileObject = {id: account.id, email: account.email, name: artist.name};
      optionalValues.forEach(value => {
        profileObject[value] = artist[value];
      });
      return profileObject;
    }));
};



module.exports = {
  makeAccount,
  updateArtistDetails,
  deleteArtistData,
  getAccountInformation,
  getProfileInformation,
};
