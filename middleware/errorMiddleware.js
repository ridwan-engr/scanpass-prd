import{ApiError}from"../utils/ApiError.js";

export function notFoundHandler(
  req,
  res,
  next
) {
  next(
    new ApiError(
      404,
      `Route not found: ${req.method} ${req.originalUrl}`
    )
  );
}


export function errorHandler(
  error, 
  req, 
  res, 
  next
) {
  const statusCode = error.statusCode || 500;

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: Object.values(error.errors)[0]?.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Invalid resource id",
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      error: "Duplicate resource",
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
    });
  }


  return res.status(statusCode).json({
    error: error.message || "Internal Server Error",
  });
}