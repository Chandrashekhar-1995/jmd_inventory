import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import xlsx from "xlsx";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { asyncHandler } from "../utils/asynchandler.js";
import { findUserOrCustomer } from "../utils/dbHelpers.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcryptjs";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Customer
export const createCustomer = asyncHandler(async (req, res, next) => {
  const {
    name,
    contactNumber,
    mobileNumber,
    address,
    city,
    state,
    pinCode,
    country,
    email,
    avatar,
    gender,
    panNo,
    gstin,
    gstType,
    tradeName,
    dateOfBirth,
    marrigeAniversary,
    bio,
    remark,
    designation,
    refreshToken,
    purchaseHistory,
    accountType,
    balance,
    creditAllowed,
    creditLimit,
    loyaltyPoints,
    refferedBy,
    documentType,
    documentNo,
  } = req.body;

  try {
      if (!name || !mobileNumber || !address ) {
          throw new ApiError(
              400,
              "Name, Mobile Number and Address are required."
          );
      }

      // Check for duplicate email or mobile number 
    const existingUser = await findUserOrCustomer(email) || await findUserOrCustomer(mobileNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile number already exists.' });
    }


    const salt = await bcrypt.genSalt(10); 
    const hashPassword = await bcrypt.hash("ShekharMobiles9@", salt);


    // Create new customer
    const customer = new Customer({
        name,
        contactNumber,
        mobileNumber,
        address,
        password :hashPassword,
        city,
        state,
        pinCode,
        country,
        email : email ? email : undefined,
        avatar,
        gender,
        panNo,
        gstin,
        gstType,
        tradeName,
        dateOfBirth,
        marrigeAniversary,
        bio,
        remark,
        designation,
        refreshToken,
        purchaseHistory,
        accountType,
        balance,
        creditAllowed,
        creditLimit,
        loyaltyPoints,
        refferedBy,
        documentType,
        documentNo,
    });
    await customer.save();

    const createdCustomer = await Customer.findById(customer._id).select(
        "-password"
    );

    res.status(201).json(
        new ApiResponse(
            201,
            createdCustomer,
            "Customer Created successfully."
        )
    );
} catch (err) {
    next(err);
}
});

// Get all products
export const getAllCustomers = asyncHandler(async (req, res, next) =>{
    try {
        const allProducts = await Product.find({});

        res.status(200).json(new ApiResponse(200, {count:allProducts.length, allProducts}, "Fetched all products successfully."));
    } catch (err) {
        next(err);
    }
});

//Search product by id
export const searchCustomerById = asyncHandler(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(new ApiResponse(200, product, "Product fetched successfully."));
        
    } catch (err) {
        next(err);
    }
  });

// Update product
export const updateCustomer = asyncHandler(async (req, res, next) =>{
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
            throw new ApiError(404, "Product Not Found");
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

        res.status(200).json(new ApiResponse(200, updatedProduct, "Fetched all products successfully."));
    } catch (err) {
        next(err);
    }
});

// Delete product
export const deleteCustomer = asyncHandler(async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.status(200).json(new ApiResponse(200, {}, "Product deleted."));
        
    } catch (err) {
        next(err);
    }
  });

// Downolad template
export const downloadTemplate = asyncHandler(async (req, res, next) => {
    try {
        const headers = [
            { field: "productName", label: "Product Name *", required: true },
            { field: "itemCode", label: "Item Code", required: false },
            { field: "brand", label: "Brand *", required: true },
            { field: "category", label: "Category *", required: true },
            { field: "subcategory", label: "Subcategory", required: false },
            { field: "purchasePrice", label: "Purchase Price *", required: true },
            { field: "salePrice", label: "Sale Price *", required: true },
            { field: "minSalePrice", label: "Min Sale Price", required: false },
            { field: "mrp", label: "MRP", required: false },
            { field: "unit", label: "Unit *", required: true, dropdown: ["UNT", "PCS", "NOS", "MTR", "BOX"] },
            { field: "hsnCode", label: "HSN Code", required: false },
            { field: "gstRate", label: "GST Rate", required: false },
            { field: "saleDiscount", label: "Sale Discount", required: false },
            { field: "lowLevelLimit", label: "Low Level Limit", required: false },
            { field: "serialNumber", label: "Serial Number", required: false },
            { field: "description", label: "Description", required: false },
            { field: "warranty", label: "Warranty", required: false },
            { field: "location", label: "Location", required: false },
            { field: "stockQuantity", label: "OpeningStock", required: false },
        ];

        const workbook = new ExcelJS.Workbook();
        const templateSheet = workbook.addWorksheet("Template");
        const instructionSheet = workbook.addWorksheet("Instructions");

        // Add headers to the template sheet
        const headerRow = templateSheet.addRow(headers.map((header) => header.label));
        headerRow.eachCell((cell, colNumber) => {
            const header = headers[colNumber - 1];
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: header.required ? "FFA500" : "D3D3D3" },
            };
            cell.font = { bold: true };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            templateSheet.getColumn(colNumber).width = Math.max(15, header.label.length + 5);
        });
        templateSheet.getRow(headerRow.number).height = 40;

        // Add instructions to the second sheet
        instructionSheet.addRow(["Field Name", "Required/Optional", "Description/Example"]);
        headers.forEach((header) => {
            instructionSheet.addRow([
                header.label,
                header.required ? "Required" : "Optional",
                header.dropdown ? `Allowed values: ${header.dropdown.join(", ")}` : "Free text",
            ]);
        });
        instructionSheet.getRow(1).eachCell((cell, colNumber) => {
            cell.font = { bold: true };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "CCCCCC" },
            };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            instructionSheet.getColumn(colNumber).width = Math.max(15, cell.model.value.length + 5);
        });
        instructionSheet.getRow(1).height = 40;

        const filePath = path.join(__dirname, "../uploads/product-template.xlsx");
        await workbook.xlsx.writeFile(filePath);

        res.download(filePath, "product-template.xlsx", (err) => {
            if (err) next(err);
            fs.unlinkSync(filePath);
        });
    } catch (err) {
        next(err);
    }
});

