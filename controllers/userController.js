const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const moment = require("moment")
const random = require("random-string-generator");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const { USER_GMAIL, USER_PASSWORD} = process.env;

 
// ---------------------------------------------User Account Management-------------------------------------------------


//user passwordhash
const securePassword = async (password) => { 
  try {   
   return await bcrypt.hash(password, 10); 
  }
  catch (error) { 
    console.log(error.message);
  }
}

//user signup verification using otp
const sentOtpVerificationMail = async (email,id) => { 
  try {
    generate_otp = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: USER_GMAIL,
        pass: USER_PASSWORD
      }
    });
    const mailOptions = {
      from: USER_GMAIL,
      to: email,
      subject: "Verificaton mail",
      html: `<p>Enter this code <b>${generate_otp}</b> to verify your account.</p><p>This code expires in <b>60 seconds</b></p>`
    }
    transporter.sendMail(mailOptions, (error,info) => {
      if (error) { 
        console.log(error.message)
      }
      else {
        console.log("Mail sent successfully")
      }
    })

    const otp = generate_otp.toString();
    const otpHash = await bcrypt.hash(otp,10);
    const data=await User.updateOne({ _id: id },
      { $set: { otp_verify: { otp: otpHash, createdAt: Date.now(), expiresAt: Date.now() + 60000 } } }) 
  }
  catch (error) { 
   console.log(error.message)
  }
}

//reset password mail
const sentResetPasswordMail = async (email,id) => { 
  try {
       const resetLink=`http://localhost:3000/reset_password?userId=${id}`
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: USER_GMAIL,
        pass: USER_PASSWORD
      }
    });
    const mailOptions = {
      from: USER_GMAIL,
      to: email,
      subject: "Password Reset Link",
      html: `<p>Click on this <a href="${resetLink}">link<a/> to reset your account password </p>`
    }
    transporter.sendMail(mailOptions, (error,info) => {
      if (error) { 
        console.log(error.message)
      }
      else {
        console.log("Mail sent successfully")
      }
    })

  }
  catch (error) { 
   console.log(error.message)
  }
}

//referral mail
const sentReferralMail = async (req,res) => { 
  try {
    const data = await User.findById({ _id: req.session.user_Id })
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: USER_GMAIL,
        pass: USER_PASSWORD
      }
    });
    const mailOptions = {
      from: USER_GMAIL,
      to: req.body.email,
      subject: "Enjoy a 10% Discount on Your Fashion Purchase with This Referral Code!",
      html: `
        <p>Hello,</p>
        <p>I am excited to share an exclusive offer with you. Use the referral code below to get a 10% discount on your next purchase from the EVERBO fashions website:</p>
        <p><strong>Referral Code: ${data.referral.referral_code}</strong></p>
        <p>How to apply this referral code:</p>
        <ul>
          <li>Browse our collection and add your favorite items to your shopping cart.</li>
          <li>Proceed to checkout.</li>
          <li>Enter the referral code in the promo code field to receive your 10% discount.</li>
        </ul>
        <p>Don't miss out on this great opportunity to enhance your wardrobe at a discounted price. Happy shopping!</p>
        <p><small>Terms and conditions apply. Visit the website for more details.</small></p>
      `
    };
    
    transporter.sendMail(mailOptions, (error,info) => {
      if (error) { 
        console.log(error.message)
      }
      else {
        res.json(req.body.email)
      }
    })

  }
  catch (error) { 
   console.log(error.message)
  }
}

//load login page
const loadLogin = async (req,res) => { 
  try {
    res.render("entry",{loggedIn:"false"})
  }
  catch(error) { 
    console.log(error.message)
  }  
}

//verify usercredentials
const verifyLogin = async (req,res) => { 
  try {
    const Email = req.body.email
    const Password = req.body.password
    
    const userData = await User.findOne({ email: Email });
    
    if (userData){
      if (userData.is_verified == 1){
            if (userData.is_blocked == 1) {
              res.render("entry", { message_signin: "Access Denied",loggedIn:"false"})
            } else{ 
             const passwordMatch=await bcrypt.compare(Password,userData.password)
                if (passwordMatch) { 
                 req.session.user_Id = userData.id;
                 res.redirect("/shop")
                }
                else { 
                 res.render("entry",{message_signin:"Invalid username/password",loggedIn:"false"})
                }
           }
      }
      else {
        res.redirect("/entry")
      }
    
    }
    else
    { 
       res.render("entry",{message_signin:"Account doesnot exist",loggedIn:"false"})
    }       
  }
  catch(error) { 
    console.log(error.message);
  }
}

