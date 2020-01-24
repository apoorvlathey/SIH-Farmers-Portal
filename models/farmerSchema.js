const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  aadharnumber: { type: String, require: true, unique: true },
  crop: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  //type:String,
  // googleId: String,
});

module.exports = mongoose.model('Farmer', FarmerSchema);