const express = require("express");
const user_route = express();
const session=require("express-session")
const userController = require("../controllers/userController")
const cartController = require("../controllers/cartController")
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
user_route.post("/user_registration", auth.isLogout,userController.insertUser)

//user login check
user_route.post("/user_login",auth.isLogout,userController.verifyLogin)

//individual product page
user_route.get("/product",auth.isLogin, userController.loadProduct);

//user shop page
user_route.get("/shop", auth.isLogin, userController.loadShop);

//load cart page
user_route.get("/add_to_cart", auth.isLogin, cartController.addToCart);

//load cart page
user_route.get("/cart", auth.isLogin, cartController.cartLoad);

//user shop page
user_route.get("/logout",auth.isLogin, userController.userLogout);

//user signup otp resend
user_route.get("/resend_otp",auth.isLogin, userController.otpResend);

//user signup otp verification post
user_route.post("/otp_verification",auth.isLogin, userController.otpVerifySignUp);

//forgot password page
user_route.get("/forgot_password",auth.isLogout, userController.forgotLoad);

//forgot password post
user_route.post("/forgot_password",auth.isLogout, userController.forgotVerify);

//reset password page
user_route.get("/reset_password",auth.isLogout, userController.loadReset);

//reset password post
user_route.post("/reset_password",auth.isLogout, userController.passwordReset);

//user profile page
user_route.get("/profile", auth.isLogin, userController.loadProfile)

//edit profile to db
user_route.post("/editProfile", auth.isLogin, userController.editProfile)

//address page
user_route.get("/address", auth.isLogin, userController.loadAddress)

//address page
user_route.get("/add_address", auth.isLogin, userController.addAddress)

//delete address page
user_route.get("/delete_address", auth.isLogin, userController.deleteAddress)

//address page
user_route.post("/add_address", auth.isLogin, userController.saveAddress)

//edit address page
user_route.get("/edit_address", auth.isLogin, userController.editAddress)

//edit address page to db
user_route.post("/edit_address", auth.isLogin, userController.updateAddress)

//orders page
user_route.get("/order", auth.isLogin, userController.loadOrders)

//change password page
user_route.get("/change_password", auth.isLogin, userController.loadChangePassword)

//change password to db
user_route.post("/change_password", auth.isLogin, userController.changePassword)



module.exports = user_route;
