import express from "express";
import { protect } from "../middlewares/auth.Middleware.js";
import { lastOrderFetch, newOrder, allOrders, myOrders, orderDetails, removeOrder, updateOrderReceived, updateOrder, updateOrderProcurement, updateOderItemPrice } from "../controllers/order.controllers.js";

const orderRouter = express.Router();

orderRouter.get("/last-order", protect, lastOrderFetch);
orderRouter.post("/create", protect, newOrder);
orderRouter.get("/", protect, allOrders);
orderRouter.get("/mine", protect, myOrders);
orderRouter.get("/search/:id", protect, orderDetails)
orderRouter.put("/update/receive/:id", protect, updateOrderReceived);
orderRouter.put("/updatestock/:id", protect, updateOrder);
orderRouter.put("/deliver/procur/:id", protect, updateOrderProcurement);
orderRouter.put("/updateItemPrice/:itemId", protect, updateOderItemPrice);
orderRouter.delete("/delete/:id", protect, removeOrder);

export default orderRouter;