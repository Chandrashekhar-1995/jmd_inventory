import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

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
