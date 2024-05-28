const express = require("express");
const app = express();
const logger = require("morgan")
const nocache = require("nocache")
const db = require("./database/db");


//parse data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//morgan middleware
//app.use(logger("dev"))

//static file path
app.use(express.static("public"));

//setting the view engine
app.set("view engine", "ejs")

//prevent caching
app.use(nocache());


//for all admin routes
const adminRoute = require("./routes/adminRoute")
app.use("/admin", adminRoute);

//for all user routes
const userRoute = require("./routes/userRoute")
app.use("/", userRoute);


//creating server
const PORT = process.env.PORT||3000;
app.listen(PORT, (error) => { 
   
  if (!error) {
    console.log("server running");
  }
  else {
    console.log("Error occured,The server can't start",error)
  }

})