const express = require('express');
const router = express.Router();
const farmer = require('../models/farmerSchema');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
  const user = farmer.findOne({ name: req.body.name });
  const data = { name: req.body.name, aadharnumber: req.body.aadhar };
  const newuser = new farmer(data);
  await newuser.save();
  console.log(newuser);
  const token = jwt.sign({ id: newuser._id }, config.get('jwtPrivateKey'));
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(newuser);
});

module.exports = router;
