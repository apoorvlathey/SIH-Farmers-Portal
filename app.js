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
  password: {type:String,require:true},
  adharnumber: {type:String,require:true,unique:true},

//  type:String,
  // googleId: String,


});


const Buyer=mongoose.model("Buyer", BuyerSchema);


const FarmerSchema= new mongoose.Schema ({
 name : {type:String,require:true},
  adharnumber: {type:String,require:true,unique:true},
  crop:[{
    name: String,
    quantity:String,
    price: String,

  }],
  //type:String,
  // googleId: String,


});


const Farmer=mongoose.model("Farmer", FarmerSchema);

const CropSchema= new mongoose.Schema ({
  email : {type:String,require:true,unique:true},
  password: {type:String,require:true},
//  type:String,
  // googleId: String,


});

app.get("/",function(req,res){
  res.render("index");
});

app.get("/about",function(req,res){
  res.render("about");
});
app.get("/shop",function(req,res){
  res.render("shop");
});

app.get("/wishlist",function(req,res){
  res.render("wishlist");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/blog",function(req,res){
  res.render("blog");
});

app.get("/buyerregister",function(req,res){
  res.render("buyerregister");
});

app.get("/farmerregister",function(req,res){
  res.render("farmerregister");
});

app.get("/login", function(req,res){
  res.render("login");
});




app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/product-single",function(req,res){
  res.render("product-single");
});


app.get("/cart",function(req,res){
  res.render("cart");
});


app.get("/checkout",function(req,res){
  res.render("checkout");
});

app.get("/register",function(req,res){
  res.render("register");
})

app.post("/buyerregister",function(req,res){
  var u=req.body.email;
  const buy=new Buyer({

    email: req.body.email,
    password:req.body.password,
      adharnumber:req.body.aadhar,
  });
  Buyer.findOne({email: u},function(err, foundBuyers){
if(!err){
      if(!foundBuyers)
      {
        buy.save(function(err){
          if(err)
        //  console.log("error in saving");
          console.log(err);
          else {
            //console.log(user);
          //  console.log(pass);
            console.log("Inserted successfuly to buyer database");
       res.redirect("/");
          }
        });
      }
    }
  });
});


  app.post("/farmerregister",function(req,res){
    var u=req.body.aadhar;
    const farm=new Farmer({

      name: req.body.name,
      adharnumber:req.body.aadhar,
    });
    Farmer.findOne({adharnumber: u},function(err, foundFarmers){
  if(!err){
        if(!foundFarmers)
        {
          farm.save(function(err){
            if(err)
          //  console.log("error in saving");
            console.log(err);
            else {
              //console.log(user);
            //  console.log(pass);
              console.log("Inserted successfuly to seller database");
              res.redirect("/");
            }
          });
        }
      }
    });
  });

app.post("/register",function(req,res){
  var t=req.body.type;
  console.log(t);
  if(t=="farmer")
  res.redirect("/farmerregister");
  else {
    res.redirect("/buyerregister");
  }
});



app.post("/login",function(req,res){
var t=req.body.aadhar;
Buyer.findOne({aadhar: t},function(err, foundBuyers){
    if(err)
    {
    console.log(err);
    res.send(err);
  }
    else {
      if(!foundClass)
      console.log("No Class Exist");
      else {
      //  console.log(foundClass.title);
      //console.log(uri.email);
         res.render("details", {"classfd": foundClass, info:uri});
      }

    }
  })
})








app.listen(3000,function()
{
  console.log("Server is running on Port 3000");
});
