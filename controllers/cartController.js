const User = require("../models/userModel");
const Product = require("../models/productModel")
//cart count

//cart load
const addToCart = async (req, res) => {
  try {
    const Existing = await User.findOne({ _id: req.session.user_Id, "cart.productId": req.query.prodId }) 
    const product = await Product.findOne({ _id: req.query.prodId })
    const cartData = await User.findOne({ _id: req.session.user_Id }).populate("cart.productId")
    if (Existing) { 
      if (product.quantity > Existing.cart[0].productQuantity) {

        const updatedQuantity = Existing.cart[0].productQuantity+1;
        const totalPrice = updatedQuantity * product.price;
  
        await User.updateOne({ _id: req.session.user_Id,"cart.productId": req.query.prodId}, {
          $set: {
               "cart.$.productQuantity": updatedQuantity,
               "cart.$.pricePerProduct":product.price,
               "cart.$.totalPrice": totalPrice    
          }   
        })

      }
      res.redirect("/cart")
    } else {
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
     
        res.redirect("/cart")
      }
        else {
          res.render("cart", {cartData,msg:"Couldn't add item"})
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

//cart product delete
const removeCart = async (req, res) => {
  try {
    const cartData = await User.updateOne({ _id: req.session.user_Id, "cart.productId": req.params.prodId },
      { $pull: { cart: { productId: req.params.prodId } } })
    if (cartData != "") {
      res.redirect("/cart")
    }
    else {
      console.log("Couldnt remove product")
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  addToCart,
  cartLoad,
  removeCart
}