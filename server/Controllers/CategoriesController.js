import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModel.js";

// ******** PUBLIC CONTROLLERS ********
// @desc get all categories
// @route GET /api/categories
// @route GET /api/
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all
    const categories = await Categories.find({});
    // send all categories
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******** ADMIN CONTROLLERS ********
// @desc  cre categories
// @route POST /api/categories
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  try {
    // get title
    const { title } = req.body;
    // cre new category
    const category = new Categories({
      title,
    });
    // save category
    const createdCategory = await category.save();
    // send the new category
    res.status(201).json({ message: "category added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  update category
// @route PUT /api/categories/:id
// @access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from req params
    const category = await Categories.findById(req.params.id);

    if (category) {
      //update category title
      category.title = req.body.title || category.title;
      // save the updated category
      const updatedCategory = await category.save();
      // send the updated
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc  delete category
// @route DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // find the movie in DB
    const category = await Categories.findById(req.params.id);
    // if the movie is found delete it
    if (category) {
      await category.remove;
      res.json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