// Bulk upload
export const bulkUploadCustomers = asyncHandler(async (req, res, next) => {
    try {
        if (!req.file) {
            throw new ApiError(400, "No file uploaded. Please upload an Excel or CSV file.");
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const headerMapping = {
            "Product Name *": "productName",
            "Item Code" : "itemCode",
            "Brand *": "brand",
            "Category *": "category",
            "Subcategory": "subcategory",
            "Purchase Price *": "purchasePrice",
            "Sale Price *": "salePrice",
            "Min Sale Price": "minSalePrice",
            "MRP" : "mrp",
            "Unit *": "unit",
            "HSN Code": "hsnCode",
            "GST Rate": "gstRate",
            "Sale Discount": "saleDiscount",
            "Low Level Limit": "lowLevelLimit",
            "Serial Number" : "serialNumber",
            "Description" : "description",
            "Warranty": "warranty",
            "Location" : "location",
            "OpeningStock": "stockQuantity",
            // "Print Description": "printDescription",
            // "Print Serial No": "printSerialNo",
            // "One Click Sale": "oneClickSale",
            // "Enable Tracking": "enableTracking",
        };

        const requiredFields = ["productName", "brand", "category", "purchasePrice", "salePrice", "unit"];

        const products = [];
        const skippedProducts = [];

        for (const row of data) {
            const product = {};
            for (const [templateHeader, dbField] of Object.entries(headerMapping)) {
                product[dbField] = row[templateHeader] || null;
            }

            const missingFields = requiredFields.filter((field) => !product[field]);
            if (missingFields.length > 0) {
                skippedProducts.push({ row, reason: `Missing fields: ${missingFields.join(", ")}` });
                continue;
            }

            const existingProduct = await Product.findOne({ productName: product.productName.toLowerCase() });
            if (existingProduct) {
                skippedProducts.push({ row, reason: "Product already exists" });
                continue;
            }

            let brandDoc = await Brand.findOne({ brandName: product.brand });
            if (!brandDoc) {
                brandDoc = new Brand({ brandName: product.brand });
                await brandDoc.save();
            }

            let categoryDoc = await Category.findOne({ categoryName: product.category.toLowerCase() });
            if (!categoryDoc) {
                // Create a new category if it doesn't exist
                categoryDoc = new Category({
                    categoryName: product.category.toLowerCase(),
                    subcategories: product.subcategory ? [product.subcategory] : [],
                });
                await categoryDoc.save();
            } else {
                // Update the existing category with a new subcategory if it doesn't already exist
                if (product.subcategory && !categoryDoc.subcategories.includes(product.subcategory)) {
                    categoryDoc.subcategories.push(product.subcategory);
                    await categoryDoc.save();
                }
            }

            products.push({
                ...product,
                brand: brandDoc._id,
                category: categoryDoc._id,
                stockQuantity: product.stockQuantity || 0,
            });
        }

        const insertedProducts = await Product.insertMany(products);
        fs.unlinkSync(req.file.path);

        res.status(201).json(new ApiResponse(201, { insertedProducts, skippedProducts }, "Upload completed."));

    } catch (err) {
        if (req.file && req.file.path) fs.unlinkSync(req.file.path);
        next(err);
    }
  });