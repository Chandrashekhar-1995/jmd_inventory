import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, routeNotFound } from "./utils/errorHandler.js";

app.get("/", (req, res) => {
  res.send(`<h1>WELCOME TO NODE JS </h1>`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRoutes);

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