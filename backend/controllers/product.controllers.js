import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import xlsx from "xlsx";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Product
export const createProduct = asyncHandler(async (req, res, next) => {
  const {
      productName,
      itemCode,
      brand,
      category,
      subcategory,
      purchasePrice,
      salePrice,
      minSalePrice,
      mrp,
      openingStock,
      unit,
      hsnCode,
      gstRate,
      saleDiscount,
      lowLevelLimit,
      serialNumber,
      productImage,
      description,
      warranty,
      location,
      printDescription,
      oneClickSale,
      enableTracking,
      printSerialNo,
      notForSale,
  } = req.body;

  try {
      if (!productName || !brand || !category || !purchasePrice || !salePrice) {
          throw new ApiError(
              400,
              "Product name, brand, category, purchase price and sale price are required."
          );
      }

       // Check for duplicate itemCode
       if(itemCode){
          const existingItemCode = await Product.findOne({ itemCode: itemCode.trim().toLowerCase() });
          if (existingItemCode) {
            throw new ApiError(400, `A product with the item code '${itemCode}' already exists.`);
          }
       }
    

      // Ensure brand exists or create a new brand
      let existingBrand = await Brand.findOne({ brandName: brand.trim() });
      if (!existingBrand) {
          existingBrand = new Brand({ brandName: brand.trim() });
          await existingBrand.save();
      }

      // Ensure category and subcategory exist or create them
      let existingCategory = await Category.findOne({ categoryName: category.trim().toLowerCase() });
      if (!existingCategory) {
          existingCategory = new Category({
              categoryName: category.trim().toLowerCase(),
              subcategories: subcategory ? [subcategory.trim()] : [],
          });
          await existingCategory.save();
      } else if (subcategory) {
          // Add subcategory if not already present
          if (!existingCategory.subcategories.includes(subcategory.trim())) {
              existingCategory.subcategories.push(subcategory.trim());
              await existingCategory.save();
          }
      }

      // Ensure product name is unique
      const existingProduct = await Product.findOne({ productName: productName.trim().toLowerCase() });
      if (existingProduct) {
          throw new ApiError(400, "A product with the same name already exists.");
      }

      // Create the new product
      const product = new Product({
          user: req.user._id,
          productName: productName.trim().toLowerCase(),
          itemCode: itemCode ? itemCode.trim().toLowerCase() : undefined,
          brand: existingBrand._id,
          category: existingCategory._id,
          subcategory: subcategory ? subcategory.trim() : undefined,
          purchasePrice,
          salePrice,
          minSalePrice,
          mrp,
          unit,
          stockQuantity: openingStock || 0,
          hsnCode,
          gstRate,
          saleDiscount,
          lowLevelLimit: lowLevelLimit || undefined,
          serialNumber,
          productImage,
          description: description || undefined,
          warranty: warranty || undefined,
          location: location || undefined,
          printDescription,
          oneClickSale,
          enableTracking,
          printSerialNo,
          notForSale,
      });

      await product.save();

      res.status(201).json(new ApiResponse(201, product, "Product created successfully."));
  } catch (err) {
      next(err);
  }
});

// Get all products
export const getAllProducts = asyncHandler(async (req, res, next) =>{
    try {
        const allProducts = await Product.find({});

        res.status(200).json(new ApiResponse(200, {count:allProducts.length, allProducts}, "Fetched all products successfully."));
    } catch (err) {
        next(err);
    }
});

//Search product by id
export const searchProductById = asyncHandler(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(new ApiResponse(200, product, "Product fetched successfully."));
        
    } catch (err) {
        next(err);
    }
  });

// Update product
export const updateProduct = asyncHandler(async (req, res, next) =>{
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
export const deleteProduct = asyncHandler(async (req, res, next) => {
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
export const bulkUploadProduct = asyncHandler(async (req, res, next) => {
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