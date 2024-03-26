const Product = require("../models/productModel")
const Category = require("../models/categoryModel")


//-----------------------------------------User Side Shop And Products------------------------------------------------


//load landing page 
const loadLanding = async (req, res) => {
  try {
    const category = await Category.find({})
    const product=await Product.find({}).limit(5)
    res.render("landing",{product,category,loggedIn:"false"})
  }
  catch (error) { 
    console.log(error.message);
  }
}


//load shop page with products view
const loadShop = async (req, res) => {
  try {
    const category = await Category.find({})
    const product=await Product.find({})
    res.render("shop", {product,category})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//individual product page 
const loadProduct = async (req, res) => {
  try { 
    const product = await Product.findOne({_id:req.query.prodId})
    res.render("product",{product})
  }
  catch (error) {
    
    console.log(error.message)
  }
}


//load shop page with products view
const priceAscending = async (req, res) => {
  try {
    const category = await Category.find({})
    const product = await Product.find({}).sort({ price: -1 })
    res.render("shop", {product,category})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load shop page with products view
const priceDescending = async (req, res) => {
  try {
    const category = await Category.find({})
    const product = await Product.find({}).sort({ price: 1 })
    res.render("shop", {product,category})
  }
  catch (error) { 
    console.log(error.message);
  }
}


module.exports = {
  loadLanding,
  loadProduct,
  loadShop,
  priceAscending,
  priceDescending,
}