import { Router } from "express";

import {
  scanTicket
} from "../controllers/scanController.js";

import {
  requireAuth,
  requireRole
} from "../middleware/authMiddleware.js";

import {
  requireFields
} from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/",
  requireAuth,
  requireRole(
    "admin",
    "scanner"
  ),
  requireFields("token"),
  scanTicket
);

export default router;