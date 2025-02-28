import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { createProduct } from "../controllers/product.controllers.js";

const productRouter = express.Router();

productRouter.post("/create", protect, createProduct);

export default productRouter;