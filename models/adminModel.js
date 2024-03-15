const mongoose = require("mongoose");

const adminSchema=mongoose.Schema({
  
  email:{
    type: String
  },
  password: {
    type: String
  }
},{timestamps:true});

module.exports = mongoose.model("admin", adminSchema);