const express = require("express");
const user_route = express();
const userController=require("../controllers/userController")

//parse data
user_route.use(express.json())
user_route.use(express.urlencoded({extended:true}))


//static file
user_route.use(express.static("public"));

//setting the view engine
user_route.set("view engine", "ejs")
user_route.set("views","./views/users")


//landing page 


//loading page
user_route.get("/", userController.loadLanding)

//login page
user_route.get("/entry", userController.loadLogin)

//user registration 
user_route.post("/user_registration", userController.insertUser)

//user login
user_route.post("/user_login",userController.verifyLogin)


module.exports = user_route;
