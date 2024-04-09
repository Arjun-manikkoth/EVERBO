const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const Order = require("../models/orderModel");

 
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
        user: "itsmearjun1028@gmail.com",
        pass: "ldhp gham wlcl ofac"
      }
    });
    const mailOptions = {
      from: "itsmearjun1028@gmail.com",
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
        user: "itsmearjun1028@gmail.com",
        pass: "ldhp gham wlcl ofac"
      }
    });
    const mailOptions = {
      from: "itsmearjun1028@gmail.com",
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


//load login page
const loadLogin = async (req,res) => { 
  try {
    res.render("entry")
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
              res.render("entry", { message_signin: "Access Denied" })
            } else{ 
             const passwordMatch=await bcrypt.compare(Password,userData.password)
                if (passwordMatch) { 
                 req.session.user_Id = userData.id;
                 res.redirect("/shop")
                }
                else { 
                 res.render("entry",{message_signin:"Invalid username/password"})
                }
           }
      }
      else {
        res.redirect("/entry")
      }
    
    }
    else
    { 
       res.render("entry",{message_signin:"Account doesnot exist"})
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
       
        res.render("entry",{message_signup:"Already a user"})
      } 
      else {
        await sentOtpVerificationMail(req.body.email, signedIn._id);
        res.render("otp_verification", {timer:true});
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
        res.render("entry", {message_signup:"Registration failed"})
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
      res.render("otp_verification", {message_otpverification:"OTP expired"})
    }
    else { 

       const otpCheck = await bcrypt.compare(otp, userData.otp_verify.otp)
       if (otpCheck) {
         await User.updateOne({ _id: userId }, { $set: { is_verified: 1 } });
         res.redirect("/shop")
       }
     else {
         res.render("otp_verification", { message_otpverification: "Invalid OTP" });
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
    res.render("otp_verification", {timer:true});
  }
  catch (error) {
    console.log(error.message)  
  }
}

//load forgot password page
const forgotLoad = async (req, res) => { 
  try {
     res.render("forgot_password")
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
      res.render("forgot_password", {message_forgot:"Please check your Email for the link"})
    }
    else { 
      res.render("forgot_password", {message_forgot:"Couldn't find an account with specified Email address"})
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
    res.render("Reset_password", {id:Id})
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
    console.log(userData)

    if (userData) {
      res.render("reset_password", { message_resetpassword: "Please login with your new password", id: Id })
    }
    else {
      res.render("reset_password", { message_resetpassword: "Password reset failed", id: Id })
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
      res.render("profile", {userData})
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
    const orderData = await Order.find({ userId: req.session.user_Id }).populate("addressChosen")

    if (orderData!="") {
      res.render("order",{orderData})
    }
    else {
      res.render("order",{msg:"No Orders were Made"})
    }   
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load order detial page
const orderDetail = async (req, res) => {
  try { 
    const orderData = await Order.findOne({ _id: req.query.id }).populate("addressChosen").populate("userId").populate("cartData.productId")
    console.log(orderData)
    if (orderData) {
      res.render("order_detail",{orderData})
    }
    else {
      res.render("order",{msg:"Couldnt find Order"})
    }   
  }
  catch (error) { 
    console.log(error.message);
  }
}

//cancel order
const cancelOrder = async (req, res) => {
  try {

    const data = await Order.findByIdAndUpdate({ _id: req.body.id }, { $set: { reason :req.body.reason,orderStatus: "Cancelled" } })
    if (data) {
      res.json(data)
    }    
    else {
      console.log("Couldnt cancel order")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}


//new return reason to db
const orderReturn = async (req, res) => {
  try {
    const success = await Order.findByIdAndUpdate({ _id: req.body.id }, { $set: { reason: req.body.reason ,orderStatus:"Returned"} })
    if (success) {     
      res.json(success) 
    }
    else {
      console.log("Couldnt return product")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}


//load confirm Password page
const confirmPasswordLoad = async (req, res) => {
  try {
      res.render("confirm_password")
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
      res.render("confirm_password", {msg:"Please Check the password"})
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load new password page
const newPasswordLoad = async (req, res) => {
  try {
      res.render("change_password")
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
  confirmPasswordLoad,
  confirmPassword,
  newPasswordLoad,
  newPassword
}