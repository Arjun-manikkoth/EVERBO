const User = require("../models/userModel");

const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_Id) { 

      next();
    }
    else {
      res.redirect("/entry")
     // next();
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

const isLogout = async (req, res,next) => { 
  try {

    if (req.session.user_Id) {
      const userData = await User.findOne({ _id: req.session.user_Id })
      if (userData.is_verified == 1) { 
        res.redirect("/shop")
       // next()
      } 
      else { 
        res.render("otp_verification", {message_otpverification:"Please verify OTP"})
      }
      
    }
    else { 
      next();
    }
  }

  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  isLogin,
  isLogout
}