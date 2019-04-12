const bcrypt = require('bcryptjs');
const { Account, Artist, Listing } = require('./config.js');


// start of profile and account Middleware
const optionalArtistValues = ['state', 'genre', 'birthday', 'image_url', 'bio', 'bandcamp_url', 'facebook_url', 
  'spotify_url', 'homepage_url', 'contact_num', 'contact_facebook'];

const allArtistValues = ['name', 'solo', 'city', 'state', 'genre', 'birthday', 'image_url', 'bio', 'bandcamp_url', 
  'facebook_url', 'spotify_url', 'homepage_url', 'contact_email', 'contact_num', 'contact_facebook'];

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
    if(object[key] !== null && object[key] !== undefined || allowNull) {
      if (propsToTake.indexOf(key) !== -1) {
        returnObject[key] = object[key];
      }
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
  if(!username && !id) {
    console.error("please give id or username property in the account argument");
    return;
  }
  if(!username) {
    acc.id = id;
  } else if (!id) {
    acc.username = username;
  } else {
    acc.id = id;
  }
  return acc;
};



/**
 * creates an account and an associated band or musician. I haven't worked out the kinks for returning an error yet, so for now,
 * it just console.errors an error message.
 * @param {object} accDetails - requires the properties of username, password, salt, solo, and email are all required.
 * @returns {Promise} 
 */
const makeAccount = (accDetails) => {
  let {username, password, salt, email} = accDetails;
  if(!username || !password || !email) {
    console.error(`Attempted to make an account without required fields. Current fields: username: ${username}, password: ${password},
      , email: ${email}`);
    return;
  }
  salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  return Account.create({ username, password, salt, email });
};



/**
 * makes an artist object in association with a account object
 * @param {Object} account - takes an id or username value. Can optionally take a number as the account id.
 * @param {Object} artist - requires name, city, solo, contact_email.
 * @returns {Promise} sequalize promise
 */
const makeArtist = (account, artist) => {
  // checks for valid and required information
  const { name, city, solo, contact_email} = artist;
  if(!name || !city || solo === undefined || !contact_email ) {
    console.error(`Attempted to make an account without required fields. Current fields: name: ${name}, city: ${city}, solo: 
      ${solo}, contact_email: ${contact_email}`);
  }
  const filteredArtistObject = makeObject(artist, allArtistValues);
  let acc
  if (typeof account === "number") {
    acc = {id: account}
  } else {
    acc = makeSearchObject(account);
    if(!acc) {
      console.error(`need account information in make Artist function. Artist object attempted: ${artist}, Account attempted:
        ${account}`);
      return;
    }
  }
  // finds related account
  return Account.findOne({where: acc})
    // makes an artist row
    .then(account => Artist.create(filteredArtistObject)
      // associates the artist and account
      .then(artist => account.setArtist(artist.id))
    );
};




/**
 * Updates an artist by account_id. If both are given will use id. Only adds or changes information. Does not remove it.
 * Does not allow for updating name or solo. 
 * @param {Number} id - must have an artist by account_id.
 * @param {object} update - properties to change. All are optional: name, solo, city, state, genre, birthday, image_url, bio, 
 * bandcamp_url, facebook_url, spotify_url, homepage_url, contact_email, contact_num, contact_facebook.
 */
const updateArtistDetails = (id, update) => {
  const updateObject = makeObject(update, allArtistValues);
  return Account.findOne({where: {id}})
  // gets the associated artist
  .then(account => account.getArtist())
  // updates that artist
  .then(artist => artist.update(updateObject));
};



/**
 * deletes values from the database.
 * @param {Number} id - must have an artist by account_id.
 * @param {array} removeValues - array of values as strings to delete. Includes: state, genre, birthday, image_url, bio, 
 * bandcamp_url, facebook_url, spotify_url, homepage_url, contact_num, contact_facebook.
 */
const deleteArtistData = (id, removeValues) => {
  if(!Array.isArray(removeValues)){
    removeValues = [removeValues];
  };
  // makes an object to delete
  const updateObject = removeValues.reduce((seed, value) => {
    if(optionalArtistValues.indexOf(value) !== -1) {
      seed[value] = null;
    }
    return seed;
  }, {});
  return Account.findOne({where: {id}})
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
 * gets Artist by filter. Will ignore all non-exsitant table columns  
 * @param {object} account - valid properties: name, solo, city, state, genre, birthday, image_url, bio, 
 * bandcamp_url, facebook_url, spotify_url, homepage_url, contact_email, contact_num, contact_facebook.
 * @returns {Promise} promise with array of sequelize objects.
 */
const getArtist = (filter) => {
  if(!filter) {
    return Artist.findAll();
  }
  // gets data by all matching profile property searches.
  const newFilter = makeObject(filter, allArtistValues);
  return Artist.findAll({where: newFilter});
};



// start of listing Middleware

const listingValues = ['title', 'date', 'description', 'venue', 'type', 'image_url'];

/**
 * Makes a new listing.
 * @param {Object} id - account id.
 * @param {object} newListing - must have title, date, description, and venue.
 * @returns {object} - sequelize promise with the artist of the listing.
 */
const makeListing = (id, newListing) => {
  const {title, date, description, venue} = newListing;
  if (!title || !date || !description || !venue) {
    console.error("Attempted to make a listing without required fields.");
    return;
  }
  const newListingObject = makeObject(newListing, listingValues);
  return Artist.findOne({where: {account_id: id}})
    .then(artist => Listing.create(newListingObject)
      .then(listing => artist.addListing(listing.id))
    );
};



/**
 * 
 * @param {object} filter - fields include title, date, description, venue, type, and image_url. leaving this object empty
 * or undefined returns all listings.
 */
const getListings = (filter) => {
  if(!filter) {
    return Listing.findAll();
  }
  const listingFilters = makeObject(filter, listingValues.concat(['id', 'artist_id']));
  return Listing.findAll({where: listingFilters});
};


/**
 * 
 * a function to get all the artists in the db
 * @returns {Promise}
 */
const getAllArtists = () => {
  return Artist.findAll()
};


/**
 * 
 * @param {number} id - id of the listing being updated.
 * @param {object} update - an object with listing properties to update. 
 * @returns {Promise}
 */
const updateListings = (id, update) => {
  const updateObject = makeObject(update, listingValues);
  return Listing.update(updateObject, {where: {id}});
};



/**
 * removes type and/or image_url from a table row.
 * @param {number} id - id of the listing being effected.
 * @param {array} propsToRemove - contains a string of type and/or image.
 */
const deleteListingProperties = (id, propsToRemove) => {
  const updateObject = {};
  if(propsToRemove.indexOf("type") !== -1) {
    updateObject.type = null;
  }
  if(propsToRemove.indexOf("image_url") !== -1) {
    updateObject.image_url = null;
  }
  return Listing.update(updateObject, {where: {id}});
};



/**
 * @param {number} id - id of listing to be deleted. 
 * @return {Promise} - sequelize promise containing the deleted data.
 */
const deleteListing = (id) => {
  return Listing.findOne({id})
    .then(listing => listing.destroy());
};



/**
 * 
 * @param {NUMBER} id - number
 * @returns array of sequalize objects.
 */
const getListingsByArtistId = (id) => {
  return Artist.findOne({where: {id}})
    .then(artist => artist.getListings());
};



module.exports = {
  makeAccount,
  updateArtistDetails,
  deleteArtistData,
  getAccountInformation,
  getArtist,
  makeListing,
  getListings,
  getAllArtists,
  updateListings,
  deleteListingProperties,
  deleteListing,
  getListingsByArtistId,
  makeArtist,
};
