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
        pricePerProduct: {type: Number},
        totalPrice: {type:Number}
      }
    ]
}, {timestamps:true});

module.exports = mongoose.model("user", userSchema);