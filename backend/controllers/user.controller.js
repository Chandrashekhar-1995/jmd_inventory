import { validateSignupData } from "../middlewares/auth.Middleware.js";
import User from "../models/user.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { findUser } from "../utils/dbHelpers.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, mobileNumber, address, password, department } = req.body;

  try {
      validateSignupData(req)
      
      // Check for duplicate email or mobile number
      const existingUser = await findUser(email) || await findUser(mobileNumber);
      if (existingUser) {
        return res.status(400).json({ message: 'Email or mobile number already exists.' });
      }
  
    const user = new User({
      name,
      email,
      mobileNumber,
      address,
      password,
      department,
    });

    await user.save()

    const createdUser = await User.findById(user._id).select( "-password");

    res.status(201).json(
      new ApiResponse(
          201,
          createdUser,
          "User registered successfully."
      )
    );
  } catch (err) {
    next(err);
  }
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;

  try {
    const user = await findUser(identifier);
    if (!user) {
      throw new ApiError(404, "User not found.");
      }

    // Validate password using the schema method
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const token = generateToken(res, user._id);
    res.cookie("token", token);
    res.status(200).json(
      new ApiResponse(200, user, `User logged in successfully.`)
    );
  } catch (err) {
    next(err);
  }
});