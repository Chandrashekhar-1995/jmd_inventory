import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { logout, registerUser, signIn } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", signIn);
userRouter.post("/logout", protect, logout);

export default userRouter;