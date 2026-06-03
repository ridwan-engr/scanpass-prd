import { Router } from "express";

import {
  eventReport
} from "../controllers/reportController.js";

import {
  requireAuth,
  requireRole
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/:eventId",
  requireAuth,
  requireRole(
    "admin",
    "organizer"
  ),
  eventReport
);

export default router;