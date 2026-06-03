import { Router } from "express";

import {
  register,
  login,
  me,
  logout
} from "../controllers/authController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

import { requireFields } from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/register",
  requireFields(
    "name",
    "email",
    "password"
  ),
  register
);

router.post(
  "/login",
  requireFields(
    "email",
    "password"
  ),
  login
);

router.get(
  "/me",
  requireAuth,
  me
);

router.post(
  "/logout",
  requireAuth,
  logout
);

export default router;