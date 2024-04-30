const User = require("../models/userModel");

const isBlocked = async (req, res, next) => {
  try {
    const status = await User.findOne({ _id: req.session.user_Id })
    console.log(status)
    if (status.is_blocked === 1) {
      res.render("entry",{ message_signin: "Account blocked by Admin",loggedIn:"false"})
    } else {
      next();
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports=isBlocked