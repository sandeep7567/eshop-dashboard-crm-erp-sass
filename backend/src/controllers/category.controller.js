import Category from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc - Created Category
// @route - POST /api/v1/product/category
// @access Admin/Private
const createCategory = asyncHandler(async (req, res) => {

  const { title, description } = req.body;
  const admin = req.user;

  if (!title || !description || typeof title !== "string" || typeof description !== "string") {
    throw new ApiError(400, "All fields are required");
  };

  const createdCategory = await Category.create({
    title,
    description,
    userId: admin._id,
  });

  if (!createdCategory) {
    throw new ApiError(301, "Something went wrong while creating the category")
  };

  console.log(createCategory);

  return res.status(201).json(
    new ApiResponse(
      200,
      createCategory,
      "Category Created Successfully",
    )
  )

});

// @desc - Get All Categories
// @route - GET /api/v1/product/category
// @access Admin/Private
const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  return res.status(200).json(
    new ApiResponse(
      200,
      categories,
      "All categories retrieved Successfully",
    )
  )
});

// @desc - Get Category By Id
// @route - GET /api/v1/product/category/:id
// @access Admin/Private
const getCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    throw new ApiError(400, "Category Id is required");
  };

  const categoryById = await Category.findById(categoryId);
  return res.status(200).json(
    new ApiResponse(
      200,
      categoryById,
      "Category retrieved Successfully",
    )
  )
});

// @desc - Update Categories Bny Id
// @route - PUT /api/v1/product/category/:id
// @access Admin/Private
const updateCategoryById = asyncHandler(async (req, res) => {
  const {title, description} = req.body;
  const categoryId = req.params.id;
  if (!categoryId || !title || !description || typeof title !== "string" || typeof description !== "string") {
    throw new ApiError(400, "Category Id && Updation Data is required");
  };

  const categoryById = await Category.findByIdAndUpdate(
    categoryId,
    {
      title: title,
      description: description,
    },
    {
      new:true
    }
  ).exec();

  if (!categoryById) {
    throw new ApiError(404, "Category Updation not found, try again",);
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      categoryById,
      "Category Updation By categoryId Successfully",
    )
  )
});

// @desc - Delete Category By Id
// @route - DELETE /api/v1/product/category/:id
// @access Admin/Private
const deleteCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  console.log(req.params);

  if (!categoryId) {
    throw new ApiError(404, "Category Id is required");
  };

  const categoryDeleteById = await Category.findByIdAndDelete(categoryId);

  if (!categoryDeleteById) {
    throw new ApiError(404, "Category deletion not done, try again",);
  };

  return res.status(200).json(
    new ApiResponse(
      201, categoryDeleteById, "Category deleted Successfully",
    )
  );
});

export {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};