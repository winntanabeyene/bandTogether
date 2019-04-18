require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+14044713243',
     to: '+16785926777'
   })
  .then(message => console.log(message.sid));
//5129057682-arn
//5047109310-pat

