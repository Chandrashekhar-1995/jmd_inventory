import validator from "validator";
import { ApiError } from "../utils/ApiError.js";

export const validateSignupData = (req) => {
    const { name, email, mobileNumber, address, password } = req.body;

    // Validate required fields
    if (!name?.trim() || !mobileNumber?.trim() || !address?.trim()) {
        throw new ApiErrorError(400, "All fields are required: name, mobileNumber, and address.");
    }

    // Validate email
    if (!email || !validator.isEmail(email)) {
        throw new ApiError(400, `Invalid email address: ${email || "Email undefined"}`);
    }

    // Validate password strength
    if (!password || !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new ApiError(400, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.");
    }
};