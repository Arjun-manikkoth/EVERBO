const mongoose= require('mongoose')

const couponSchema= new mongoose.Schema({
    couponCode: { type: String, required: true },
    discountPercentage: { type: Number, min: 5, max: 90, required: true},
    startDate: { type: Date, required: true},
    expiryDate: { type: Date, required: true },
    minimumPurchase: { type: Number, required: true },
    maximumDiscount: { type: Number, required: true },
    is_deleted:{type:Number,default:0}
}, { timestamps:true})

const coupon= mongoose.model('coupon', couponSchema )

module.exports= coupon