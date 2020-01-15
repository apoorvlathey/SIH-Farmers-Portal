const BuyerSchema= new mongoose.Schema ({
    email : {type:String,require:true,unique:true},
    password: {type:String,require:true},
    adharnumber: {type:String,require:true,unique:true},
  
  //  type:String,
    // googleId: String,
  
  
  });
  
  module.exports = BuyerSchema;