const { Account, Artist, Listing } = require('./config.js');



/**
 * makes an object with certain variables, ignoring ones that are undefined.
 * @param {object} object - the object who's props are being taken.
 * @param {Array} propsToTake - a list of properties to add to the object.
 * @returns {Object}
 */
const makeObject = (object, propsToTake) => {
  let returnObject = {}
  for(let key in object) {
    if (propsToTake.indexOf(key) !== -1 && !!object[key]) {
      returnObject[key] = object[key];
    }
  }
  return returnObject;
}

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
  const artistObj = makeObject(accDetails, ['name', 'solo', 'city', 'state', 'genre', 'birthdate', 'image_url', 'url_image', 'bio', 
    'url_bandcamp', 'url_facebook', 'url_spotify', 'url_homepage', 'contact_email', 'contact_num', 'contact_facebook'])
  // makes account
  return Account.create({ username, password, salt, email })
  // makes artist
  .then(account => Artist.create(artistObj)
    // associates the new artist and account
    .then(artist => artist.setAccount(account.id))
  )
};



/**
 * updates an account by id or username. If both are given will use id. Only adds or changes information. Does not remove it.
 * @param {object} account - must have an account by id or username. 
 * @param {object} update - properties to change. All are optional
 */
const updateAccount = (account, update) => {
  
};



module.exports = {
  makeAccount,
};
