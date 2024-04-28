const Product = require("../models/productModel")
const User = require("../models/userModel")

const loadWishlist = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.session.user_Id }).populate("wishlist.productId")
    req.session.wishlistCount = data.wishlist.length
    if (data.wishlist.length != 0) {
      
      res.render("wishlist",{data,session:req.session})
    }
    else {
      res.render("wishlist",{session:req.session})
      }
  }
  catch (error) {
    console.log(error.message)
  }
}

//add to wishlist
const wishlistAdd = async (req, res) => {
  try {
    const Existing = await User.findOne({ _id: req.session.user_Id, "wishlist.productId": req.query.prodId })
    const product = await Product.findOne({ _id: req.query.prodId })
    const wishlistData = await User.findOne({ _id: req.session.user_Id }).populate("wishlist.productId")

    if (Existing) { 
      res.redirect("/wishlist")
    } else { 
     
       const data = await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
          $push: {
           wishlist: 
             {
               productId: req.query.prodId
             }      
         }
      })
      if (data) {
        res.redirect("/wishlist")
      }
        else {
          res.render("wishlist", {cartData,msg:"Couldn't add item",session:req.session})
        }
      }   
  }
  catch (error) {
    console.log(error.message)
  }
}


//wishlist product delete
const removeWishlist = async (req, res) => {
  try {
    
    const data = await User.findByIdAndUpdate({ _id: req.session.user_Id, "wishlist.productId": req.params.prodId },
      { $pull: { wishlist: { productId: req.params.prodId } } })
    if (data) {
      res.redirect("/wishlist")
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
  loadWishlist,
  wishlistAdd,
  removeWishlist
}
