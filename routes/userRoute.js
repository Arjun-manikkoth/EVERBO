const express = require("express");
const user_route = express();
const session=require("express-session")
const userController = require("../controllers/userController")
const cartController = require("../controllers/cartController")
const addressController = require("../controllers/addressController")
const shopController = require("../controllers/shopController")
const wishlistController = require("../controllers/wishlistController")
const auth = require("../middlewares/userAuth")
const blockCheck=require("../middlewares/blockCheck")

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
user_route.get("/logout", auth.isLogin,blockCheck, userController.userLogout);


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
user_route.get("/shop", auth.isLogin,blockCheck, shopController.loadShop);

//individual product page
user_route.get("/product", auth.isLogin, blockCheck, shopController.loadProduct);


//---------------------------------Profile Management-----------------------------------

//user profile page
user_route.get("/profile",blockCheck, auth.isLogin, userController.loadProfile)

//edit profile to db
user_route.post("/edit_profile",blockCheck, auth.isLogin, userController.editProfile)

//wallet page
user_route.get("/wallet", blockCheck, auth.isLogin, userController.loadWallet)

//coupons page
user_route.get("/coupon", blockCheck, auth.isLogin, userController.loadCoupons)

//referral page
user_route.get("/referral", blockCheck, auth.isLogin, userController.referralLoad)

//create referral code
user_route.get("/referral_create",blockCheck, auth.isLogin, userController.createReferral)

//sent referral email
user_route.post("/invite_friends", blockCheck, auth.isLogin, userController.sentReferralMail)

//referral check
user_route.post("/referral_check",blockCheck, auth.isLogin, cartController.referralCheck)


//---------------------------------Password Management-----------------------------------

//change password page
user_route.get("/change_password",blockCheck, auth.isLogin, userController.confirmPasswordLoad)

//confirm password 
user_route.post("/confirm_password",blockCheck, auth.isLogin, userController.confirmPassword)

//new password page
user_route.get("/new_password",blockCheck, auth.isLogin, userController.newPasswordLoad)

//new password 
user_route.post("/new_password",blockCheck, auth.isLogin, userController.newPassword)



//---------------------------------Address Management-----------------------------------

//address page
user_route.get("/address",blockCheck, auth.isLogin, addressController.loadAddress)

//add address page
user_route.get("/add_address",blockCheck, auth.isLogin, addressController.addAddress)

//delete address page
user_route.get("/delete_address",blockCheck, auth.isLogin, addressController.deleteAddress)

//save address page
user_route.post("/add_address",blockCheck, auth.isLogin, addressController.saveAddress)

//edit address page
user_route.get("/edit_address",blockCheck, auth.isLogin, addressController.editAddress)

//edit address page to db
user_route.post("/edit_address",blockCheck, auth.isLogin, addressController.updateAddress)


//---------------------------------Order Management-----------------------------------

//orders page
user_route.get("/order",blockCheck, auth.isLogin, userController.loadOrders)

//orders detail page
user_route.get("/order_detail",blockCheck, auth.isLogin, userController.orderDetail)

//orders detail page
user_route.put("/cancel_order",blockCheck, auth.isLogin, userController.cancelOrder)

//orders cancellation reason
user_route.put("/return_reason", blockCheck,auth.isLogin, userController.orderReturn)

//invoice data
user_route.get("/invoice",blockCheck, auth.isLogin, userController.invoiceOrder)

//---------------------------------Cart Management---------------------------------------

//add to cart page
user_route.get("/add_to_cart",blockCheck, auth.isLogin, cartController.addToCart);

//load cart page
user_route.get("/cart",blockCheck, auth.isLogin, cartController.cartLoad);

//decrease quantity
user_route.put("/dec_qty/:id", blockCheck,auth.isLogin, cartController.decQuantity);

//increase quantity
user_route.put("/inc_qty/:id", blockCheck,auth.isLogin, cartController.incQuantity);

//remove cart product page
user_route.get("/remove_cart/:prodId",blockCheck, auth.isLogin, cartController.removeCart)

//remove cart product page
user_route.get("/check_stock",blockCheck, auth.isLogin, cartController.checkStock)


//---------------------------------Checkout Management-----------------------------------

//load checkout page
user_route.get("/check_out",blockCheck, auth.isLogin, cartController.loadCheckOut)

//add address checkout page
user_route.post("/add_checkout_address",blockCheck, auth.isLogin, cartController.saveAddressCheckout)

//load edit address checkout page
user_route.get("/edit_check_out",blockCheck, auth.isLogin, cartController.loadEditCheckout)

//update address checkout page
user_route.post("/edit_check_out",blockCheck, auth.isLogin, cartController.updateAddress)

//delivery address
user_route.post("/delivery_address",blockCheck, auth.isLogin, cartController.chooseCheckoutAddress)

//confirm order
user_route.post("/confirm_order",blockCheck, auth.isLogin, cartController.confirmOrder)

//confirm order
user_route.get("/confirm_order",blockCheck, auth.isLogin, cartController.orderPlaced)

//payment option wallet balance check
user_route.get("/check_wallet",blockCheck, auth.isLogin, cartController.checkWallet)

//razorpay status check
user_route.post("/razorpay_status",blockCheck, auth.isLogin, cartController.razorPayStatus)

//coupon check
user_route.post("/coupon_check",blockCheck, auth.isLogin, cartController.couponCheck)

//---------------------------------Wishlist Management-----------------------------------

//Wishlist load
user_route.get("/wishlist",blockCheck, auth.isLogin, wishlistController.loadWishlist)

//add to wishlist
user_route.get("/add_to_wishlist",blockCheck, auth.isLogin, wishlistController.wishlistAdd)

//remove wishlist product 
user_route.get("/remove_wishlist/:prodId",blockCheck, auth.isLogin, wishlistController.removeWishlist)


//------------------------------------------------------------------------------------------

//For invalid routes
user_route.get('*', function(req, res){
    
  res.render("404")
    
  })


module.exports = user_route;
