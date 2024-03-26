const Order = require("../models/orderModel")


//--------------------------------Admin Side - Order Management-------------------------------------------


//view orders page
const orderLoad = async (req, res) => {
  try {

    const orderData = await Order.find({}).populate("addressChosen").populate("userId").populate("cartData.productId")
    console.log(orderData)
    if (orderData) {
      res.render("orders", { orderData })
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
    const data = await Order.findByIdAndUpdate({ _id: req.query.id }, { $set: { orderStatus: req.body.orderStatus } })
    res.redirect("/admin/orders")
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