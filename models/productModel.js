const mongoose = require("mongoose");
const { stringify } = require("querystring");

const productSchema=mongoose.Schema({
  
  name: {
    type: String
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category"
  },
  description: {
    type: String
  },
  subImages: [{
    type: String

  }],
  quantity: {
    type: Number
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
},{timestamps:true});

module.exports = mongoose.model("product", productSchema);