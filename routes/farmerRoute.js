const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const farmer = require('../models/farmerSchema');

router.post('/', async (req, res) => {
  const user = farmer.findOne({ name: req.body.name });
  const salt = await bcrypt.gensalt(10);
  const encryptedAadhar = await bcrypt.hash(req.body.aadharnumber, salt);
  const data = { name: req.body.name, aadharnumber: encryptedAadhar };
  const newuser = new farmer(data);
  await newuser.save();
  const token = jwt.sign({ id: newuser._id }, config.get('jwtPrivateKey'));
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(user);
});

module.exports = router;
