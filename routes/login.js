const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Buyer = require('../models/buyerSchema');
const Farmer = require('../models/farmerSchema');
const config = require('config');
const jwt = require('jsonwebtoken');
const url = require('url');

let asd = 0;
router.post('/', async (req, res) => {
  console.log(req.body.aadhar);
  var t = req.body.aadhar;

  Buyer.findOne({ aadhar: t }, function(err, foundBuyers) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (!foundBuyers) {
        console.log('No Buyer Exist.Lets find from Farmers');
        Farmer.findOne({ aadharnumber: t }, function(err, foundFarmers) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            if (!foundFarmers) {
              console.log('No Buyer And Farmer Exist');
              res.render('register');
            } else {
              //  console.log(foundClass.title);
              console.log(foundFarmers);
              asd = foundFarmers;
              const token = jwt.sign(
                foundFarmers.name,
                config.get('jwtPrivateKey')
              );

              res
                .header('x-auth-token', token)
                .header('access-control-expose-headers', 'x-auth-token')
                .send(foundFarmers);
            }
          }
        });
      } else {
        //  console.log(foundClass.title);
        console.log('Buyer======');
        const token = jwt.sign(foundBuyers.name, config.get('jwtPrivateKey'));
        res
          .header('x-auth-token', token)
          .header('access-control-expose-headers', 'x-auth-token')
          .send('hello');
        // res.render('shop');
      }
    }
  });
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/details', (req, res) => {
  console.log(asd);
});
module.exports = router;
