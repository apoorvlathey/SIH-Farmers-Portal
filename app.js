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
var tin=[];

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/shop', function(req, res) {
  res.render('shop');
});

app.get("/update",function(req,res){
  res.render("update",{"tyu":tin});
})

app.use('/farmerCrop', cropUpdation);

app.use('/buyerregister', buyerRoute);
app.use('/farmerregister', farmerRoute);
app.get('/:id', (req, res) => {
  res.render(req.params.id);
});

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
      if(!foundBuyers)
    {
      console.log("No Buyer Exist.Lets find from Farmers");
      Farmer.findOne({adharnumber: t},function(err, foundFarmers){
          if(err)
          {
          console.log(err);
          res.send(err);
        }
          else {
            if(!foundFarmers)
          {
          console.log("No Buyer And Farmer Exist");
          res.render("register");
        }
            else {
            //  console.log(foundClass.title);
          console.log("Seller");
          tin=foundFarmers;
               res.render("details",{"ur":foundFarmers});
            }

          }
        });
      }
      else {
      //  console.log(foundClass.title);
      console.log("Buyer");
         res.render("shop" );
      }

    }
  });
});


app.post("/update",function(req,res){
console.log(req.body.cropname);
console.log(req.body.quantity);
console.log(req.body.price);

Farmer.updateOne({aadharnumber: ur.aadharnumber},{ $push: {crop : {name: req.body.cropname, quantity : req.body.quantity,  price : req.body.price}},function(err){
    if(err){
        console.log("Something wrong when updating data!");
    }
    else{

    console.log("Successfully  updated crop in farmer");

  }
}})


 res.render("details",{"ur":foundFarmers});
});







app.listen(3000, function() {
  console.log('Server is running on Port 3000');
});
