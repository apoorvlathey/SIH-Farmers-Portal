const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: { type: String, require: true },
  farmerList: [{ name: String, aadharNumber: Number, contactNumber: Number }],
});

const model = mongoose.model('Crop', CropSchema);
module.exports = model;
