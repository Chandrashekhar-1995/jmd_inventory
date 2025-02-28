import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { bulkUploadProduct, createProduct, deleteProduct, downloadTemplate, getAllProducts, searchProductById, updateProduct } from "../controllers/product.controllers.js";
import upload from "../middlewares/upload.middleware.js";

const productRouter = express.Router();

productRouter.post("/create", protect, createProduct);
productRouter.get("/all", protect, getAllProducts);
productRouter.get("/search/:id", protect, searchProductById);
productRouter.put("/update/:id", protect, updateProduct);
productRouter.delete("/delete/:id", protect, deleteProduct);
productRouter.get("/template", protect, downloadTemplate);
productRouter.post("/bulk-upload", protect, upload.single("file"), bulkUploadProduct);

export default productRouter;