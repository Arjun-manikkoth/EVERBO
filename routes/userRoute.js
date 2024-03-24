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

//add address page
user_route.get("/add_address", auth.isLogin, userController.addAddress)

//delete address page
user_route.get("/delete_address", auth.isLogin, userController.deleteAddress)

//save address page
user_route.post("/add_address", auth.isLogin, userController.saveAddress)

//edit address page
user_route.get("/edit_address", auth.isLogin, userController.editAddress)

//edit address page to db
user_route.post("/edit_address", auth.isLogin, userController.updateAddress)

//orders page
user_route.get("/order", auth.isLogin, userController.loadOrders)

//orders detail page
user_route.get("/order_detail", auth.isLogin, userController.orderDetail)

//orders detail page
user_route.put("/cancel_order", auth.isLogin, cartController.cancelOrder)

//change password page
user_route.get("/change_password", auth.isLogin, userController.confirmPasswordLoad)

//confirm password 
user_route.post("/confirm_password", auth.isLogin, userController.confirmPassword)

//new password page
user_route.get("/new_password", auth.isLogin, userController.newPasswordLoad)

//new password 
user_route.post("/new_password", auth.isLogin, userController.newPassword)

//add to cart page
user_route.get("/add_to_cart", auth.isLogin, cartController.addToCart);

//load cart page
user_route.get("/cart", auth.isLogin, cartController.cartLoad);

//decrease quantity
user_route.put("/dec_qty/:id", auth.isLogin, cartController.decQuantity);

//increase quantity
user_route.put("/inc_qty/:id", auth.isLogin, cartController.incQuantity);

//remove cart product page
user_route.get("/remove_cart/:prodId", auth.isLogin, cartController.removeCart)

//load checkout page
user_route.get("/check_out", auth.isLogin, cartController.loadCheckOut)

//add address checkout page
user_route.post("/add_checkout_address", auth.isLogin, cartController.saveAddressCheckout)

//load edit address checkout page
user_route.get("/edit_check_out", auth.isLogin, cartController.loadEditCheckout)

//update address checkout page
user_route.post("/edit_check_out", auth.isLogin, cartController.updateAddress)

//delivery address
user_route.post("/delivery_address", auth.isLogin, cartController.chooseCheckoutAddress)

//confirm order
user_route.post("/confirm_order", auth.isLogin, cartController.confirmOrder)

//price low to high filter
user_route.get("/price_low_high", auth.isLogin, userController.priceLowToHigh)

//price low to high filter
user_route.get("/price_high_low", auth.isLogin, userController.priceHighToLow)


module.exports = user_route;
