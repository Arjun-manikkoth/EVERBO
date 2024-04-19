const dotenv = require("dotenv").config()
//database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Database connected successfully")
  }).catch((err) => {
    console.log("Cannot connect the database")
  })


module.exports = mongoose;