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

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      isAdmin: user.isAdmin,
      procurement: user.procurement,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("invalid Email And Password !!");
  }
});