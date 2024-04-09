const Product = require("../models/productModel")
const Category = require("../models/categoryModel")


//-----------------------------------------Admin Side Product Management------------------------------------------------


//view products page
const productsLoad = async (req, res) => {
  try {
    const product = await Product.find({}).populate("category")
    if (product) {
      res.render("products", {product})
    }
    else {
      res.render("products", {msg:"No Products Added"})
    }
    
  }
  catch (error) {
    console.log(error.message);
  }
}

//load add products page
const addProductLoad = async (req, res) => {
  try {
    const category = await Category.find({})
    
    res.render("add_product",{category})
  }
  catch (error) {

    console.log(error.message)
   }
}

//add product
const addProduct = async (req, res) => {
  try {
    const category = await Category.find({})
    const Exists = await Product.findOne({ name: req.body.name });

    if (Exists) {
      res.render("add_product", { message: "Product already added",category})
    }
    else {
      const product = new Product({
        name: req.body.name,
        category:req.body.category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
      })
      const productData = await product.save();
      const  data =await Product.findOne({name:req.body.name})
      if (productData) {
       const subImagesArray = req.files.map((file) => {
      return file.filename;
       })
        const productData = await Product.findByIdAndUpdate({ _id: data._id }, { $set: { subImages: subImagesArray } })
          res.redirect("/admin/products")
      }
      else {
        res.render("add_product",{message:"Failed to add product",category})
      }
    }
  }
  catch (error) {
    console.log(error.message)
   }
}

//list unlist product
const productView = async (req, res) =>
{
  try {
    const id = req.query.id;
    const data = await Product.findOne({ _id: id });
    if (data.is_listed === true) {
      await Product.updateOne({ _id: id },{$set:{is_listed:false}});
    }
    else {
      await Product.updateOne({ _id: id }, { $set: { is_listed: true } });
    }
    res.redirect("/admin/products");
  }
  catch (error) {
    console.log(error.message);
  }
}

//edit category load
const editProductLoad = async (req, res) =>
{
  try {
    const id = req.query.id;
    const product = await Product.findOne({ _id: id, is_deleted: { $ne: 1 } }).populate("category");
    console.log(product)
    const category = await Category.find({})
    if (product) {
      res.render("edit_product", {product,category});
    }
    else {
      res.redirect("/admin/products")
    }   
  }
  catch (error) {
    console.log(error.message);
  }
}
 
//update product
const updateProduct= async (req, res) =>
{  
  try {
    if (req.files) {
      const productId = req.query.id;
      const subImagesArray = req.files.map((file) => {
        return file.filename
      })   
      const datas = await Product.findByIdAndUpdate(productId, { $set: { subImages:subImagesArray } })    
      if (datas) {
        res.redirect("/admin/products")
      }
      else {
        res.render("edit_product", { message: "Couldn't update product"})
      }
    }
    else {
      const editData = await Product.updateOne({ _id: req.query.id },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category
          }
        });
      
      
        if (editData) {
          res.redirect("/admin/products")
        }
        else {
          res.render("edit_product",{message:"Couldn't update product"})
        }
    } 
  }
  catch (error) {
    console.log(error.message);
  }
}
const updateProductThumb= async (req, res) =>
{  
  try {       
    const datas = await Product.findByIdAndUpdate(req.query.id, { $set: { image: req.file.filename } })
    
      if (datas) {
        res.redirect("/admin/products")
      }
      else {
        res.render("edit_product", { message: "Couldn't update product"})
      }
  }
  catch (error) {
    console.log(error.message);
  }
  }
  
//delete product
const deleteProduct = async (req, res) =>
{
  try {
    const id = req.query.id;
    await Product.updateOne({ _id: id },{$set:{is_deleted:1}});
    res.redirect("/admin/products");
  }
  catch (error) {
    console.log(error.message);
  }
}
 

 
module.exports = {
  productsLoad,
  addProductLoad,
  addProduct,
  productView,
  editProductLoad,
  updateProduct,
  updateProductThumb,
  deleteProduct
}