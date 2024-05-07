const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  
  image: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: false
  }
  
}, {timestamps:true});

module.exports = mongoose.model("banner", bannerSchema);