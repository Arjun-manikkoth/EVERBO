const express = require("express");
const admin_route = express();
const session = require("express-session")
const nocache= require("nocache")
const adminController = require("../controllers/adminController")
//const auth = require("../middlewares/adminAuth")

admin_route.use(nocache());

//parse data
admin_route.use(express.json())
admin_route.use(express.urlencoded({extended:true}))


//static file
admin_route.use(express.static("public"));

//setting the view engine
admin_route.set("view engine","ejs")
admin_route.set("views","./views/admin")


// session middleware
admin_route.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized:false
}));

//Admin login page load
admin_route.get("/",adminController.loadLogin)

//Admin login verify
admin_route.post("/", adminController.verifyLogin)

//Admin dashboard load
admin_route.get("/dashboard", adminController.loadDashboard)

//Admin logout
admin_route.get("/logout", adminController.logout)

//block user
admin_route.get("/block", adminController.userBlock)

//Admin users page load
admin_route.get("/users", adminController.usersLoad)

//Admin products page load
admin_route.get("/products", adminController.productsLoad)

//Admin category page load
admin_route.get("/categories", adminController.categoriesLoad)



module.exports = admin_route;