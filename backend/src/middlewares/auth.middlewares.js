import { isValidObjectId } from "mongoose";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { JWT_ERROR_MESSAGE, Role } from "../constant.js";
import { asyncHandler } from "../utils/asyncHandler.js";

dotenv.config();
const { JWT_EXPIRE } = JWT_ERROR_MESSAGE;

const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {

    const token = req.cookies?.token

    if (!token ) {
      throw new ApiError(401, "Unauthorized request", true);
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_JWT_SECRET);
    if (!decodedToken) {
      throw new ApiError(401, "jwt Token Expired token", true);
    };

    const user = await User.findById(decodedToken?._id).select(
      "-password"
    );

    if (user && user.isLoggedIn === 0) {
      throw new ApiError(401, "Invalid access token", true);
    }

    const session = user.loggedSessions.some(session => session === token)
    
    if (user && session) {
      req.user = user;
      next();
    } else {
      throw new ApiError(401, "Session expired', please try again", true);
    }
  } catch (error) {
    // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
    // Then they will get a new access token which will allow them to refresh the access token without logging out the user
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }
  if (req.user?.role === Role.ADMIN_ACCOUNT_ACCESS && req.user?.isAdmin) {
    next();
  } else {
    throw new ApiError(403, "You are not allowed to perform this action");
  }
});

const isAdminLogin = asyncHandler(async (req, res, next) => {
  const admin = await User.findOne({ email: req.body.email }).select("-password -loggedSessions");
  if (!admin) {
    throw new ApiError(404, "login with Admin account --> case-1");
  } else if (admin.isLoggedIn) {
    throw new ApiError(404, "login with Admin account --> case-2");
  } else if (admin.role !== Role.ADMIN_ACCOUNT_ACCESS) {
    throw new ApiError(404, "login with Admin account only --> case-3");
  } else if (!admin.isAdmin) {
    throw new ApiError(404, "login with Admin account only --> case-4");
  } else {
    req.adminId = admin._id;
    next();
  }
});

const isValidId = asyncHandler(async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
});

export {
  isAuthenticated,
  isAdmin,
  isAdminLogin,
  isValidId,
};