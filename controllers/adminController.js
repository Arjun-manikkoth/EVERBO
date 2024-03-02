const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


//admin login load
const loadLogin = async (req, res) => {
  try {
    res.render("login")
  }
  catch (error) {
    console.log(error.message);
  }
}

//admin verify login
const verifyLogin = async (req, res) => {
  try {
    const Email = req.body.email;
    const Password = req.body.password;
    const userData = await Admin.findOne({ email: Email })

      if (userData) { 
        const match = await bcrypt.compare(Password, userData.password) 
        console.log(match)
        if (match) {
          req.session.admin_Id = userData._id;
          res.redirect("/admin/dashboard");
        }
        else { 
          res.render("login", {message_signin:"Invalid credentials"})
        }
      }
      else {
        res.render("login",{message_signin:"Account doesnot exist"})
      }
    
  }
  catch (error) {
    console.log(error.message);
  }
}
 
//admin dashboard load
const loadDashboard = async (req, res) => {
  try {
    res.render("dashboard")
  }
  catch (error) {
    console.log(error.message);
  }
}

//view users page
const usersLoad = async (req, res) => {
  try {

    const userDetails =await User.find({});
    res.render("users", {userDetails})
  }
  catch (error) {
    console.log(error.message);
  }
}

//user management page
const userBlock = async (req, res) => {
  try {
    res.redirect("/admin/users");
    const Id = req.query.id;
    const userData=await User.findOne({_id:Id})
    if (userData.is_blocked == 0) {
      const value = 1
      await User.updateOne({ _id: Id }, { $set: {is_blocked:value} })
    }
    else { 
      const value = 0;
      await User.updateOne({ _id: Id }, { $set: {is_blocked:value} })
    }  
  }
  catch (error) {
    console.log(error.message);
  }
}


//admin logout
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin")
  }
  catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  usersLoad,
  userBlock
}