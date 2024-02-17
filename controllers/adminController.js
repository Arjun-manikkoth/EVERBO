const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel")
const Product = require("../models/productModel")
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
   const product= await Product.find({})
    res.render("products", {product})
  }
  catch (error) {
    console.log(error.message);
  }
}

//category page load
const categoriesLoad = async (req, res) => {
  try {
   const category=await Category.find({})
    res.render("categories", {category})
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

//view users page
const userBlock = async (req, res) => {
  try {
    res.redirect("/admin/users");
    const Id = req.query.id;
    const userData=await User.findOne({_id:Id})
    if (userData.is_blocked == 0) {
      var value = 1
    }
    else { 
     var value = 0;
    }
 
    await User.updateOne({ _id: Id }, { $set: {is_blocked:value} })
   
  }
  catch (error) {
    console.log(error.message);
  }
}


//add category to db
const addCategory = async (req, res) => {
  try {
   
    const Exists = await Category.findOne({ name: req.body.name });

    if (Exists) {
      res.render("add_category", { message: "Category already added" })
    }
    else { 

      const category = new Category({
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename
      })
      const categoryData = await category.save();
      if (categoryData) {
        res.redirect("/admin/categories")
      }
      else { 
        res.render("add_category",{message:"Failed to add category"})
      }
    }
  }
  catch (error) {

    console.log(error.message)
   }
}

//load add category page
const addCategoryLoad = async (req, res) => {
  try {
    res.render("add_category")
  }
  catch (error) {

    console.log(error.message)
   }
}

//delete category
const deleteCategory = async (req, res) =>
{
  try {
    const id = req.query.id;
    await Category.updateOne({ _id: id },{$set:{is_deleted:1}});
    res.redirect("/admin/categories");
  }
  catch (error) {
    console.log(error.message);
  }
}
  
//edit category load
const editCategoryLoad = async (req, res) =>
{
  try {
    const id = req.query.id;
    const editData = await Category.findOne({ _id: id });
    if (editData) {
      res.render("edit_category", {editData});
    }
    else {
      res.redirect("/admin/categories")
    }
    
  }
  catch (error) {
    console.log(error.message);
  }
  }
  
//update category
const updateCategory= async (req, res) =>
{
  try {
    const exists = await Category.findOne({ name: req.body.name,_id:{$ne:req.query.id} })
    const editData = await Category.findOne({ _id: req.query.id});
    if (exists) { 
      res.render("edit_category",{message:"Category already exists",editData})
    }
    else {
      
      if (req.file) { 
        const Data = await Category.updateOne({_id: req.query.id},
          {
            $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename
              }
          });
          if (Data) {
            res.redirect("/admin/categories")
          }
          else {
            res.render("edit_categories",{message:"Couldn't update category",editData})
          }
      }
      else {
        const Data = await Category.updateOne({_id: req.query.id},
          {
            $set: {
            name: req.body.name,
            description: req.body.description
              }
          });
          if (Data) {
            res.redirect("/admin/categories")
          }
          else {
            res.render("edit_categories",{message:"Couldn't update category",editData})
          }
      }
     
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
// const addProduct = async (req, res) => {
//   try {
//     const category = await Category.find({})
//     const Exists = await Product.findOne({ name: req.body.name });

//     if (Exists) {
//       res.render("add_product", { message: "Product already added",category})
//     }
//     else {
//       const product = new Product({
//         name: req.body.name,
//         category:req.body.category,
//         description: req.body.description,
//         price: req.body.price,
//         quantity:req.body.quantity
//       })
//       const productData = await product.save();
//       const  data =await Product.findOne({name:req.body.name})
//       if (productData) {
//         const Images = req.files.map((file) => {
//           return file.filename;
//         })
//         const daeta=await Product.findByIdAndUpdate({_id:data._id},{$set:{images:Images}})
//         console.log(data)
//         res.redirect("/admin/products")
//       }
//       else {
//         res.render("add_product",{message:"Failed to add product",category})
//       }
//     }
//   }
//   catch (error) {

//     console.log(error.message)
//    }
// }



//add product
const addProduct = async (req, res) => {
  try {
    const category = await Category.find({})
    const Exists = await Product.findOne({ name: req.body.name });

    if (Exists) {
      res.render("add_product", { message: "Product already added",category})
    }
    else {
      // const product = new Product({
      //   name: req.body.name,
      //   category:req.body.category,
      //   description: req.body.description,
      //   price: req.body.price,
      //   quantity:req.body.quantity,
      //   image: req.files.filename
      // })
      //const productData = await product.save();

    const productData = await Product.create(req.body)
    const productId = productData._id
    const subImagesArray = req.files.map((file) => {
        return file.filename
    })

    const data=await Product.findByIdAndUpdate({_id:productId},{image:subImagesArray[0]})
    const datas = await Product.findByIdAndUpdate(productId,{ $push: { subImages: { $each: subImagesArray } } })

      if (productData) {
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





//edit category load
const editProductLoad = async (req, res) =>
{
  try {
    const id = req.query.id;
    const product = await Product.findOne({ _id: id });
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
      const editData = await Product.updateOne({_id: req.query.id},
        {
          $set: {
          name: req.body.name,
          description: req.body.description,
          image: req.files.filename,
          price: req.body.price,
          quantity:req.body.quantity,
          category:req.body.category
            }
        });
        if (editData) {
          res.redirect("/admin/products")
        }
        else {
          res.render("edit_product",{message:"Couldn't update product",})
        }
    }
    else {
      const editData = await Product.updateOne({_id: req.query.id},
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity:req.body.quantity,
            category:req.body.category
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
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  usersLoad,
  productsLoad,
  categoriesLoad,
  userBlock,
  addCategoryLoad,
  addCategory,
  editCategoryLoad,
  deleteCategory,
  updateCategory,
  addProductLoad,
  addProduct,
  editProductLoad,
  updateProduct,
  deleteProduct
}