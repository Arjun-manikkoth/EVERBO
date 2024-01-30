//database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/everbo_Ecommerce");

const express = require("express");
const app = express();

//importing userrouter
const userRoute=require("./routes/userRoute")

//for all user routes
app.use("/", userRoute);


//creating server
const PORT = 3000;
app.listen(PORT, () => { 

  console.log("server running at the port http://localhost:3000");

})
//hlo