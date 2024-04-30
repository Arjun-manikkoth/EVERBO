const Order = require("../models/orderModel")
const User = require("../models/userModel")

//--------------------------------Admin Side - Order Management-------------------------------------------


//view orders page
const orderLoad = async (req, res) => {
  try {
    let page = 1
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 5;
    let count = await Order.find({}).countDocuments()
    let totalPages=Math.ceil(count/limit)
    const orderData = await Order.find({grandTotalCost:{$exists:true}}).limit(limit).skip((page-1)*limit).sort({createdAt:-1}).populate("addressChosen").populate("userId").populate("cartData.productId")
    if (orderData) {
      res.render("orders", { orderData,totalPages,currentPage:page})
    }
    else {
      res.render("orders",{msg:"No Recent Orders"})
    }
    
  }
  catch (error) {
    console.log(error.message);
  }
}

//view order detail page
const orderDetailLoad = async (req, res) => {
  try {

    const orderData = await Order.findOne({_id:req.query.id}).populate("addressChosen").populate("userId").populate("cartData.productId")
    if (orderData) {
      res.render("order_detail", { orderData })
    } 
  }
  catch (error) {
    console.log(error.message);
  }
}

//update order detail page
const updateOrder = async (req, res) => {
  try {
    const orderData = await Order.findById({ _id: req.body.id })
     await User.findByIdAndUpdate({ _id: orderData.userId }, {
      $inc: {
    "wallet.walletBalance": orderData.grandTotalCost
      }, $push: {
        "wallet.walletTransaction": {
          transactionDate: Date(),
          transactionAmount: orderData.grandTotalCost,
          transactionType: "Credit",
          orderId:req.body.id
        }
      }
    })
    const data = await Order.findByIdAndUpdate({ _id: req.body.id }, { $set: { orderStatus: req.body.status } })

    res.json(data)
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  orderLoad,
  orderDetailLoad,
  updateOrder
}