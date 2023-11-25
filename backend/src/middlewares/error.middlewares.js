import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if the error is an instance of an ApiError class which extends native Error class
  if (!(error instanceof ApiError)) {
    // if not
    // create a new ApiError instance to keep the consistency

    // assign an appropriate status code
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Now we are sure that the `error` variable will be an instance of ApiError class
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  // removeUnusedMulterImageFilesOnError(req);

  // Send error response
  return res.status(error.statusCode).json(response);
};

export { errorHandler };


// err.statusCode = err.statusCode || 500;
// err.message = err.message || "Internal server error";

// // wrong mongodb id error
// if (err.name === "CastError") {
//   const message = `Resource not found with id of ${err.path}}`;
//   err = new ApiError(404, message);
// }

// // Duplicate key error
// if (err.name === 11000) {
//   const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
//   err = new ApiError(401, message);
// }

// // wrong jwt error
// if (err.name === "JsonWebTokenError") {
//   const message = "Invalid JWT token, please log in again";
//   err = new ApiError(401, message);
// }

// res.status(err.statusCode).json({
//   success: false,
//   message: err.message
// });