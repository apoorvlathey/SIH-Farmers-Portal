const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  aadhar:{type: String, require: true, unique: true},
  password: { type: String, require: true },
  name: { type: String, require: true },

  //  type:String,
  // googleId: String,
});

module.exports = mongoose.model('Buyer', BuyerSchema);
