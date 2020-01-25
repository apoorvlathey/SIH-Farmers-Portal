const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  count: {type: Number}
});

module.exports = mongoose.model('Auction', AuctionSchema);
