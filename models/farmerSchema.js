const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  id: { type: Number, require: true },
  aadharnumber: { type: String, require: true, unique: true },
  phone: { type: Number, require: true },
  crop: [
    {
      auctionId: { type: Number, require: true },
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  //type:String,
  // googleId: String,
});

module.exports = mongoose.model('Farmer', FarmerSchema);
