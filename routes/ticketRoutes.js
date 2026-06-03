import { Router } from "express";

import {
  createTicket
} from "../controllers/ticketController.js";

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
    "organizer"
  ),
  requireFields(
    "eventId",
    "attendeeName",
    "attendeeEmail"
  ),
  createTicket
);

export default router;