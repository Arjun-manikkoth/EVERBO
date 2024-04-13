const Product = require("../models/productModel")
const Category = require("../models/categoryModel")


//-----------------------------------------User Side Shop And Products------------------------------------------------


//load landing page 
const loadLanding = async (req, res) => {
  try {
    const category = await Category.find({})
    const product=await Product.find({is_listed:true}).limit(5)
    res.render("landing",{product,category,loggedIn:"false"})
  }
  catch (error) { 
    console.log(error.message);
  }
}


//load shop page with products view
const loadShop = async (req, res) => {
  try {
     
    let page =1
    if (req.query.page) {
      page = req.query.page;
    }
    let search = ''
    if (req.query.search) {
      search = req.query.search;
    }
    let limit = 4;
    
    const product = await Product.find({
      is_listed:true,
      $or: [
        { name: { $regex: ".*" +search+ ".*" ,$options:"i"} },
        { description: { $regex: ".*" +search+ ".*",$options:"i" } }
      ]
    }).skip((page - 1) * limit).limit(limit)
    
    const count = await Product.find({
      is_listed:true,
      $or: [
        { name: { $regex: ".*" +search+ ".*" ,$options:"i"} },
        { description: { $regex: ".*" +search+ ".*",$options:"i" } }
      ]
    }).countDocuments()
    

    let totalPages = Math.ceil(count / limit)

    const category = await Category.find({is_listed:true})
    
    res.render("shop", {
      product,
      category,
      currentPage:page,
      totalPages
    })
  }
  catch (error) { 
    console.log(error.message);
  }
}

//individual product page 
const loadProduct = async (req, res) => {
  try { 
    const product = await Product.findOne({
      _id: req.query.prodId})
    res.render("product",{product})
  }
  catch (error) {
    
    console.log(error.message)
  }
}


module.exports = {
  loadLanding,
  loadProduct,
  loadShop
}

