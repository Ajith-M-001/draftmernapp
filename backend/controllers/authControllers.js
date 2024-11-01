import User from "../model/userSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const signup = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the user already exists, send an error response
      return res
        .status(400)
        .json(ApiResponse.error("User with this email already exists.", 400));
    }

    // Send success response
    return res.status(201).json(
      ApiResponse.success(
        { fullname, email, password }, // You might want to exclude the password
        "User registered successfully",
        201
      )
    );
  } catch (error) {
    // Handle any other errors that occur during the signup process
    next(new ApiError(500, "An error occurred during registration.")); // Create a custom error
  }
};
