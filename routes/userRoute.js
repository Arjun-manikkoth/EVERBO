const express = require("express");
const user_route = express();
const session=require("express-session")
const userController = require("../controllers/userController")
const cartController = require("../controllers/cartController")
const addressController = require("../controllers/addressController")
const shopController = require("../controllers/shopController")
const wishlistController = require("../controllers/wishlistController")
const auth=require("../middlewares/userAuth")

//setting the path for the view engine
user_route.set("views","./views/users")

//user session
user_route.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized:false
}));


//---------------------------------User Sign In ---------------------------------------

//landing page
user_route.get("/",auth.isLogout, shopController.loadLanding)

//login page
user_route.get("/entry", auth.isLogout, userController.loadLogin)

//user login check
user_route.post("/user_login", auth.isLogout, userController.verifyLogin)

//user logout
user_route.get("/logout", auth.isLogin, userController.userLogout);


//---------------------------------- Sign Up --------------------------------------------

//user registration data to db
user_route.post("/user_registration", auth.isLogout,userController.insertUser)

//user signup otp resend
user_route.get("/resend_otp",auth.isLogin, userController.otpResend);

//user signup otp verification post
user_route.post("/otp_verification", auth.isLogin, userController.otpVerifySignUp);


//---------------------------------Forgot Password ---------------------------------------

//forgot password page
user_route.get("/forgot_password",auth.isLogout, userController.forgotLoad);

//forgot password post
user_route.post("/forgot_password",auth.isLogout, userController.forgotVerify);

//reset password page
user_route.get("/reset_password",auth.isLogout, userController.loadReset);

//reset password post
user_route.post("/reset_password",auth.isLogout, userController.passwordReset);


//---------------------------------Product Management-----------------------------------

//user shop page
user_route.get("/shop", auth.isLogin, shopController.loadShop);

//individual product page
user_route.get("/product",auth.isLogin, shopController.loadProduct);

//price low to high filter
user_route.get("/price_low_high", auth.isLogin, shopController.priceAscending)

//price low to high filter
user_route.get("/price_high_low", auth.isLogin, shopController.priceDescending)

//---------------------------------Profile Management-----------------------------------

//user profile page
user_route.get("/profile", auth.isLogin, userController.loadProfile)

//edit profile to db
user_route.post("/editProfile", auth.isLogin, userController.editProfile)


//---------------------------------Address Management-----------------------------------

//address page
user_route.get("/address", auth.isLogin, addressController.loadAddress)

//add address page
user_route.get("/add_address", auth.isLogin, addressController.addAddress)

//delete address page
user_route.get("/delete_address", auth.isLogin, addressController.deleteAddress)

//save address page
user_route.post("/add_address", auth.isLogin, addressController.saveAddress)

//edit address page
user_route.get("/edit_address", auth.isLogin, addressController.editAddress)

//edit address page to db
user_route.post("/edit_address", auth.isLogin, addressController.updateAddress)


//---------------------------------Order Management-----------------------------------

//orders page
user_route.get("/order", auth.isLogin, userController.loadOrders)

//orders detail page
user_route.get("/order_detail", auth.isLogin, userController.orderDetail)

//orders detail page
user_route.put("/cancel_order", auth.isLogin, userController.cancelOrder)

//orders cancellation reason
user_route.put("/return_reason", auth.isLogin, userController.orderReturn)


//---------------------------------Password Management-----------------------------------

//change password page
user_route.get("/change_password", auth.isLogin, userController.confirmPasswordLoad)

//confirm password 
user_route.post("/confirm_password", auth.isLogin, userController.confirmPassword)

//new password page
user_route.get("/new_password", auth.isLogin, userController.newPasswordLoad)

//new password 
user_route.post("/new_password", auth.isLogin, userController.newPassword)


//---------------------------------Cart Management---------------------------------------

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

//remove cart product page
user_route.get("/check_stock", auth.isLogin, cartController.checkStock)


//---------------------------------Checkout Management-----------------------------------

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


//---------------------------------Wishlist Management-----------------------------------

//Wishlist load
user_route.get("/wishlist", auth.isLogin, wishlistController.loadWishlist)

//add to wishlist
user_route.get("/add_to_wishlist", auth.isLogin, wishlistController.wishlistAdd)

//remove wishlist product 
user_route.get("/remove_wishlist/:prodId", auth.isLogin, wishlistController.removeWishlist)

module.exports = user_route;
