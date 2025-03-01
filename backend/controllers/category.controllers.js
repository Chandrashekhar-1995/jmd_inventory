import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

// Create category
export const createCategory = asyncHandler(async (req, res, next) => {
    const { categoryName, subcategories } = req.body;
    try {
        if (!categoryName) {
            throw new ApiError(400, "Category name is required.");
        }
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            throw new ApiError(409, "Category already exists.");
        }

        // Create the new category
        const category = new Category({
            categoryName,
            subcategories: subcategories || [],
        });
        await category.save();

        res.status(201).json(new ApiResponse(201, category, "Category created successfully."));
    } catch (err) {
        next(err);
    }
});

// Create sub category
export const createSubCategory = asyncHandler(async (req, res, next) => {
    const { categoryName, subCategory } = req.body;

    try {
        if (!categoryName || !subCategory) {
            throw new ApiError(400, "Category and Sub Category name is required.");
        }

        let category = await Category.findOne({ categoryName });

        if (!category) {
            throw new ApiError(404, "Category not found.");
        }

        // Duplicate check
        if (category.subcategories.includes(subCategory)) {
            throw new ApiError(400, "Subcategory already exists.");
        }

        category.subcategories.push(subCategory);
        await category.save();

        res.status(201).json(new ApiResponse(201, category, "Sub Category added successfully."));
    } catch (err) {
        next(err);
    }
});

// Get all categories
export const getAllCategories = asyncHandler(async (req, res, next) =>{
    try {
        const categories = await Category.find();
        res.status(200).json(new ApiResponse(200, {count:categories.length, categories}, "All categories fetched successfully."));
    } catch (err) {
        next(err);
    }
});

//Search category by id
export const searchCategoryById = asyncHandler(async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json(new ApiResponse(200, category, "Category fetched successfully."));
        
    } catch (err) {
        next(err);
    }
  });

// Update category
export const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { categoryName, subcategories } = req.body;
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new ApiError(404, "Category Not Found");
        }

        if (categoryName) {
            category.categoryName = categoryName;
        }

        // Add new subcategories without removing old ones
        if (subcategories && Array.isArray(subcategories)) {
            subcategories.forEach(subCategory => {
                if (!category.subcategories.includes(subCategory)) {
                    category.subcategories.push(subCategory);
                }
            });
        }

        await category.save(); // Save updated category

        res.status(200).json(new ApiResponse(200, category, "Category successfully updated with new subcategories."));
    } catch (err) {
        next(err);
    }
});


// Delete category
export const deleteCategory = asyncHandler(async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        res.status(200).json(new ApiResponse(200, {}, "Category deleted."));
        
    } catch (err) {
        next(err);
    }
  });

// Delete sub category
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { subCategory } = req.body;

    try {
        if (!subCategory) {
            throw new ApiError(400, "Sub Category name is required.");
        }

        let category = await Category.findById(id);
        if (!category) {
            throw new ApiError(404, "Category not found.");
        }

        // Find the index of the subcategory in the array
        const subcategoryIndex = category.subcategories.indexOf(subCategory);
        if (subcategoryIndex === -1) {
            throw new ApiError(400, "Subcategory not found.");
        }

        // Remove subcategory from the array
        category.subcategories.splice(subcategoryIndex, 1);
        await category.save();

        res.status(200).json(new ApiResponse(200, category, "Sub Category deleted successfully."));
    } catch (err) {
        next(err);
    }
});



//   // Delete sub category
// export const deleteSubCategory = asyncHandler(async (req, res, next) => {
//     const { categoryName, subCategory } = req.body;

//     try {
//         if (!categoryName || !subCategory) {
//             throw new ApiError(400, "Category and Sub Category name is required.");
//         }

//         let category = await Category.findOne({ categoryName });

//         if (!category) {
//             throw new ApiError(404, "Category not found.");
//         }

//         // Check if subcategory exists
//         const subcategoryIndex = category.subcategories.indexOf(subCategory);
//         if (subcategoryIndex === -1) {
//             throw new ApiError(400, "Subcategory not found.");
//         }

//         // Remove subcategory from the array
//         category.subcategories.splice(subcategoryIndex, 1);
//         await category.save();

//         res.status(200).json(new ApiResponse(200, category, "Sub Category deleted successfully."));
//     } catch (err) {
//         next(err);
//     }
// });
