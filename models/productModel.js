const mongoose = require("mongoose");

const productSchema=mongoose.Schema({
  
  name: {
    type: String
  },
  category: {
    type: String
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
  }
},{timestamps:true});

module.exports = mongoose.model("product", productSchema);