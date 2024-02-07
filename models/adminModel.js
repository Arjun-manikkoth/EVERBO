const mongoose = require("mongoose");

const adminSchema=mongoose.Schema({
  
  email: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("admin", adminSchema);