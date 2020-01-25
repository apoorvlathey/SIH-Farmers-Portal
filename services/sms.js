const twilio = require('twilio');
const config = require('config');

var client = new twilio(
  config.get('TWILIO_ACCOUNT_SID'),
  config.get('TWILIO_AUTH_TOKEN')
);
client.messages
  .create({
    from: '+12019879983',
    to: '+91 85109 46270',
    body: 'create using callback',
  })
  .then(message => console.log(message));
