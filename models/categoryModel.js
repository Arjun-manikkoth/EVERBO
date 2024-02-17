const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  
  name: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  is_deleted: {
    type: Number,
    default:0
  }
  
}, {timestamps:true});

module.exports = mongoose.model("category", categorySchema);