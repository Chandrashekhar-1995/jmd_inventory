import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        trim:true,
        unique: true,
    }
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
