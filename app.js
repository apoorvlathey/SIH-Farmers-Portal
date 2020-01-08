const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine' , 'ejs');


mongoose.connect('mongodb://localhost:27017/sihDB', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } );



const BuyerSchema= new mongoose.Schema ({
  email : {type:String,require:true,unique:true},
  password: {type:String,require:true,unique:true},
  type:String,
  // googleId: String,


});


const Buyer=mongoose.model("Buyer", BuyerSchema);


const FarmerSchema= new mongoose.Schema ({
  name : {type:String,require:true,unique:true},
  adharnumber: {type:String,require:true,unique:true},
  //type:String,
  // googleId: String,


});


const Farmer=mongoose.model("Farmer", FarmerSchema);

app.get("/",function(req,res){
  res.render("register");
});














app.listen(3000,function()
{
  console.log("Server is running on Port 3000");
});
