import express from "express";
import { registerUser, signIn } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", signIn);

export default userRouter;