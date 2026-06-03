import { Event } from "../models/Event.js";
import { Ticket } from "../models/Ticket.js";
import { ScanLog } from "../models/Scanlog.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const eventReport =
  asyncHandler(
    async (req, res) => {
      const { eventId } =
        req.params;

      const event =
        await Event.findById(
          eventId
        );

      if (!event) {
        throw new ApiError(
          404,
          "Event not found."
        );
      }

      const totalTickets =
        await Ticket.countDocuments(
          {
            eventId
          }
        );

      const checkedIn =
        await Ticket.countDocuments(
          {
            eventId,
            status: "used"
          }
        );

      const activeTickets =
        await Ticket.countDocuments(
          {
            eventId,
            status: "active"
          }
        );

      const invalidAttempts =
        await ScanLog.countDocuments(
          {
            eventId,
            status: "invalid"
          }
        );

      const duplicateScans =
        await ScanLog.countDocuments(
          {
            eventId,
            status:
              "already-used"
          }
        );

      res.json({
        success: true,
        event,

        statistics: {
          totalTickets,
          checkedIn,
          activeTickets,
          invalidAttempts,
          duplicateScans,

          attendanceRate:
            totalTickets > 0
              ? Number(
                  (
                    (checkedIn /
                      totalTickets) *
                    100
                  ).toFixed(2)
                )
              : 0
        }
      });
    }
  );