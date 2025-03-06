import Order from "../models/order.modal.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Account from "../models/account.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { processItems } from "../middlewares/invoice.middleware.js";

// Generate invoice number
const generateOrderNumber = async () => {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const lastNumber = lastOrder ? parseInt(lastOrder.orderNumber.split("-")[1]) : 0;
    return `Ord-${(lastNumber + 1).toString().padStart(4, "0")}`;
};


// Create Order
export const newOrder = asyncHandler(async (req, res, next) => {
    const { 
        orderType,
        orderNumber,
        approvedData,
        requisitionSteps,
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
        privateNote,
        customerNote,
        receivedAmount,
        deliveryTerm,
        isDelivered,
        deliveredAt,
        isReceived,
        receivedAt,
        } = req.body;
    try {
        if (!items || items.length === 0) {
            throw new ApiError(400, "Item details are required.");
        }     

        const finalCustomerId = billTo === "Cash" ? "67c81c9bcca8d1fd6423df5a" : customerId;
        const customer = await Customer.findById(finalCustomerId);
        if (!customer) {
            throw new ApiError(404, "Customer not found.");
        };

        const account = await Account.findOne({ accountName: paymentMode });
        if (!account) {
            throw new ApiError(404, `${paymentMode} Account not found, please create account first.`);
        }

        // Create the invoice (not saved yet)
        const newOrder = new Order({
            orderType,
            orderNumber :orderNumber ? orderNumber : await generateOrderNumber(),
            approvedData,
            requisitionSteps,
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
            isDelivered,
            deliveredAt,
            isReceived,
            receivedAt,
            soldBy: soldBy ? soldBy : req.user._id,
        });

        // Process items and get total amount
        const { itemDetails, totalAmount } = await processItems(items, newOrder._id);

        newOrder.items = itemDetails;
        newOrder.totalAmount = totalAmount;
        newOrder.totalPayableAmount = totalAmount - discountAmount;
        newOrder.receivedAmount = receivedAmount;
        newOrder.dueAmount = newOrder.totalPayableAmount - receivedAmount;
        newOrder.status = newOrder.dueAmount === 0 
            ? "Paid" 
            : receivedAmount > 0 
                ? "Partially Paid" 
                : "Unpaid";

        // Save the invoice
        await newOrder.save();

        res.status(201).json(new ApiResponse(201, newOrder, "Order created successfully."));
    } catch (err) {
        next(err);
    }
});

// fetch all orders
export const allOrders = asyncHandler(async (req, res, next) => {
    try {
        const orders = await Order.find({})
        .sort("-createdAt")
        .populate("user", "name email dept");  

        res.status(201).json(new ApiResponse(201, orders, "all orders fetched successfully."));
    } catch (err) {
        next(err);
    }
});

// fetch my orders
export const myOrders = asyncHandler(async (req, res, next) =>{
    try {
        const myOrders = await Order.find({ user: req.user._id }).sort("-createdAt");

        res.status(200).json(new ApiResponse(200, myOrders, "All my orders fetched successfully."));
    } catch (err) {
        next(err);
    }
});

// remove order
export const removeOrder = asyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new ApiError(404, "No Order found with this ID");
        }

        await Order.deleteOne({ _id: order._id });

        res.status(200).json(new ApiResponse(200, {}, "Order removed Succesfuly ..."));
    } catch (err) {
        next(err);
    }
});

// get order details
export const orderDetails = asyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
          );

        res.status(200).json(new ApiResponse(200, order, "Order fetched successfully."));
        
    } catch (err) {
        next(err);
    }
  });

// Update order
export const updateOrder = asyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new ApiError(404, "No Order Found in this Order Id");
        }

        order.orderItems.forEach(async (item) =>{
            const product = await Product.findById(item?.product.toString());
            
            if (!product) {
                throw new ApiError(404, "Product Not Found");
            }

            // Ensure  to Decre the Stock
            product.stock = product.stock - item.qty;

            await product.save({ validateBeforeSave: true });
        })
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(new ApiResponse(200, updatedOrder, "Order updated successfully."));
    } catch (err) {
        next(err);
    }
});

// update order procurement
export const updateOrderProcurement = asyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new ApiError(404, "No Order Found in this Order Id");
        }

        order.orderItems.forEach(async (item) =>{
            const product = await Product.findById(item?.product.toString());
            
            if (!product) {
                throw new ApiError(404, "Product Not Found");
            }

            // Ensure  to Increse the Stock
            product.stock = product.stock + item.qty;

            await product.save({ validateBeforeSave: true });
        });
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        order.isReceived = true;
        order.receivedAt = Date.now();
        const updatedOrder = await order.save();

        res.status(200).json(new ApiResponse(200, updatedOrder, "Order updated successfully."));
    } catch (err) {
        next(err);
    }
});

// update order received
export const updateOrderReceived = asyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new ApiError(404, "No Order Found in this Order Id");
        };

        order.isReceived = true;
        order.receivedAt = Date.now();
        const updatedOrder = await order.save();

        res.status(200).json(new ApiResponse(200, updatedOrder, "Update order receives."));
    } catch (err) {
        next(err);
    }
});

// update price supplier And More Field U want
export const updateOderItemPrice = asyncHandler(async (req, res, next) => {
    const itemId = req.params.itemId;
    const { newPrice, supplier } = req.body;
    try {
        const orderToUpdate = await Order.findOne({ "orderItems._id": itemId });
    
        if (!orderToUpdate) {
            throw new ApiError(404, "Order Not Found");
        };
    
        // Update the price and supplier of the specific order item
        orderToUpdate.orderItems.forEach(async (item) => {
          if (item._id.toString() === itemId) {
            item.price = newPrice;
            item.supplier = supplier || item.supplier;
    
            await orderToUpdate.save();
    
            // Find the updated order item
            const updatedOrderItem = orderToUpdate.orderItems.find(
              (item) => item._id.toString() === itemId
            );
    
            // Find the corresponding product and update its price
            const product = await Product.findById(item.product);
            if (product) {
              product.price = newPrice;
              product.supplier = supplier;
              await product.save();
            }
    
            res.status(200).json(new ApiResponse(200, updatedOrderItem, "Update order items."));
          }
        });
    
    }   catch (err) {
        next(err);
    }
});

