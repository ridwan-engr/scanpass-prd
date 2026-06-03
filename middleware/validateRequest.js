import { ApiError } from "../utils/ApiError.js";

export function requireFields(
  ...fields
) {
  return (req, res, next) => {
    const missing =
      fields.filter((field) => {
        const value =
          req.body[field];

        return (
          value === undefined ||
          value === null ||
          (typeof value ===
            "string" &&
            value.trim() === "")
        );
      });

    if (missing.length) {
      return next(
        new ApiError(
          400,
          `Missing required field(s): ${missing.join(
            ", "
          )}`
        )
      );
    }

    next();
  };
}