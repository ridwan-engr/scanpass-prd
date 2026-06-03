import { Ticket } from "../models/Ticket.js";
import { ScanLog } from "../models/Scanlog.js";

import {
  verifyQrToken,
  hashToken
} from "../services/qrService.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const scanTicket = asyncHandler(
  async (req, res) => {
    const { token } = req.body;

    const payload =
      verifyQrToken(token);

    const tokenHash =
      hashToken(token);

    const ticket =
      await Ticket.findOne({
        code: payload.code
      });

    if (!ticket) {
      await ScanLog.create({
        eventId: payload.eventId,
        scannerId: req.user._id,
        status: "invalid"
      });

      throw new ApiError(
        404,
        "Invalid ticket."
      );
    }

    if (
      ticket.qrHash !== tokenHash
    ) {
      await ScanLog.create({
        ticketId: ticket._id,
        eventId: ticket.eventId,
        scannerId: req.user._id,
        status: "invalid"
      });

      throw new ApiError(
        401,
        "QR code validation failed."
      );
    }

    if (
      ticket.status === "used"
    ) {
      await ScanLog.create({
        ticketId: ticket._id,
        eventId: ticket.eventId,
        scannerId: req.user._id,
        status: "already-used"
      });

      throw new ApiError(
        409,
        "Ticket already used."
      );
    }

    ticket.status = "used";

    ticket.checkedInAt =
      new Date();

    await ticket.save();

    await ScanLog.create({
      ticketId: ticket._id,
      eventId: ticket.eventId,
      scannerId: req.user._id,
      status: "valid"
    });

    res.status(200).json({
      success: true,
      message:
        "Access Granted",
      attendee:
        ticket.attendeeName
    });
  }
);