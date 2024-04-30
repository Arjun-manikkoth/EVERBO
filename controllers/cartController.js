const User = require("../models/userModel");
const Product = require("../models/productModel")
const Address = require("../models/addressModel")
const Order = require("../models/orderModel")
const Coupon = require("../models/couponModel")
const Razorpay = require('razorpay');
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = process.env;
var instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_SECRET })

//cart Load
const cartLoad = async (req, res) => {
  try {
    const cartData = await User.findOne({ _id: req.session.user_Id }).populate("cart.productId").populate("cart.productId.category")
    req.session.cartCount=cartData.cart.length
    const session=req.session
    if (cartData.cart == "") {
      res.render("cart",{session})
    } else {
      res.render("cart",{cartData,session})   
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

    if (Existing) { 
      res.redirect("/cart")
    } else { 
     
       const data = await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
          $push: {
           cart: 
             {
               productId: req.query.prodId,
               productQuantity:1,
               pricePerProduct:product.price,
               totalPrice: product.price
             }      
         }
       }, { new: true })
      req.session.cartCount = data.cart.length
      const session=req.session
      if (data) {
        res.redirect("/cart")
      }
        else {
          res.render("cart", {cartData,msg:"Couldn't add item",session})
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
      const data = await User.findOne({ _id: req.session.user_Id, "cart.productId": req.params.id }).populate("cart.productId")
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
    
    const cartData = await User.findByIdAndUpdate({ _id: req.session.user_Id, "cart.productId": req.params.prodId },
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

// //checkout Load
const checkStock = async (req, res) => {
  try {
    console.log("this route is called")
    const cartData = await User.findOne({ _id: req.session.user_Id}).populate("cart.productId")
    const data =cartData.cart.map((item) => {
      if (item.productId.quantity < item.productQuantity) {
        return false;
      }
      else if (item.productId.is_listed === false) {
        return "unlisted";
      }
      else {
        return true;
      }
    })
    res.json(data)
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
      res.render("check_out", { userData,addressData ,session:req.session})
    } else {
      res.render("check_out",{session:req.session})   
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
      res.render("edit_checkout", { addressData,session:req.session })
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
      res.render("edit_checkout", { msg: "Address already exists", addressData,session:req.session })
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
    if (req.body.ordersId) {
      req.session.orderId=req.body.ordersId
      const data = await Order.findOne({ _id: req.body.ordersId, userId: req.session.user_Id })
      if (req.body.payment === "RazorPay") {
        var options = {
          amount: req.body.total*100,  
          currency: "INR",
          receipt: data._id
        };
        instance.orders.create(options, function(err, order) {
          if(!err) 
          res.json(order) 
        else
          res.send(err);
        });
      }
    }
    else {
      const userData = await User.findOne({ _id: req.session.user_Id }).populate("cart.productId")

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
          paymentType:req.body.payment,
          cartData: cartArray,
          orderDate:Date.now(),
          grandTotalCost: req.body.total, 
        }
      }, { new: true })
      userData.cart.map((item) => {
        item.productId.quantity -= item.productQuantity
        item.productId.save()
      })
  
      const newData = await User.findByIdAndUpdate({ _id: req.session.user_Id }, { $set: { cart: [] } }, { new: true })
      req.session.cartCount = newData.cart.length
  
      if (req.body.payment === "COD") {
        await Order.findByIdAndUpdate({ _id: req.session.orderId }, {
          $set: {
            paymentStatus: "Complete"
          }
        })
          res.json({payment:"COD"})
      }
      else if(req.body.payment === "Wallet") {
          await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
          $inc: {
            "wallet.walletBalance": -data.grandTotalCost
          }, $push: {
            "wallet.walletTransaction": {
              transactionDate: Date(),
              transactionAmount: data.grandTotalCost,
              transactionType: "Debit",
              orderId:data._id
            }
          }
          })
          await Order.findByIdAndUpdate({ _id: req.session.orderId }, {
            $set: {
              paymentStatus: "Complete"
            }
          })
        res.json({payment:"Wallet"})
      }
      else if(req.body.payment === "RazorPay") {
        var options = {
          amount: req.body.total*100,  
          currency: "INR",
          receipt: data._id
        };
        instance.orders.create(options, function(err, order) {
          if(!err) 
          res.json(order) 
        else
          res.send(err);
        });
      }
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//razorpay payment status update
const razorPayStatus = async (req,res) => {
  try { 
    if (req.body.status === "Complete"){
      await Order.findByIdAndUpdate({ _id: req.session.orderId }, {
        $set: {
          paymentStatus: "Complete"
        }
      })
      res.json({ Status: "success" })
    }
    else {
      await Order.findByIdAndUpdate({ _id: req.session.orderId }, {
        $set: {
          paymentStatus: "Failed"
        }
      })
      res.json({ Status: "failure" })
    }
  }
  catch (error) {
    console.log(error.message);
  }

}

//order success page
const orderPlaced = async (req, res) => {
  try {
    req.session.orderId = ''
    res.render("order_confirm", { session: req.session })
  }
  catch (error) {
    console.log(error.message)
  }
}


//payment option cod check
const checkCod = async (req, res) => {
  try {
    const data = await User.findById({ _id: req.session.user_Id })
    res.json(data.cart)
  }
  catch (error) {
    console.log(error.message)
  }
}

//payment option wallet check
const checkWallet = async (req, res) => {
  try {
    const data = await User.findById({ _id: req.session.user_Id })
    res.json(data)
  }
  catch (error) {
    console.log(error.message)
  }
}

//coupon Check
const couponCheck = async (req, res) => {
  try {
    const data = await Coupon.findOne({ couponCode:{$regex: new RegExp("^"+req.body.coupon+"$","i") },is_deleted:0})
    if (data) {
      res.json({
        Status: "Valid"})
    }
    else {
      res.json({Status:"Invalid"})
    }
  }
  catch (error) {
    console.log(error.message)
  }
}


module.exports = {
  cartLoad,
  addToCart,
  decQuantity,
  incQuantity,
  removeCart,
  checkStock,
  loadCheckOut,
  saveAddressCheckout,
  loadEditCheckout,
  updateAddress,
  chooseCheckoutAddress,
  confirmOrder,
  checkCod,
  checkWallet,
  razorPayStatus,
  orderPlaced,
  couponCheck
}