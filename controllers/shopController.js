const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const User = require("../models/userModel")
const Banner= require("../models/bannerModel")

//-----------------------------------------User Side Shop And Products------------------------------------------------


//load landing page 
const loadLanding = async (req, res) => {
  try {
    const category = await Category.find({})
    const banner= await Banner.findOne({is_active:true})
    const product=await Product.find({is_listed:true}).limit(5).populate("category")
    res.render("landing",{product,category,loggedIn:"false",banner})
  }
  catch (error) { 
    console.log(error.message);
  }
}


const loadShop = async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page = parseInt(req.query.page);
    }

    let search = '';
    if (req.query.searchTerm) {
      search = req.query.searchTerm.trim();
    }

    let minPrice = 0;
    let maxPrice = Infinity;
    if (req.query.minPrice) {
      minPrice = parseInt(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      maxPrice = parseInt(req.query.maxPrice);
    }

    let sortBy = 'createdAt'; 
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case 'Price Low to High':
          sortBy = 'price';
          break;
        case 'Price High to Low':
          sortBy = '-price';
          break;
        case 'aA-zZ':
          sortBy = 'name';
          break;
        case 'Zz-Aa':
          sortBy = '-name';
          break;
        default:
          sortBy = 'createdAt';
      }
    }

    let limit = 4;
    const skip = (page - 1) * limit;

    const query = {
      is_listed: true,
      is_deleted: 0,
      $or: [
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
        { description: { $regex: ".*" + search + ".*", $options: "i" } }
      ],
      price: { $gte: minPrice, $lte: maxPrice }
    };
   
    if (req.query.category) {
      const category = await Category.findOne({ name: req.query.category })
      query.category = category._id;
    }

    const product = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const count = await Product.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    const category = await Category.find({ is_listed: true, is_deleted: 0 });
    const userData = await User.findOne({ _id: req.session.user_Id });

    req.session.cartCount = userData.cart.length;
    req.session.wishlistCount = userData.wishlist.length;

    res.render("shop", {
      product,
      category,
      currentPage: page,
      totalPages,
      session: req.session
    });
  } catch (error) {
    console.log(error.message);
  }
};

//individual product page 
const loadProduct = async (req, res) => {
  try { 
    const product = await Product.findOne({
      _id: req.query.prodId
    })

    res.render("product", { product, session: req.session })
  }
  catch (error) {
    
    console.log(error.message)
  }
}

//load shop page with products view
const priceAscending = async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 4

    const category = await Category.find({is_listed:true})
    const product = await Product.find({is_listed:true,is_deleted:0}).sort({ price: -1 }).skip((page - 1) * limit).limit(limit)
    const count = await Product.find({is_listed:true,is_deleted:0}).sort({ price: -1 }).skip((page - 1) * limit).limit(limit).countDocuments()
    let totalPages=Math.ceil(count/limit)
    res.render("shop", {product,category,session:req.session,totalPages,currentPage:page})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load shop page with products view
const priceDescending = async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 4

    const category = await Category.find({is_listed:true,is_deleted:0})
    const product = await Product.find({is_listed:true,is_deleted:0}).sort({ price: 1 }).skip((page - 1) * limit).limit(limit)
    const count = await Product.find({is_listed:true,is_deleted:0}).sort({ price: 1 }).skip((page - 1) * limit).limit(limit).countDocuments()
    let totalPages=Math.ceil(count/limit)
    res.render("shop", {product,category,session:req.session,totalPages,currentPage:page})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load shop page with products view
const alphabetDescending = async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 4

    const category = await Category.find({is_listed:true,is_deleted:0})
    const product = await Product.find({is_listed:true,is_deleted:0}).sort({ name: -1 }).skip((page - 1) * limit).limit(limit)
    const count = await Product.find({is_listed:true,is_deleted:0}).sort({ name :-1 }).skip((page - 1) * limit).limit(limit).countDocuments()
    let totalPages=Math.ceil(count/limit)
    res.render("shop", {product,category,session:req.session,totalPages,currentPage:page})
  }
  catch (error) { 
    console.log(error.message);
  }
}

//load shop page with products view
const alphabetAscending = async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page=req.query.page
    }
    let limit = 4

    const category = await Category.find({is_listed:true,is_deleted:0})
    const product = await Product.find({is_listed:true,is_deleted:0}).sort({ name: 1 }).skip((page - 1) * limit).limit(limit)
    const count = await Product.find({is_listed:true,is_deleted:0}).sort({ name: 1 }).skip((page - 1) * limit).limit(limit).countDocuments()
    let totalPages=Math.ceil(count/limit)
    res.render("shop", {product,category,session:req.session,totalPages,currentPage:page})
  }
  catch (error) { 
    console.log(error.message);
  }
}

module.exports = {
  loadLanding,
  loadProduct,
  //priceAscending,
 // priceDescending,
 // alphabetAscending,
 // alphabetDescending,
  loadShop
}

