import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { allInvoiceFetch, createInvoice, invoiceFetchById, lastInvoiceFetch, updateInvoice } from "../controllers/invoice.controllers.js";

const invoiceRouter = express.Router();

invoiceRouter.post("/create", protect, createInvoice);
invoiceRouter.get("/last-invoice", protect, lastInvoiceFetch);
invoiceRouter.get("/all-invoice", protect, allInvoiceFetch);
invoiceRouter.get("/search/:id", protect, invoiceFetchById);
invoiceRouter.put("/update/:id", protect, updateInvoice);


export default invoiceRouter;