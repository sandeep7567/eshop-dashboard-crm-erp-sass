import { Router } from "express";

import {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/category.controller.js";

import {
  isAuthenticated,
  isAdmin,
  isValidId,
} from "../middlewares/auth.middlewares.js";

const router = Router();

//------------------------------------- Admin Category (CRUD);-------------------------------------------------//
router.route("/category")
  .get(isAuthenticated, isAdmin, getAllCategory)
  .post(isAuthenticated, isAdmin, createCategory);

router.route("/category/:id")
  .get(isAuthenticated, isAdmin, isValidId, getCategoryById)
  .put(isAuthenticated, isAdmin, isValidId, updateCategoryById)
  .delete(isAuthenticated, isAdmin, isValidId, deleteCategoryById);

//------------------------------------- Admin Product (CRUD);-------------------------------------------------//
router.route("/").get(createCategory).post(createCategory);
router.route("/:id").get(createCategory).put(createCategory).delete(createCategory);

export default router;