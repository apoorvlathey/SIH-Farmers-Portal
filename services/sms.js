const twilio = require('twilio');
const config = require('config');
const router = require('express').Router();

router.get('/',(req , res)=>{
  var client = new twilio(
  config.get('TWILIO_ACCOUNT_SID'),
  config.get('TWILIO_AUTH_TOKEN')
  );
  client.messages
  .create({
    from: '+12019879983',
    to: '+918510946270',
    body: 'Your OTP: 745201',
  })
  .then(message => console.log(message));

  
})

module.exports = router
