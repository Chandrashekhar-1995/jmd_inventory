import Invoice from "../models/invoice.model.js";
import Customer from "../models/customer.model.js";
import Account from "../models/account.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { processItems } from "../middlewares/invoice.middleware.js";

// Generate invoice number
export const generateInvoiceNumber = async () => {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    const lastNumber = lastInvoice ? parseInt(lastInvoice.invoiceNumber.split("-")[1]) : 0;
    return `INV-${(lastNumber + 1).toString().padStart(4, "0")}`;
};

// Create Invoice
export const createInvoice = asyncHandler(async (req, res, next) => {
    try {
        const {
            invoiceType,
            invoiceNumber,
            date,
            dueDate,
            placeOfSupply,
            billTo,
            customerId,
            customerName,
            mobileNumber,
            address,
            items,
            discountAmount,
            paymentDate,
            paymentMode,
            receivedAmount,
            type,
            transactionId,
            privateNote,
            customerNote,
            soldBy,
            deliveryTerm,
          } = req.body;

        if (!items || items.length === 0) {
            throw new ApiError(400, "Item details are required.");
        }     

        const finalCustomerId = billTo === "Cash" ? "67c81c9bcca8d1fd6423df5a" : customerId;
        const customer = await Customer.findById(finalCustomerId);
        if (!customer) {
            throw new ApiError(404, "Customer not found.");
        }


        const account = await Account.findOne({ accountName: paymentMode });
        if (!account) {
            throw new ApiError(404, `${paymentMode} Account not found, please create account first.`);
        }

        // Create the invoice (not saved yet)
        const newInvoice = new Invoice({
            invoiceType,
            invoiceNumber: invoiceNumber ? invoiceNumber : await generateInvoiceNumber(),
            date,
            dueDate,
            placeOfSupply,
            billTo,
            customer: finalCustomerId,
            customerName,
            mobileNumber,
            address,
            discountAmount,
            paymentAccount:account._id,
            paymentDate,
            privateNote,
            customerNote,
            deliveryTerm,
            soldBy: soldBy ? soldBy : req.user._id,
        });

        // Process items and get total amount
        const { itemDetails, totalAmount } = await processItems(items, newInvoice._id);

        newInvoice.items = itemDetails;
        newInvoice.totalAmount = totalAmount;
        newInvoice.totalPayableAmount = totalAmount - discountAmount;
        newInvoice.receivedAmount = receivedAmount;
        newInvoice.dueAmount = newInvoice.totalPayableAmount - receivedAmount;
        newInvoice.status = newInvoice.dueAmount === 0 
            ? "Paid" 
            : receivedAmount > 0 
                ? "Partially Paid" 
                : "Unpaid";

        // Save the invoice
        await newInvoice.save();

        // Update account balance (credit)
        account.balance = Number(account.balance) + Number(receivedAmount);
        account.transactions.push({
            type: type ? type : "Credit",
            amount:receivedAmount,
            description:"",
            date:paymentDate,
            referenceId:"",
            transactionId:transactionId,
            invoiceId:newInvoice._id,
            paymentMode:paymentMode,
        })
        await account.save();

        // Update customer's purchase history
        customer.purchaseHistory.push({
            invoiceId: newInvoice._id,
            date: newInvoice.date,
            totalAmount: newInvoice.totalPayableAmount,
        });
        customer.balance = (customer.balance || 0) + newInvoice.dueAmount;
        await customer.save();

        // Update user's sales history
        req.user.saleHistory.push({
            invoiceId: newInvoice._id,
            date: newInvoice.date,
            totalAmount: newInvoice.totalPayableAmount,
        });
        await req.user.save();

        res.status(201).json(new ApiResponse(201, { newInvoice }, "Invoice created successfully."));
    } catch (err) {
        next(err);
    }
});

// Endpoint to fetch the last invoice
export const lastInvoiceFetch = asyncHandler(async (req, res, next) =>{
    try {
        const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

        if (lastInvoice) {
            res.status(201).json(
                new ApiResponse(201, { lastInvoice }, "Invoice created successfully.")
            )
          } else {
            res.status(404).json({ message: 'No invoices found' });
          }
    } catch (err) {
        next(err);
    }
});

// Endpoint to fetch invoices
export const allInvoiceFetch = asyncHandler(async (req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {        
        const invoices = await Invoice.find().skip(skip).limit(limit);
        const total = await Invoice.countDocuments();
        if (invoices) {
            res.status(200).json(
                new ApiResponse(201, { invoices, total, page, limit }, "Invoice fetched successfully.")
            )
          } else {
            res.status(404).json({ message: 'No invoices found' });
          }
    } catch (err) {
        next(err);
    }
});

// Endpoint to fetch invoice by id
export const invoiceFetchById = asyncHandler(async (req, res, next) =>{
    try {        
        const invoice = await Invoice.findById(req.params.id);
        if (invoice) {
            res.status(200).json(
                new ApiResponse(201, { invoice }, "Invoice fetched successfully.")
            )
          } else {
            res.status(404).json({ message: 'No invoices found' });
          }
    } catch (err) {
        next(err);
    }
});

// update invoice by id
export const updateInvoice = asyncHandler(async (req, res, next) =>{
    try {        
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        new ApiResponse(201, { updatedInvoice }, "Invoice fetched successfully.")
    } catch (err) {
        next(err);
    }
});

