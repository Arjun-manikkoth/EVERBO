const Admin= require("../models/adminModel");

const isLogin = async (req, res, next) => {
  try {
    if (req.session.admin_Id) { 
      next();
    }
    else {
        res.redirect("/admin")
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

const isLogout = async (req, res,next) => { 
  try {

    if (req.session.admin_Id) { 
        res.redirect("/admin/dashboard")
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