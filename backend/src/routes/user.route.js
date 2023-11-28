import { Router } from "express";
import {
  adminLogin,
  createUser,
  login,
  registerUser,
  logout,
  deleteUserById,
  getUserByID,
  getUserProfile,
  getAllUsers,
  updateUserById,
  updateUserProfile
} from "../controllers/user.controller.js";

import {
  isAuthenticated,
  isAdmin,
  isAdminLogin,
  isValidId
} from "../middlewares/auth.middlewares.js"

const router = Router();

router.route("/admin/login").post(isAdminLogin, adminLogin);
router.route("/login").post(login);

// Admin Private login route
// router.route("/admin/login").post(login);

router.route("/register").post(registerUser);
router.route("/logout/:userId").post(logout);

//---------------------------Controll By Self User Account By Verify Through Token-----------------------------//
router.route("/profile")
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUserProfile);

// ----------------------------------- Customer/Users Creatd (CRUD) By Admin Routes; -----------------------------------------------------------//
router.route("/user")
  .get(isAuthenticated, isAdmin, getAllUsers)
  .post(isAuthenticated, isAdmin, createUser);
  router.route("/user/:id")
    .get(isAuthenticated, isAdmin, isValidId, getUserByID)
    .put(isAuthenticated, isAdmin, isValidId, updateUserById)
    .delete(isAuthenticated, isAdmin, isValidId, deleteUserById);

export default router;