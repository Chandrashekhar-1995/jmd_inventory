import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { bulkUploadCustomers, createCustomer, deleteCustomer, getAllCustomers, downloadTemplate, searchCustomerById, updateCustomer } from "../controllers/customer.controllers.js";

const customerRouter = express.Router();

customerRouter.post("/create", protect, createCustomer);
customerRouter.get("/all", protect, getAllCustomers);
customerRouter.get("/:id", protect, searchCustomerById);
customerRouter.put("/update/:id", protect, updateCustomer);
customerRouter.delete("/delete/:id", protect, deleteCustomer);
customerRouter.get("/template", protect, downloadTemplate);
customerRouter.post("/bulk-upload", protect, upload.single("file"), bulkUploadCustomers);

export default customerRouter;