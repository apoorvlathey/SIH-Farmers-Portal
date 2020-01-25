const router = require('express').Router();
const axios = require('axios')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', async (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body == 'hello') {
    twiml.message('Hi!');
  } else if (req.body.Body == 'bye') {
    twiml.message('Goodbye');
  } else {
    twiml.message(
      'No Body param match, Twilio sends this in the request to your server.'
    );
  }
  console.log(req.body);

  var msg = req.body.Body
  var trimmed = msg.replace(/^\s+|\s+$/g, '');
  trimmed = msg.split(" ")

  cropname = trimmed[1]
  qty = trimmed[2]
  price = trimmed[3]

  try {
    await axios.post('/update', {
      cropname: cropname,
      quantity: parseInt(qty),
      price: parseInt(price)
    })
  } catch (e){
    console.log
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = router;
