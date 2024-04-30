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
  discount: {
    type: Number,
    default:0
  },
  is_listed: {
    type: Boolean,
    default: true
  },
  is_deleted: {
    type: Number,
    default:0
  }
  
}, {timestamps:true,strictPopulate:false});

module.exports = mongoose.model("category", categorySchema);