import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
        orderNumber: {
            type: String,
            required: true,
            unique: true,
        },
        approvedData: {
            reqBy: { type: String },
            approvedBy: { type: String },
            comment: { type: String },
        },
        requisitionSteps: {
            type: String,
            required: [true, "please choose the type of Requisition"],
            enum: {
            values: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
            },
        },
        date: {
            type: Date,
            default: Date.today,
        },
        dueDate: {
            type: Date,
            default: Date.today,
        },
        placeOfSupply:{
            type: String,
            default:"Uttar Pradesh",
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
        customerName: {
            type: String,
        },
        mobileNumber: {
            type: Number,
        },
        address: {
            type: String,
        },
        items: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                productName: {
                    type:String,
                },
                itemCode: {
                    type:String,
                },
                unit:{
                    type:String
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                salePrice: {
                    type: Number,
                    required: true,
                },
                mrp:{
                    type:Number
                },
                discount: {
                    type: Number,
                    default: 0,
                },
                tax:{
                    type:Number
                },
                cess:{
                    type:Number
                },
                total: {
                    type: Number,
                    required: true,
                },
                itemDescription: {
                    type: String,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        advanceAmount: {
            type: Number,
        },
        paymentMode: {
            type: String,
            required: [true, "Please choose payment mode"],
            enum: {
              values: ["Cash", "Phone Pay"],
            },
        },
        paymentAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        dueAmount:{
            type:Number
        },
        privateNote: {
            type: String,
            max: 500,
        },
        customerNote: {
            type: String,
            max: 500,
        }, 
        deliveryTerm: {
            type: String,
            max: 500,
        },
        deliveredAt: {
           type: Date,
        },
        isReceived: {
            type: Boolean,
            required: true,
            default: false,
        },
        receivedAt: {
          type: Date,
        },
        approvedStatusProcur: {
            paymentMethod: { type: String, default: "Cash" },
        },
        supplier: {
            type: String,
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
    );
const Order = mongoose.model("Order", orderSchema);
export default Order;
