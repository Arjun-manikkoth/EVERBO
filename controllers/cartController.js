const User = require("../models/userModel");
const Product = require("../models/productModel")
const Address = require("../models/addressModel")
const Order = require("../models/orderModel")

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

//add to cart
const addToCart = async (req, res) => {
  try {
    const Existing = await User.findOne({ _id: req.session.user_Id, "cart.productId": req.query.prodId })
    const product = await Product.findOne({ _id: req.query.prodId })
    const cartData = await User.findOne({ _id: req.session.user_Id }).populate("cart.productId")
    console.log(cartData)
    if (Existing) { 
      res.redirect("/cart")
    } else {
        const data=await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
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
      if (data) {
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


//decrease product quantity
const decQuantity = async (req, res) => {
  try {
    const cartData = await User.findOne({ _id: req.session.user_Id ,"cart.productId":req.params.id}).populate("cart.productId")
    const cartProduct = cartData.cart.find(item => item.productId._id == req.params.id)
    if (cartProduct.productQuantity >1) {
      const updatedQuantity =cartProduct.productQuantity-1;
      const totalPrice = cartProduct.productId.price * updatedQuantity;

     const cart=await User.updateOne({ _id: req.session.user_Id,"cart.productId": req.params.id}, {
        $set: {
             "cart.$.productQuantity": updatedQuantity,
             "cart.$.pricePerProduct":cartProduct.productId.price,
             "cart.$.totalPrice": totalPrice    
        }   
     })
     const data= await User.findOne({ _id: req.session.user_Id, "cart.productId": req.params.id }).populate("cart.productId")
     const newData = data.cart.find(item => item.productId._id == req.params.id)
      res.json(newData)
    }  
  }
  catch (error) {
    console.log(error.message)
  }
}

//increase product quantity
const incQuantity = async (req, res) => {
  try {
    const cartData = await User.findOne({ _id: req.session.user_Id ,"cart.productId":req.params.id}).populate("cart.productId")
    const cartProduct = cartData.cart.find(item => item.productId._id == req.params.id)

    if (cartProduct.productQuantity < cartProduct.productId.quantity) {
      const updatedQuantity =cartProduct.productQuantity+1;
      const totalPrice = updatedQuantity * cartProduct.productId.price;

     const cart=await User.updateOne({ _id: req.session.user_Id,"cart.productId": req.params.id}, {
        $set: {
             "cart.$.productQuantity": updatedQuantity,
             "cart.$.pricePerProduct":cartProduct.productId.price,
             "cart.$.totalPrice": totalPrice    
        }   
     })
     const data= await User.findOne({ _id: req.session.user_Id, "cart.productId": req.params.id }).populate("cart.productId")
     const newData = data.cart.find(item => item.productId._id == req.params.id)
      res.json(newData)
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

//checkout Load
const loadCheckOut = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.session.user_Id })
    const addressData = await Address.find({ user_id: req.session.user_Id, is_deleted: 0 }).limit(3).sort({ updatedAt: -1 })
    if (userData.address) {
      res.render("check_out", { userData,addressData })
    } else {
      res.render("check_out")   
    } 
  }
  catch (error) {
    console.log(error.message)
  }
}

//save address page
const saveAddressCheckout = async (req, res) => {
  try {
      const address = new Address({
        user_id:req.session.user_Id,
        house_no: req.body.houseNo,
        street: req.body.street,
        pincode: req.body.pincode,
        landmark: req.body.landmark,
        district: req.body.district,
        state:req.body.state
      })
      
    const data = await address.save()
    const userData=await Address.findOne({house_no:req.body.houseNo})
    await User.findOneAndUpdate({ _id: req.session.user_Id }, { $push: { address: userData._id } })    
      res.redirect("/check_out")
  }
  catch (error) { 
    console.log(error.message);
  }
}

//edit address checkout
const loadEditCheckout = async (req, res) => {
  try {
    const addressData = await Address.findOne({ user_id: req.session.user_Id, _id: req.query.id })
    if (addressData) {
      res.render("edit_checkout", { addressData })
    } else {
      res.redirect("/check_out")   
    } 
  }
  catch (error) {
    console.log(error.message)
  }
}

//edit address page to db 
const updateAddress = async (req, res) => {
  try { 
    const exists = await Address.findOne({
      pincode:  req.body.pincode ,
      house_no: { $regex :new RegExp("^" + req.body.houseNo + "$", "i") },
      user_id: req.session.user_Id ,
      _id: { $ne: req.query.id }
    })
    const addressData = await Address.findOne({ user_id: req.session.user_Id, _id:req.query.id})
    if (exists) {
      res.render("edit_checkout", { msg: "Address already exists", addressData })
    } else {
      const data = await Address.findByIdAndUpdate({ _id: req.query.id },
        { $set: { house_no: req.body.houseNo,
                  street: req.body.street,
                  pincode: req.body.pincode,
                  landmark: req.body.landmark,
                  district: req.body.district,
                  state: req.body.state
        }
        }, { new: true })
      
      if (data) { 
        res.redirect("/check_out")
      } 
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//choose checkout address
const chooseCheckoutAddress = async (req, res) => {
  try {
    if (req.session.orderId && req.body.address) {
      const data = await Order.findByIdAndUpdate({ _id: req.session.orderId }, { $set: { addressChosen: req.body.address, userId:req.session.user_Id } })
      res.json(data) 
    }
    else if (!req.session.orderId && req.body.address) {
        const order = new Order({
          addressChosen: req.body.address,
          userId:req.session.user_Id
        })   
      
        const data = await order.save()
        req.session.orderId = data._id 
        res.json(data)
    } 
  }
  catch (error) { 
    console.log(error.message);
  }
}

//confirm order
const confirmOrder = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.session.user_Id, }).populate("cart.productId")

    const cartArray  = userData.cart.map((item) => {
      return {
        productId:item.productId,
        productQuantity:item.productQuantity,
        pricePerProduct:item.pricePerProduct,
        totalPrice:item.totalPrice
      }
     })
    const orderNo= await Order.find({}).countDocuments()
    const data= await Order.findByIdAndUpdate({ _id: req.session.orderId }, {
      $set: {
        orderNumber:orderNo+1,
        paymentType: req.body.payment,
        cartData: cartArray,
        orderDate:Date.now(),
        grandTotalCost: req.body.total, 
      }
    })
    userData.cart.map((item) => {
      item.productId.quantity -= item.productQuantity
      item.productId.save()
    })
    
    await User.updateOne({ _id: req.session.user_Id }, { $set: { cart: [] } })

    req.session.orderId=""

    if (data) {
      res.render("order_confirm")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//confirm order
const cancelOrder = async (req, res) => {
  try {
    const userData = await Order.findByIdAndUpdate({ _id: req.query.id }, { $set: { orderStatus: "Cancelled" } })
    if (userData) {
      res.json(userData)
    }    
  }
  catch (error) { 
    console.log(error.message);
  }
}



module.exports = {
  cartLoad,
  addToCart,
  decQuantity,
  incQuantity,
  removeCart,
  loadCheckOut,
  saveAddressCheckout,
  loadEditCheckout,
  updateAddress,
  chooseCheckoutAddress,
  confirmOrder,
  cancelOrder
}