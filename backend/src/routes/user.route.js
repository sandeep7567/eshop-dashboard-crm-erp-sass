import { Router } from "express";
import {
  login,
  registerUser,
  logout,
  deleteUser,
  getUserByID,
  getUserProfile,
  getAllUsers,
  updateUser,
  updateUserProfile
} from "../controllers/user.controller.js";

import {
  isAuthenticated,
  isAdmin
} from "../middlewares/auth.middlewares.js"

const router = Router();

router.route("/login").post(login);

// Admin Private login route
// router.route("/admin/login").post(login);

router.route("/register").post(registerUser);
router.route("/logout").post(isAuthenticated, logout);

//---------------------------Controll By Self User Account By Verify Through Token-----------------------------//
router.route("/profile").get(getUserProfile).put(updateUserProfile);

// ----------------------------------- Admin Route -----------------------------------------------------------//
router.route("/users").get(isAuthenticated, isAdmin, getAllUsers);
router.route("/user/:id").get(getUserByID).put(updateUser).delete(deleteUser);

export default router;