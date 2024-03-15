const User = require("../models/userModel");
const Product = require("../models/productModel")

//cart load
const addToCart = async (req, res) => {
  try {
    const Existing = await User.findOne({ _id: req.session.user_Id, "cart.productId": req.query.prodId }) 
    if (Existing != ""&&Existing!=null) { 
      console.log("it exists")
    } else {
      const product=await Product.findOne({_id:req.query.prodId})
      const data=await User.updateOne({ _id: req.session.user_Id }, {
        $push: {
         cart: 
           {
             productId: req.query.prodId,
             productQuantity:1,
             pricePerProduct:product.price,
             totalPrice: product.price
           }      
       }
    })
    if (data != "") { 
      const cartData = await User.findOne({ _id: req.session.user_Id }).populate("cart.productId")
      if (cartData != "") {
        res.render("cart",{cartData})
      }
      else {
        res.render("cart")
      }
    }
    }   
  }
  catch (error) {
    console.log(error.message)
  }
}

//cart Load
const cartLoad = async (req, res) => {
  try {
    const cartData = await User.findOne({ _id: req.session.user_Id }).populate("cart.productId")
    if (cartData.cart == "") {
      res.render("cart")
    } else {
      res.render("cart",{cartData})   
    } 
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports = {
 // cartLoad,
  addToCart,
  cartLoad
}