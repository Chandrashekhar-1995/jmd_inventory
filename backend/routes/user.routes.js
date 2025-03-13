import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { getAllUsers, logout, registerUser, signIn } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", signIn);
userRouter.get("/all", getAllUsers);
userRouter.post("/logout", protect, logout);

export default userRouter;