const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const auth = require('./services/auth');
const farmerRoute = require('./routes/farmerRoute');
const request = require('request');
const app = express();
const buyerSchema = require('./models/buyerSchema');
const FarmerSchema = require('./models/farmerSchema');
const buyerRoute = require('./routes/buyersRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/sihDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const Buyer = mongoose.model('Buyer', BuyerSchema);
const Farmer = mongoose.model('Farmer', FarmerSchema);

const CropSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  //  type:String,
  // googleId: String,
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/:id', (req, res) => {
  res.render(req.params.id);
});

app.use('/buyerregister', buyerRoute);

app.use('/farmerregister', farmerRoute);

app.post('/register', function(req, res) {
  var t = req.body.type;
  console.log(t);
  if (t == 'farmer') res.redirect('/farmerregister');
  else {
    res.redirect('/buyerregister');
  }
});

app.post('/login', auth, function(req, res) {
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
