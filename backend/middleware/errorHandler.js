// middleware/errorHandler.js
import ApiResponse from "../utils/ApiResponse.js";
import dotenv from "dotenv";
dotenv.config()

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
  err.status = err.status || "internal server error - custom"; // Default to 'error' if not specified

  // Response for development environment
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json(
      ApiResponse.error(err.message, err.statusCode, {
        error: err, // Full error object for debugging
        stack: err.stack, // Stack trace for debugging
      })
    );
  }

  // Response for production environment
  if (process.env.NODE_ENV === "production") {
    // Operational errors: send detailed message
    if (err.isOperational) {
      return res
        .status(err.statusCode)
        .json(ApiResponse.error(err.message, err.statusCode));
    }

    // Non-operational errors (programming bugs or unexpected errors): generic message
    console.error("ERROR 💥", err); // Log the error for debugging
    return res
      .status(500)
      .json(ApiResponse.error("Something went wrong!", 500));
  }
};

export default errorHandler;