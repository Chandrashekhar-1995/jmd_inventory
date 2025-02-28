import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    subcategories: [
        {
            type: String,
            trim: true,
        },
    ],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
