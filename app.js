const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const auth = require('./services/auth');
const farmerRoute = require('./routes/farmerRoute');
const app = express();
const Buyer = require('./models/buyerSchema');
const Farmer = require('./models/farmerSchema');
const buyerRoute = require('./routes/buyersRoute');
const cropUpdation = require('./routes/cropUpdation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/sihDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.get('/', function(req, res) {
  res.render('index');
});

app.use('/farmerCrop', cropUpdation);

app.use('/buyerregister', buyerRoute);

app.use('/farmerregister', farmerRoute);
app.get('/:id', (req, res) => {
  res.render(req.params.id);
});

app.get('/bidding/:id', (req, res) => {
  res.render('bidding', {
    auctionId: req.params.id
  })
})

app.post('/register', function(req, res) {
  var t = req.body.type;
  console.log(req.body);
  if (t == 'farmer') res.redirect('/farmerregister');
  else {
    res.redirect('/buyerregister');
  }
});

app.post('/login', auth, function(req, res) {
  console.log(req.body);
  var t = req.body.aadhar;
  Buyer.findOne({ aadhar: t }, function(err, foundBuyers) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (!foundClass) console.log('No Class Exist');
      else {
        //  console.log(foundClass.title);
        //console.log(uri.email);
        res.render('details', { classfd: foundClass, info: uri });
      }
    }
  });
});
app.listen(3000, function() {
  console.log('Server is running on Port 3000');
});
