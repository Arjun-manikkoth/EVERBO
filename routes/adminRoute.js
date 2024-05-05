const express = require("express");
const admin_route = express();
const session=require("express-session")
const adminController = require("../controllers/adminController")
const productController = require("../controllers/productController")
const categoryController = require("../controllers/categoryController")
const orderController = require("../controllers/orderController")
const couponController = require("../controllers/couponController")
const auth = require("../middlewares/adminAuth")
const upload = require('../middlewares/multer')
const sharpCrop =require('../middlewares/sharp')

const productMainCropSize = [
  { width: 136, height: 136 }
];

const thumbnailCropSize = [
  { width: 235, height: 235}
];

const categoryCropSize = [
  { width: 370, height: 280 }
];


//setting the path for view engine
admin_route.set("views","./views/admin")

//admin session  
admin_route.use(session({
  secret: 'secretadmin',
  resave: true,
  saveUninitialized:false
}));

//---------------------------------Admin Login-------------------------------------------------

//Admin login page load
admin_route.get("/",auth.isLogout,adminController.loadLogin)

//Admin login verify
admin_route.post("/",auth.isLogout,adminController.verifyLogin)

//Admin logout
admin_route.get("/logout", auth.isLogin, adminController.logout)


//-----------------------------------Dashboard----------------------------------------------

//Admin dashboard load
admin_route.get("/dashboard", auth.isLogin, adminController.loadDashboard)


//-----------------------------------User Management----------------------------------------

//Admin users page load
admin_route.get("/users",auth.isLogin,adminController.usersLoad)

//block users
admin_route.get("/block", auth.isLogin, adminController.userBlock)


//-----------------------------------Products Management------------------------------------


//Admin products page load
admin_route.get("/products",auth.isLogin, productController.productsLoad)

//Add products page load
admin_route.get("/add_products",auth.isLogin, productController.addProductLoad)

//add product to db
admin_route.post("/add_products", upload.array('image', 3),sharpCrop(productMainCropSize), productController.addProduct)

//product list unlist
admin_route.get("/product_view",auth.isLogin, productController.productView)

//Edit product page load
admin_route.get("/edit_products",auth.isLogin, productController.editProductLoad)
        
//update product to db
admin_route.post("/update_product", upload.array('image', 3),sharpCrop(productMainCropSize), productController.updateProduct)

//update product thumbnail to db
admin_route.post("/update_product_thumb", upload.single('image'),sharpCrop(thumbnailCropSize), productController.updateProductThumb)

//delete product
admin_route.get("/delete_products", auth.isLogin, productController.deleteProduct)


//-----------------------------------Category Management-----------------------------------

//Admin category page load
admin_route.get("/categories",auth.isLogin, categoryController.categoriesLoad)

//Add category page load
admin_route.get("/add_category",auth.isLogin,categoryController.addCategoryLoad)

//add category to db
admin_route.post("/add_category", upload.single('image'),sharpCrop(categoryCropSize), categoryController.addCategory)

//category list unlist
admin_route.get("/category_view", auth.isLogin, categoryController.categoryView)

//Edit category page load
admin_route.get("/edit_category",auth.isLogin, categoryController.editCategoryLoad)

//Update category to db
admin_route.post("/update_category", upload.single('image'),sharpCrop(categoryCropSize), categoryController.updateCategory)

//delete category
admin_route.get("/delete_category", auth.isLogin, categoryController.deleteCategory)


//-----------------------------------Order Management-----------------------------------

//Admin order page load
admin_route.get("/orders", auth.isLogin, orderController.orderLoad)

//Admin order detail page load
admin_route.get("/order_detail", auth.isLogin, orderController.orderDetailLoad)

//Admin order edit page load
admin_route.post("/order_edit",auth.isLogin, orderController.updateOrder)


//-----------------------------------Coupon Management----------------------------------

//Admin coupon page load
admin_route.get("/coupons", auth.isLogin, couponController.couponLoad)

//Add coupon page load
admin_route.get("/add_coupon", auth.isLogin, couponController.addCouponLoad)

//Add coupon 
admin_route.post("/add_coupon", auth.isLogin, couponController.addCoupon)

//edit coupon load
admin_route.get("/edit_coupon", auth.isLogin, couponController.editCouponLoad)

//edit coupon to db
admin_route.post("/edit_coupon", auth.isLogin, couponController.updateCoupon)

//Delete coupon 
 admin_route.get("/delete_coupon", auth.isLogin, couponController.deleteCoupon)

module.exports = admin_route;