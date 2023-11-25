import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { Role } from "../constant.js";
import { asyncHandler } from "../utils/asyncHandler.js";

dotenv.config();

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "") || "";

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_JWT_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password"
    );

    if (user && user.isLoggedIn === 0) {
      throw new ApiError(401, "Invalid access token");
    }
    
    const session = user.loggedSessions.some(session => session === token)
    if (user && session) {
      req.user = user;
      next();
    } else {
      throw new ApiError(401, "Session expired', please try again");
    }
  } catch (error) {
    // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
    // Then they will get a new access token which will allow them to refresh the access token without logging out the user
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
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