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
const sms = require('./services/sms');
const login = require('./routes/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

mongoose.connect('mongodb://localhost:27017/sihDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
var tin = [];

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/shop', function(req, res) {
  res.render('shop');
});

app.get('/update', function(req, res) {
  res.render('update', { tyu: tin });
});

app.use('/farmerCrop', cropUpdation);

app.use('/login', login);
app.use('/buyerregister', buyerRoute);
app.use('/farmerregister', farmerRoute);

app.get('/:id/:id2', (req, res) => {
  console.log(req.params.id2);
  if (req.params.id2) {
    const string = req.params.id2.substring(1);
    console.log(string);
    console.log(req.params.id);
    const data = JSON.parse(string);
    console.log(typeof data);
    res.render(req.params.id, { ur: data });
  }
});
app.get('/:id', (req, res) => {
  res.render(req.params.id);
});

app.get('/bidding/:id', (req, res) => {
  res.render('bidding', {
    auctionId: req.params.id,
  });
});

app.post('/register', function(req, res) {
  var t = req.body.type;
  console.log(req.body);
  if (t == 'farmer') res.redirect('/farmerregister');
  else {
    res.redirect('/buyerregister');
  }
});

app.post('/update', function(req, res) {
  console.log(req.body.cropname);
  console.log(req.body.quantity);
  console.log(req.body.price);

  Farmer.updateOne(
    { aadharnumber: ur.aadharnumber },
    {
      $push: {
        crop: {
          name: req.body.cropname,
          quantity: req.body.quantity,
          price: req.body.price,
        },
      },
      function(err) {
        if (err) {
          console.log('Something wrong when updating data!');
        } else {
          console.log('Successfully  updated crop in farmer');
        }
      },
    }
  );

  res.render('details', { ur: foundFarmers });
});

app.listen(3001, function() {
  console.log('Server is running on Port 3001');
});
