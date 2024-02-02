const User = require("../models/userModel");
const bcrypt = require("bcrypt")

const loadLanding = async (req, res) => {

  try {
    res.render("landing")
  }
  catch (error) { 
    console.log(error.message);
  }


}
const loadLogin = async (req,res) => { 
  try {
    res.render("entry")
  }
  catch(error) { 
    console.log(error.message)
  }  
}

const securepassword = async (password) => { 
  try {      
    return await bcrypt.hash(password, 10); 
  }
  catch (error) { 
    console.log(error.message);
  }
}

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
       res.render("otp_verification")
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


const loadShop = async (req, res) => {
  
  try { 
    res.render("product")
  }
  catch (error) {
    
    console.log(error.message)
  }
}

module.exports = {verifyLogin,insertUser,loadLogin,loadLanding,loadShop}