//user signup to db
const insertUser = async (req, res) => { 
  try {
    const signedIn = await User.findOne({ email: req.body.email })
    if (signedIn) {
      if (signedIn.is_verified == 1) { 
       
        res.render("entry",{message_signup:"Already a user",loggedIn:"false"})
      } 
      else {
        await sentOtpVerificationMail(req.body.email, signedIn._id);
        res.render("otp_verification", {timer:true,loggedIn:"false"});
      }
    }
    else { 
      const hPassword = await securePassword(req.body.password);
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile_no:req.body.mobileno,
        password: hPassword
     
      })
      const userData = await user.save();

      if (userData) {      
        await sentOtpVerificationMail(req.body.email, userData._id);
        req.session.user_Id = userData._id;
        res.render("otp_verification",{timer:true})
      }  
      else { 
        res.render("entry", {message_signup:"Registration failed",loggedIn:"false"})
      }
    }  
  }
  catch(error) { 
    console.log(error.message);
  }
}

//user signup otp verification
const otpVerifySignUp = async (req, res) => { 
  try {  
    const otp=req.body.input1 + req.body.input2 + req.body.input3 + req.body.input4;
    const userId = req.session.user_Id;
    const userData = await User.findById({ _id: userId });
    if (userData.otp_verify.expiresAt < Date.now()) {
      await User.updateOne({ _id: userId }, { $set: { "otp_verify.otp": "" } });
      res.render("otp_verification", {message_otpverification:"OTP expired",loggedIn:"false"})
    }
    else { 

       const otpCheck = await bcrypt.compare(otp, userData.otp_verify.otp)
       if (otpCheck) {
         await User.updateOne({ _id: userId }, { $set: { is_verified: 1 } });
         res.redirect("/shop")
       }
     else {
         res.render("otp_verification", { message_otpverification: "Invalid OTP",loggedIn:"false"});
       }
    }
  }
  catch (error) { 
    console.log(error.message)
  }
}

//resend otp
const otpResend = async (req, res) => {
  try {
   const userData= await User.findById({ _id: req.session.user_Id })
    await sentOtpVerificationMail(userData.email, req.session.user_Id);
    res.render("otp_verification", {timer:true,loggedIn:"false"});
  }
  catch (error) {
    console.log(error.message)  
  }
}

//load forgot password page
const forgotLoad = async (req, res) => { 
  try {
    res.render("forgot_password", { loggedIn: "false" })
  }
  catch (error) { 
    console.log(error.message)
  }
}

//verify forgot account 
const forgotVerify = async (req, res) => { 
  try {
    const Email = req.body.email;
    const userData = await User.findOne({ email: Email });
    if (userData) {
      await sentResetPasswordMail(Email, userData._id);
      res.render("forgot_password", {message_forgot:"Please check your Email for the link",loggedIn:"false"})
    }
    else { 
      res.render("forgot_password", {message_forgot:"Couldn't find an account with specified Email address",loggedIn:"false"})
    }
  }
  catch (error) { 
    console.log(error.message)
  }
}

//password reset page load
const loadReset = async (req, res) => { 
  try {
    const Id= req.query.userId
    res.render("Reset_password", { id: Id, loggedIn:"false"})
  }
  catch (error) { 
    console.log(error.message)
  }
}

