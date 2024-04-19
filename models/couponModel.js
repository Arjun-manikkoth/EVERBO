const mongoose= require('mongoose')

const couponSchema= new mongoose.Schema({
    couponCode: { type: String, required: true },
    discountPercentage: { type: Number, min: 5, max: 90, required: true},
    startDate: { type: Date, required: true, default: new Date().toLocaleString() },
    expiryDate: { type: Date, required: true },
    minimumPurchase: { type: Number, required: true },
    maximumDiscount: { type: Number, required: true }
})

const coupon= mongoose.model('coupon', couponSchema )

module.exports= coupon