import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import { errorHandler, routeNotFound } from "./middlewares/errorHandler.middleware.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));

app.get("/", (req, res) => {
  res.send(`<h1>WELCOME TO JMD MOBILE SHOP </h1>`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/invoice", invoiceRoutes);

app.use("/*", routeNotFound);
app.use(errorHandler);

// Connect to database and start server
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server due to database connection issues", err);
  });