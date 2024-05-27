const Order = require("../models/orderModel")
const User = require("../models/userModel")
const Product = require("../models/productModel")


//--------------------------------Admin Side - Order Management-------------------------------------------


//view orders page
const orderLoad = async (req, res) => {
  try {
    let page = 1
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 10;
    let count = await Order.find({}).countDocuments()
    let totalPages=Math.ceil(count/limit)
    const orderData = await Order.find({grandTotalCost:{$exists:true,$ne:null}}).limit(limit).skip((page-1)*limit).sort({createdAt:-1}).populate("addressChosen").populate("userId").populate("cartData.productId")
    if (orderData) {
      res.render("orders", { orderData,totalPages,currentPage:page})
    }
    else {
      res.render("orders",{msg:"No Recent Orders",totalPages,currentPage:page})
    }
    
  }
  catch (error) {
    console.log(error.message);
  }
}

//view order detail page
const orderDetailLoad = async (req, res) => {
  try {

    const orderData = await Order.findOne({_id:req.query.id}).populate("addressChosen").populate("userId").populate("cartData.productId").populate("referralData.referredUser")
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
    if (req.body.status === "Cancelled") {

      const orderData = await Order.findById({ _id: req.body.id }).populate("referralData.referredUser").populate("userId")

      await User.findByIdAndUpdate({ _id: orderData.userId._id }, {
        $inc: {
          "wallet.walletBalance": orderData.grandTotalCost
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.grandTotalCost,
            transactionType: "Credit",
            orderId: req.body.id
          }
        }
      })

      await User.findByIdAndUpdate({ _id: orderData.referralData.referredUser._id }, {
        $inc: {
          "wallet.walletBalance": -orderData.referralData.referralDiscountAmount
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.referralData.referralDiscountAmount,
            transactionType: "Debit",
          }
        }
      })
      
      await User.findByIdAndUpdate({ _id: orderData.userId._id }, {
        $inc: {
          "wallet.walletBalance": -orderData.referralData.referralDiscountAmount
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.referralData.referralDiscountAmount,
            transactionType: "Debit",
          }
        }
      })


      orderData.cartData.forEach(async(prod) => {
        const productData = await Product.findByIdAndUpdate({ _id: prod.productId }, { $inc: { quantity: prod.productQuantity } },{new:true})

      })
    }
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