//setup new password to db
const passwordReset = async (req, res) => {
  try {
    const Id = req.query.Id;
    const newPassword = await securePassword(req.body.password);
    const userData = await User.updateOne({ _id: Id }, { $set: { password: newPassword } });

    if (userData) {
      res.render("entry", {message_signup: "Please login with your new password",loggedIn:"false"})
    }
    else {
      res.render("entry", { message_signup: "Password reset failed",loggedIn:"false"})
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

//logout
const userLogout = async (req,res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  }
  catch (error) {
    console.log(error.message)
  }
}


// ---------------------------------------------User Profile Data -------------------------------------------------


//user profile load
const loadProfile = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.session.user_Id })
    if (userData!=[]) {
      res.render("profile", {userData,profile:true,session:req.session})
    }
    else {
      console.log("no profile data")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//edit profile to db
const editProfile = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.query.id }, { $set: { name: req.body.name, mobile_no: req.body.mobileno } }).then(
      res.redirect("/profile")
    ).catch(
      console.log("Couldnt update user data")
    )
  }
  catch (error) {
    console.log(error.message)
  }
}
//load orders page
const loadOrders = async (req, res) => {
  try { 
    const data = await Order.find({ userId: req.session.user_Id ,grandTotalCost:{$exists:true}}).sort({orderDate:-1}).populate("addressChosen")
    const count= await Order.find({ userId: req.session.user_Id ,grandTotalCost:{$exists:true}}).countDocuments()
    if (data.length !== 0) {
      let page = 1
      if (req.query.page) {
        page=req.query.page
      }
      const limit = 5
      const totalPages = Math.ceil(count / limit)
      const totalOrders = await Order.find({ userId: req.session.user_Id, cartData: { $exists: true } }).countDocuments()
      const orderData= await Order.find({ userId: req.session.user_Id ,grandTotalCost:{$exists:true}}).limit(limit).skip((page-1)*limit).sort({orderDate:-1}).populate("addressChosen")
      res.render("order",{orderData,profile:true,session:req.session,totalPages,currentPage:page,totalOrders})
    }
    else {
      res.render("order",{msg:"No Orders were Made",profile:true,session:req.session})
    }   
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load order detial page
const orderDetail = async (req, res) => {
  try { 
    const orderData = await Order.findOne({ _id: req.query.id }).populate("addressChosen").populate("userId").populate("cartData.productId").populate("referralData.referredUser").populate("")

    if (orderData) {
      res.render("order_detail",{orderData,session:req.session})
    }
    else {
      res.render("order",{msg:"Couldnt find Order",session:req.session})
    }   
  }
  catch (error) { 
    console.log(error.message);
  }
}

//cancel order
const cancelOrder = async (req, res) => {
  try {

    const orderData = await Order.findByIdAndUpdate({ _id: req.body.id }, { $set: { reason: req.body.reason, orderStatus: "Cancelled" } }, { new: true }).populate("referralData.referredUser")
    const data = await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
      $inc: {
    "wallet.walletBalance": orderData.grandTotalCost
      }, $push: {
        "wallet.walletTransaction": {
          transactionDate: Date(),
          transactionAmount: orderData.grandTotalCost,
          transactionType: "Credit",
          orderId:req.body.id
        }
      }
    }, { new: true })
      
    if (Object.keys(orderData.referralData ).length === 0) {
      await User.findByIdAndUpdate({ _id: orderData.referralData.referredUser._id }, {
        $inc: {
          "wallet.walletBalance": -orderData.referralData.referralDiscountAmount
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.referralData.referralDiscountAmount,
            transactionType: "Debit",
          }
        }
      })
        
      await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
        $inc: {
          "wallet.walletBalance": -orderData.referralData.referralDiscountAmount
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.referralData.referralDiscountAmount,
            transactionType: "Debit",
          }
        }
      })
    }


   orderData.cartData.forEach(async(prod) => {
      const productData = await Product.findByIdAndUpdate({ _id: prod.productId }, { $inc: { quantity: prod.productQuantity } },{new:true})
    })
    if (orderData) {     
      res.json(orderData) 
    }
    else {
      console.log("Couldnt Cancel product")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}


