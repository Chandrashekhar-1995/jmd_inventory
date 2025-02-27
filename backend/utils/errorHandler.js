import { ApiResponse } from "./ApiResponse";

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
    const error = new Error(`Not Found ${req.originalUrl} route`);
  
    res.status(404).json(
      new ApiResponse(
        statusCode,
        null,
        message
      )
    );
    next(error);
  };