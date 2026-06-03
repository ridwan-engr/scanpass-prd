import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import { User } from "../models/User.js";

import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth =
  asyncHandler(async (req, res, next) => {
    const authorization =
      req.headers.authorization;

    if (
      !authorization?.startsWith(
        "Bearer "
      )
    ) {
      throw new ApiError(
        401,
        "Bearer token required"
      );
    }

    const token =
      authorization.slice(7);

    const payload = jwt.verify(
      token,
      env.jwtSecret
    );

    const user =
      await User.findById(
        payload.userId
      ).select("-passwordHash");

    if (!user) {
      throw new ApiError(
        401,
        "User not found"
      );
    }

    req.user = user;

    next();
  });

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ApiError(
          401,
          "Authentication required"
        )
      );
    }

    if (
      !roles.includes(req.user.role)
    ) {
      return next(
        new ApiError(
          403,
          "Permission denied"
        )
      );
    }

    next();
  };
}