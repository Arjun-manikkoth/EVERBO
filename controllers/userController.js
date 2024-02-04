const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")




//user passwordhash
const securepassword = async (password) => { 
  try { 
    
   return await bcrypt.hash(password, 10); 
  }
  catch (error) { 
    console.log(error.message);
  }
}

//setup new password to db
const passwordReset = async (req, res)=>{
  const id = req.query.userId;
  const newpassword = await securepassword(req.body.password);
  const userData = await User.updateOne({ _id: id }, { $set: { password: newpassword } });
  console.log(userData)

  if (userData) {
    res.render("reset_password", { message_resetpassword: "Please login with your new password" })
  }
  else { 
    res.render("reset_password", {message_resetpassword:"Password reset failed"})
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
      html: `<p>Enter <b>${generate_otp}</b> in the website for verifiying your account.</p><p>This code expires in <b>60 seconds</b></p>`
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
    
    if (data) {
      console.log(" Succesfully updated data to db");
    }
    else { 
      console.log("Failed to send data to db")
    }
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



//user signup otp verification
const otpVerifySignUp = async (req, res) => { 
  try {  
    const otp=req.body.input1 + req.body.input2 + req.body.input3 + req.body.input4;
    const userId = req.body.id;
    const userData = await User.findById({ _id: userId });

    if (userData) { 
       const otphash = await bcrypt.compare(otp, userData.otp_verify.otp)
    if (otphash) {
      res.redirect("/shop")
      }
    else {
      res.render("otp_verification", {message_otpverification:"Invalid OTP",user:userData})
      }
    }
   
    else { 
      res.render("otp_verification", { message_otpverification: "Registration failed",user:userData})
    }
    
  }
  catch (error) { 
    console.log(error.message)
  }
}

//password reset page load
const loadReset = async (req, res) => { 
  try {

     res.render("Reset_password")
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

//load forgot password page
const forgotLoad = async (req, res) => { 
  try {
     res.render("forgot_password")
  }
  catch (error) { 
    console.log(error.message)
  }
}

//load landing page 
const loadLanding = async (req, res) => {
  try {
    res.render("landing")
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load shop page with products view
const loadShop = async (req, res) => {
  try {
    res.render("shop")
  }
  catch (error) { 
    console.log(error.message);
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

    if (userData) {
      const passwordMatch=await bcrypt.compare(Password,userData.password)
      if (passwordMatch) { 
        res.redirect("/shop")
      }
      else { 
        res.render("entry",{message_signin:"Invalid username/password"})
       }
    }
    else { 
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
    const signedin = await User.findOne({ email: req.body.email })

    if (signedin) {
      res.render("entry",{message_signup:"Already a user"})
    }
    else { 
      const hpassword = await securepassword(req.body.password);
      const user=new User({
        name: req.body.name,
        email: req.body.email,
        mobile_no:req.body.mobileno,
        password:hpassword
      })
      const userData = await user.save();

      if (userData) {

        await sentOtpVerificationMail(req.body.email, userData._id);
        const data=await User.findOne({email:req.body.email})
        res.render("otp_verification", {user:data})
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

//individual product page 
const loadProduct = async (req, res) => {
  try { 
    res.render("product")
  }
  catch (error) {
    
    console.log(error.message)
  }
}

module.exports = {
  verifyLogin,
  insertUser,
  loadLogin,
  loadLanding,
  loadProduct,
  loadShop,
  forgotLoad,
  forgotVerify,
  loadReset,
  otpVerifySignUp,
  passwordReset
}