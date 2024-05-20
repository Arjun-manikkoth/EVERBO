const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
  
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile_no: {
    type: String
  },
  password: {
    type: String
  },
  is_verified: {
    type:Number,
    default: 0
  },
  is_blocked: {
    type: Number,
    default:0
  },
  referral: {
    referral_code: { type: String },
    applied:[{type:String}]
  },
  otp_verify: {
    verified: { type:Boolean,default:false },
    otp: {type:String},
    createdAt: {type:Date},
    expiresAt: {type:Date}
  },
  address:
    [
      { type: mongoose.Types.ObjectId, ref: "address" }
    ],
  cart:
    [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "product" },
        productQuantity: { type: Number,min:1},
        totalProductDiscount: {type: Number},
        pricePerProduct: { type: Number },
        totalPrice: {type:Number}
      }
    ],
  wishlist: [
    {
      productId: {
        type: mongoose.Types.ObjectId,ref:"product"
      }
    }
  ],
  wallet:{
      walletBalance: { type: Number, default: 0 },
        walletTransaction: [{
        orderId:{type:mongoose.Types.ObjectId,ref:"order"},
        transactionDate: Date,
        transactionAmount: Number,
        transactionType: String
      }]
    }
}, {timestamps:true,strictPopulate:false});

module.exports = mongoose.model("user", userSchema);