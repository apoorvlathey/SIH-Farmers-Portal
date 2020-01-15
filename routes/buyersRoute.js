const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const buyer = require('../models/buyerSchema');

router.post('/', async (req, res) => {
  const user = buyer.findOne({ name: req.body.name });
  const salt = await bcrypt.gensalt(10);
  const encryptedAadhar = await bcrypt.hash(req.body.aadharnumber, salt);
  const data = { name: req.body.name, aadharnumber: encryptedAadhar };
  const newuser = new buyer(data);
  await newuser.save();
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(user);
});

module.exports = router;
