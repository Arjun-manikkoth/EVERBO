const express = require("express");
const user_route = express();
const session = require("express-session")
const nocache= require("nocache")
const userController=require("../controllers/userController")

//parse data
user_route.use(express.json())
user_route.use(express.urlencoded({extended:true}))


//static file
user_route.use(express.static("public"));

//setting the view engine
user_route.set("view engine", "ejs")
user_route.set("views","./views/users")

user_route.use(nocache());

user_route.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized:false
}));


//landing page
user_route.get("/", userController.loadLanding)

//login page
user_route.get("/entry", userController.loadLogin)

//user registration data to db
user_route.post("/user_registration", userController.insertUser)

//user login check
user_route.post("/user_login",userController.verifyLogin)

//individual product page
user_route.get("/product", userController.loadProduct);

//user shop page
user_route.get("/shop", userController.loadShop);

//user singup otp verification
user_route.post("/otp_verification", userController.otpVerifySignUp);

//forgot password page
user_route.get("/forgot_password", userController.forgotLoad);

//forgot password post
user_route.post("/forgot_password", userController.forgotVerify);

//reset password page
user_route.get("/reset_password", userController.loadReset);

//reset password post
user_route.post("/reset_password", userController.passwordReset);


module.exports = user_route;
