const express = require("express");
const admin_route = express();
const session=require("express-session")
const adminController = require("../controllers/adminController")
const auth = require("../middlewares/adminAuth")
const upload=require('../multer')


//setting the path for view engine
admin_route.set("views","./views/admin")

//admin session  
admin_route.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized:false
}));


//Admin login page load
admin_route.get("/",auth.isLogout,adminController.loadLogin)

//Admin login verify
admin_route.post("/", adminController.verifyLogin)

//Admin logout
admin_route.get("/logout",auth.isLogin, adminController.logout)

//Admin dashboard load
admin_route.get("/dashboard",auth.isLogin, adminController.loadDashboard)

//Admin users page load
admin_route.get("/users",auth.isLogin,adminController.usersLoad)

//block users
admin_route.get("/block",auth.isLogin, adminController.userBlock)

//Admin products page load
admin_route.get("/products",auth.isLogin, adminController.productsLoad)

//Add products page load
admin_route.get("/add_products",auth.isLogin, adminController.addProductLoad)

//add product to db
admin_route.post("/add_products", upload.array('image',3), adminController.addProduct)

//Edit product page load
admin_route.get("/edit_products",auth.isLogin, adminController.editProductLoad)
        
//update product to db
admin_route.post("/update_product", upload.array('image',3), adminController.updateProduct)

//delete product
admin_route.get("/delete_products",auth.isLogin,adminController.deleteProduct)

//Admin category page load
admin_route.get("/categories",auth.isLogin, adminController.categoriesLoad)

//Add category page load
admin_route.get("/add_category",auth.isLogin,adminController.addCategoryLoad)

//add category to db
admin_route.post("/add_category", upload.single('image'), adminController.addCategory)

//Edit category page load
admin_route.get("/edit_category",auth.isLogin, adminController.editCategoryLoad)

//Update category to db
admin_route.post("/update_category", upload.single('image'), adminController.updateCategory)

//delete category
admin_route.get("/delete_category",auth.isLogin,adminController.deleteCategory)



module.exports = admin_route;