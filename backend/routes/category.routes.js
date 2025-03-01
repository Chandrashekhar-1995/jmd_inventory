import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { createCategory, createSubCategory, deleteCategory, deleteSubCategory, getAllCategories, searchCategoryById, updateCategory } from "../controllers/category.controllers.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", protect, createCategory);
categoryRouter.post("/create/sub-category", protect, createSubCategory);
categoryRouter.get("/all", protect, getAllCategories);
categoryRouter.get("/search/:id", protect, searchCategoryById);
categoryRouter.put("/update/:id", protect, updateCategory);
categoryRouter.delete("/delete/:id", protect, deleteCategory);
categoryRouter.delete("/delete/sub-category/:id", protect, deleteSubCategory);


export default categoryRouter;