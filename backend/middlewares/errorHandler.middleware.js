import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal Server Error";

    // check for specific errors
    if (err.name === "castError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Not Found resource";
    }


    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack || err);
    }

    // Send a consistent error response
    res.status(statusCode).json(
        new ApiResponse(
            statusCode,
            null, 
            message
        )
    );
};

export const routeNotFound = (req, res, next) => {
    res.status(404).json(
      new ApiResponse(
        404,
        null,
        `Route Not Found ${req.originalUrl}`
      )
    );
    next(error);
  };
