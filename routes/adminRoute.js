const express = require("express");
const admin_route = express();
const session=require("express-session")
const adminController = require("../controllers/adminController")
const productController = require("../controllers/productController")
const categoryController = require("../controllers/categoryController")
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
admin_route.get("/products",auth.isLogin, productController.productsLoad)

//Add products page load
admin_route.get("/add_products",auth.isLogin, productController.addProductLoad)

//add product to db
admin_route.post("/add_products", upload.array('image', 3), productController.addProduct)

//add product to db
//admin_route.post("/add_products", upload.array('image', 3), productController.addProduct)

//Edit product page load
admin_route.get("/edit_products",auth.isLogin, productController.editProductLoad)
        
//update product to db
admin_route.post("/update_product", upload.array('image', 3), productController.updateProduct)

//update product thumbnail to db
admin_route.post("/update_product_thumb", upload.single('image'), productController.updateProductThumb)

//delete product
admin_route.get("/delete_products",auth.isLogin,productController.deleteProduct)

//Admin category page load
admin_route.get("/categories",auth.isLogin, categoryController.categoriesLoad)

//Add category page load
admin_route.get("/add_category",auth.isLogin,categoryController.addCategoryLoad)

//add category to db
admin_route.post("/add_category", upload.single('image'), categoryController.addCategory)

//Edit category page load
admin_route.get("/edit_category",auth.isLogin, categoryController.editCategoryLoad)

//Update category to db
admin_route.post("/update_category", upload.single('image'), categoryController.updateCategory)

//delete category
admin_route.get("/delete_category",auth.isLogin,categoryController.deleteCategory)



module.exports = admin_route;