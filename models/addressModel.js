const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  
  user_id: {
    type: mongoose.Types.ObjectId
  },
  house_no: {
    type: String
  },
  street: {
    type: String
  },
  pincode: {
    type: Number
  },
  landmark: {
    type: String
  },
  district: {
    type: String
  },
  state: {
    type: String
  },
  chosen: {
    type: Number,
    default: 0
  },
  is_deleted: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("address", addressSchema);