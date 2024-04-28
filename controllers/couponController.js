const Coupon = require("../models/couponModel")
const moment = require("moment")

//----------------------------------------------Admin Side Coupon management -------------------------------------------

//coupon page load
const couponLoad = async (req, res) => {
  try {
    let page = 1
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 15;
    let count = await Coupon.find({is_deleted:0}).countDocuments()
    let totalPages=Math.ceil(count/limit)
    const data = await Coupon.find({ is_deleted: 0 }).skip((page - 1) * limit).limit(limit).sort({ expiryDate: -1 })
    if (data.length!=0) {
      res.render("coupon", { data,totalPages,currentPage:page })
    }
    else {
      res.render("coupon",{msg:"No Coupons are added yet"})
    }
  }
  catch(error) {
    console.log(error.message)
  }
}

//add coupon page load
const addCouponLoad = async (req, res) => {
  try {
    res.render("add_coupon")
  }
  catch(error) {
    console.log(error.message)
  }
}

//add coupon to db
const addCoupon = async (req, res) => {
  try {
   const coupon=req.body.couponCode.toString()
    const exists = await Coupon.findOne({ name: { $regex: new RegExp("^"+coupon+"$","i") } });

    if (exists) {
      res.render("add_coupon", { message: "Coupon already added" })
    }
    else { 

      const coupon = new Coupon({
        couponCode: req.body.couponCode,
        discountPercentage: req.body.discountPercentage,
        startDate: moment(req.body.startingDate,'YYYY-MM-DD').format('ddd MMM DD YYYY'),
        expiryDate: moment(req.body.expiryDate,'YYYY-MM-DD').format('ddd MMM DD YYYY'),
        minimumPurchase: req.body.minPurchase,
        maximumDiscount: req.body.maxDiscount
      })
      const couponData = await coupon.save();
      if (couponData) {
        res.redirect("/admin/coupons")
      }
      else { 
        res.render("add_coupons",{message:"Failed to add coupon"})
      }
    }
  }
  catch (error) {

    console.log(error.message)
   }
}
  
//delete coupon
const deleteCoupon = async (req, res) => {
  try {
    const data = await Coupon.findByIdAndUpdate({ _id: req.query.id }, { $set: { is_deleted: 1 } }, { new: true })
    if (data) {
    res.redirect("/admin/coupons")
    }
  }
  catch (error) {
    console.log(error.message)
  }
}



module.exports = {
  couponLoad,
  addCouponLoad,
  addCoupon,
  deleteCoupon
}