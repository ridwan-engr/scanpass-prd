import { Router } from "express";

import {
  createEvent,
  listEvents,
  getEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

import {
  requireAuth,
  requireRole
} from "../middleware/authMiddleware.js";

import {
  requireFields
} from "../middleware/validateRequest.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  listEvents
);

router.get(
  "/:eventId",
  requireAuth,
  getEvent
);

router.post(
  "/",
  requireAuth,
  requireRole(
    "admin",
    "organizer"
  ),
  requireFields(
    "name",
    "venue",
    "startsAt",
    "endsAt"
  ),
  createEvent
);

router.patch(
  "/:eventId",
  requireAuth,
  requireRole(
    "admin",
    "organizer"
  ),
  updateEvent
);

router.delete(
  "/:eventId",
  requireAuth,
  requireRole(
    "admin",
    "organizer"
  ),
  deleteEvent
);

export default router;