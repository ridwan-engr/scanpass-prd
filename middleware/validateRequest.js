import { ApiError } from "../utils/ApiError.js";

export function requireFields(...fields) {
  return (req, res, next) => {

    if (!req.body) {
      return next(
        new ApiError(
          400,
          "Request body is missing."
        )
      );
    }

    const missing = fields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
    );

    if (missing.length > 0) {
      return next(
        new ApiError(
          400,
          `Missing required field(s): ${missing.join(", ")}`
        )
      );
    }

    next();
  };
}