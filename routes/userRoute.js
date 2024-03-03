const express = require("express");
const user_route = express();
const session=require("express-session")
const userController = require("../controllers/userController")
const auth=require("../middlewares/userAuth")

//setting the path for the view engine
user_route.set("views","./views/users")

//user session
user_route.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized:false
}));



//landing page
user_route.get("/",auth.isLogout, userController.loadLanding)

//login page
user_route.get("/entry", auth.isLogout, userController.loadLogin)

//user registration data to db
user_route.post("/user_registration", userController.insertUser)

//user login check
user_route.post("/user_login",userController.verifyLogin)

//individual product page
user_route.get("/product",auth.isLogin, userController.loadProduct);

//user shop page
user_route.get("/shop", auth.isLogin, userController.loadShop);

//load cart page
user_route.get("/cart", auth.isLogin, userController.cartLoad);

//user shop page
user_route.get("/logout",auth.isLogin, userController.userLogout);

//user signup otp resend
user_route.get("/resend_otp", userController.otpResend);

//user signup otp verification post
user_route.post("/otp_verification", userController.otpVerifySignUp);

//forgot password page
user_route.get("/forgot_password",auth.isLogout, userController.forgotLoad);

//forgot password post
user_route.post("/forgot_password", userController.forgotVerify);

//reset password page
user_route.get("/reset_password",auth.isLogout, userController.loadReset);

//reset password post
user_route.post("/reset_password", userController.passwordReset);


module.exports = user_route;
