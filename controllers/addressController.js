const Address = require("../models/addressModel");
const User = require("../models/userModel");
//-----------------------------------------User Addresss Management------------------------------------------------


//load address page
const loadAddress = async (req, res) => {
  try {
    const addressData = await Address.find({ user_id: req.session.user_Id,is_deleted:{$ne:1} }).limit(3).sort({updatedAt:-1})
    if (addressData!="") {
      res.render("address",{ addressData ,profile:true,session:req.session})
    }
    else (
      res.render("address", {msg:"Address not added",profile:true,session:req.session})
    )
  }   
  catch (error) { 
    console.log(error.message);
  }
}

//load address page
const addAddress = async (req, res) => {
  try {
      res.render("add_address",{profile:true,session:req.session})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//save address page
const saveAddress = async (req, res) => {
  try {
    const exists = await Address.findOne({ pincode: req.body.pincode,user_id:req.session.user_Id })
    if (exists) {
      res.render("add_address",{msg:"Address already added",profile:true,session:req.session})
    }
    else {
      const address = new Address({
        user_id:req.session.user_Id,
        house_no: req.body.houseNo,
        street: req.body.street,
        pincode: req.body.pincode,
        landmark: req.body.landmark,
        district: req.body.district,
        state:req.body.state
      })
      
      await address.save()
        const userData=await Address.findOne({user_id:req.session.user_Id,house_no:req.body.houseNo})
      await User.findOneAndUpdate({ _id: req.session.user_Id }, { $push: { address: userData._id } })
      res.redirect("/address") 
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load edit address page
const editAddress = async (req, res) => {
  try { 
    const userData = await Address.findOne({ _id: req.query.id })
    if (userData) { 
      res.render("edit_address",{userData,profile:true,session:req.session})
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//edit address page to db 
const updateAddress = async (req, res) => {
  try { 
    const exists = await Address.findOne({
      pincode: req.body.pincode,
      house_no:  { $regex :new RegExp("^" + req.body.houseNo + "$", "i") },
      user_id: req.session.user_Id,
      _id: { $ne: req.query.id }
    })
    const  userData = await Address.findOne({ user_id: req.session.user_Id, _id:req.query.id})
    if (exists) {
      res.render("edit_address", { msg: "Address already exists", userData,profile:true ,session:req.session })
    } else {
      const data = await Address.findOneAndUpdate({ _id: req.query.id },
        {
          $set: {
            house_no: req.body.houseNo,
            street: req.body.street,
            pincode: req.body.pincode,
            landmark: req.body.landmark,
            district: req.body.district,
            state: req.body.state
          }
        }, { new: true })
      
      if (data) {
        res.redirect("/address")
      }
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load orders page
const deleteAddress = async (req, res) => {
  try { 
    const data = await Address.findOneAndUpdate({ _id: req.query.id }, { $set: { is_deleted: 1 } })
    if (data) { 
      res.redirect("/address")
    }
  }
  catch (error) { 
    console.log(error.message);
  }
}


module.exports = {
  loadAddress,
  addAddress,
  saveAddress,
  editAddress,
  updateAddress,
  deleteAddress
}