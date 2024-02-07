const Admin = require("../models/adminModel");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");

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


//view products page
const productsLoad = async (req, res) => {
  try {
    res.render("products")
  }
  catch (error) {
    console.log(error.message);
  }
}

//category page load
const categoriesLoad = async (req, res) => {
  try {
    res.render("categories")
  }
  catch (error) {
    console.log(error.message);
  }
}


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
    const hpassword = await bcrypt.hash(Password, 10)
    const userData = await Admin.findOne({ email: Email })
    if (userData.is_blocked == 1) {
      res.render("login", { message_signin: "Access Denied" })
    }
    else {
      if (userData) { 
        const match = bcrypt.compare(hpassword, userData.password,) 
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
    
    
   
  }
  catch (error) {
    console.log(error.message);
  }
}
 

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin")
  }
  catch (error) {
    console.log(error.message);
  }
}

//view users page
const userBlock = async (req, res) => {
  try {
    const Id = req.query.id;
    const userData=await User.findOne({_id:Id})
    if (userData.is_blocked == 0) {
      var value = 1
    }
    else { 
     var value = 0;
    }
 
    await User.updateOne({ _id: Id }, { $set: {is_blocked:value} })
    res.redirect("/admin/users");
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
  productsLoad,
  categoriesLoad,
  userBlock
}