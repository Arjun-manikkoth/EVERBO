const Category = require("../models/categoryModel")

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

//load add category page
const addCategoryLoad = async (req, res) => {
  try {
    res.render("add_category")
  }
  catch (error) {

    console.log(error.message)
   }
}

//add category to db
const addCategory = async (req, res) => {
  try {
   const categoryName=req.body.name.toString()
    const exists = await Category.findOne({ name: { $regex: new RegExp("^"+categoryName+"$","i") } });
    console.log(exists)

    if (exists) {
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
        const data = await Category.updateOne({_id: req.query.id},
          {
            $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename
              }
          });
          if (data) {
            res.redirect("/admin/categories")
          }
          else {
            res.render("edit_categories",{message:"Couldn't update category",editData})
          }
      }
      else {
        const data = await Category.updateOne({_id: req.query.id},
          {
            $set: {
            name: req.body.name,
            description: req.body.description
              }
          });
          if (data) {
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

module.exports = {
  categoriesLoad,
  addCategoryLoad,
  addCategory,
  editCategoryLoad,
  deleteCategory,
  updateCategory
}