const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile_no: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  otp_verify: {
    verified: { type:Boolean,default:false },
    otp: {type:String},
    createdAt: {type:Date},
    expiresAt: {type:Date}
  }
});

module.exports = mongoose.model("user", userSchema);