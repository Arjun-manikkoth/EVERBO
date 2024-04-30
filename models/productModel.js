const { strict } = require("assert");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const productSchema=mongoose.Schema({
  
  name: {
    type: String
  },
  category: {
    type: mongoose.Types.ObjectId,ref: "category"
  },
  description: {
    type: String
  },
  subImages: [{
    type: String

  }],
  discount: {
    type: Number
  },
  quantity: {
    type: Number,
    default:0
  },
  price: {
    type: Number
  },
  is_deleted: {
    type: Number,
    default:0
  },
  image: {
    type: String
  },
  is_listed: {
    type:Boolean , default:true
  }
},{timestamps:true,strictPopulate:false});

module.exports = mongoose.model("product", productSchema);