//new return reason to db
const orderReturn = async (req, res) => {
  try {

    const orderData = await Order.findByIdAndUpdate({ _id: req.body.id }, { $set: { reason: req.body.reason, orderStatus: "Returned" } }).populate("referralData.referredUser")
    const data = await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
      $inc: {
    "wallet.walletBalance": orderData.grandTotalCost
      }, $push: {
        "wallet.walletTransaction": {
          transactionDate: Date(),
          transactionAmount: orderData.grandTotalCost,
          transactionType: "Credit",
          orderId:req.body.id
        }
      }
    })

    if (Object.keys(orderData.referralData ).length === 0) {

      await User.findByIdAndUpdate({ _id: orderData.referralData.referredUser._id }, {
        $inc: {
          "wallet.walletBalance": -orderData.referralData.referralDiscountAmount
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.referralData.referralDiscountAmount,
            transactionType: "Debit",
          }
        }
      })
    
      await User.findByIdAndUpdate({ _id: req.session.user_Id }, {
        $inc: {
          "wallet.walletBalance": -orderData.referralData.referralDiscountAmount
        }, $push: {
          "wallet.walletTransaction": {
            transactionDate: Date(),
            transactionAmount: orderData.referralData.referralDiscountAmount,
            transactionType: "Debit",
          }
        }
      })
    }

    orderData.cartData.forEach(async(prod) => {
      const productData = await Product.findByIdAndUpdate({ _id: prod.productId }, { $inc: { quantity: prod.productQuantity } },{new:true})
    })
    if (orderData) {     
      res.json(orderData) 
    }
    else {
      console.log("Couldnt Return product")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//invoice
const invoiceOrder = async (req, res) => {
  try {
    const data = await Order.findById({ _id: req.query.orderId, userId: req.session.user_Id }).populate("userId").populate("addressChosen").populate("cartData.productId")
    res.json(data)
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load confirm Password page
const confirmPasswordLoad = async (req, res) => {
  try {
    res.render("confirm_password", { profile: true ,session:req.session})
  }
  catch (error) {
    console.log(error.message);
  }
} 
  //load wallet page
const loadWallet = async (req, res) => {
  try {
    const walletData = await User.findById({ _id: req.session.user_Id }).populate("wallet.walletTransaction.orderId")
    
    if (walletData.wallet.walletTransaction.length !== 0) {

      let page = 1 
      if (req.query.page) {
        page = req.query.page
      }
      let limit = 3

      const count = walletData.wallet.walletTransaction.length;
      let totalPages = Math.ceil(count / limit)
    
      walletData.wallet.walletTransaction.sort((a, b) => {
        return new Date(b.transactionDate) - new Date(a.transactionDate);
      });
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const data = walletData.wallet.walletTransaction.slice(startIndex, endIndex);
      
      res.render("wallet",{profile:true,data,session:req.session,walletBalance:walletData.wallet,totalPages,currentPage: page})
    }
    else {
      res.render("wallet",{profile:true,msg:"No Recent transactions",session:req.session})
    }
      
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load coupons page
const loadCoupons = async (req, res) => {
  try { 
    const data = await Coupon.find({is_deleted:0, expiryDate: {$gte:Date.now()}})
    if (data.length !== 0) {
      let page = 1
      if (req.query.page) {
        page=req.query.page
      }
      const limit = 5
      const count = await Coupon.find({is_deleted:0, expiryDate: {$gte:Date.now()}}).countDocuments()
      const totalPages = Math.ceil(count / limit)
      const couponData= await Coupon.find({ is_deleted: 0, expiryDate: {$gte:Date.now()} }).sort({expiryDate:1})
      res.render("coupons",{couponData,profile:true,session:req.session,totalPages,currentPage:page})
    }
    else {
      res.render("coupons",{msg:"No coupons available",profile:true,session:req.session})
    }   
  }
  catch (error) { 
    console.log(error.message);
  }
}

//confirm password check
const confirmPassword = async (req, res) => {
  try {

    const userData = await User.findOne({ _id: req.session.user_Id })
    const success = await bcrypt.compare(req.body.password, userData.password)
    if (success) { 
      res.redirect("/new_password")
    }
    else {
      res.render("confirm_password", {msg:"Please Check the password",profile:true})
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load new password page
const newPasswordLoad = async (req, res) => {
  try {
      res.render("change_password",{profile:true,session:req.session})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//new password to db
const newPassword = async (req, res) => {
  try {
    const hpassword = await securePassword(req.body.password)
    const success=await User.updateOne({ _id: req.session.user_Id }, { $set: { password: hpassword } })
    if (success) {     
      res.redirect("/logout") 
    }
    else {
      console.log("Couldnt update password")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load refer and earn page
const referralLoad = async (req, res) => {
  try {
    const userData=await User.findById({_id:req.session.user_Id})
    res.render("referral", { profile: true ,session:req.session,userData})
  }
  catch (error) {
    console.log(error.message);
  }
}


//create referral offer
const createReferral = async (req, res) => {
  try {
    const code = random(8, 'uppernumeric')

    const data = await User.findByIdAndUpdate({ _id: req.session.user_Id }, { $set: { "referral.referral_code": code } }, { new: true })
    
    res.json(data)

  }
  catch (error) {
    console.log(error.message);
  }
}


  module.exports = {
    verifyLogin,
    insertUser,
    loadLogin,
    forgotLoad,
    forgotVerify,
    loadReset,
    otpVerifySignUp,
    passwordReset,
    userLogout,
    otpResend,
    loadProfile,
    editProfile,
    loadOrders,
    orderDetail,
    cancelOrder,
    orderReturn,
    invoiceOrder,
    loadWallet,
    loadCoupons,
    referralLoad,
    createReferral,
    sentReferralMail,
    confirmPasswordLoad,
    confirmPassword,
    newPasswordLoad,
    newPassword
  }