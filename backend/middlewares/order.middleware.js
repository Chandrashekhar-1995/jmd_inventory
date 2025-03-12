import {ApiError} from "../utils/ApiError.js"

export const processItems = async (items) => {
    if (!items || items.length === 0) {
        throw new ApiError(400, "At least one item is required to create an invoice.");
    }

    let totalAmount = 0;
    const itemDetails = [];

    for (const item of items) {
        if (!item.productName || !item.quantity || !item.salePrice) {
            throw new ApiError(400, "Item name, quantity, and sale price are required for each item.");
        }

        // Calculate total for each item
        const itemTotal = item.quantity * item.salePrice;
        totalAmount += itemTotal;

        itemDetails.push({
            item: item._id,
            productName: item.productName,
            unit: item.unit,
            quantity: item.quantity,
            salePrice: item.salePrice,
            total:itemTotal,
            itemDescription: item.itemDescription,
        });
    }

    return { itemDetails, totalAmount };
};