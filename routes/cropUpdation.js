const cropSchema = require('../models/cropSchema');
const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
  console.log('dlskfjlkdsaf');
  const present = await cropSchema.findOne({ name: req.params.id });
  res.json(present);
});

router.post('/register', async (req, res) => {
  const data = {
    name: req.body.name,
    aadharNumber: req.body.aadharNNumber,
    contact: req.body.contact,
  };
  const cropName = await cropSchema.findOne({ name: req.body.cropName });
  cropName.farmerList = [...cropName.farmerList, data];
  await cropName.save();
  res.send('success');
});

router.post('/addCrop', async (req, res) => {
  const data = req.body.name;
  const newCrop = new cropSchema({ name: data });
  await newCrop.save();
  res.send('success');
});
module.exports = router;
