import { Ticket } from "../models/Ticket.js";
import { Event } from "../models/Event.js";

import {
  signQrToken,
  hashToken,
  createQrDataUrl
} from "../services/qrService.js";

import { generateTicketCode } from "../services/ticketCodeService.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTicket = asyncHandler(
  async (req, res) => {
    const {
      eventId,
      attendeeName,
      attendeeEmail
    } = req.body;

    const event =
      await Event.findById(eventId);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    const code =
      generateTicketCode();

    const token =
      signQrToken({
        eventId,
        attendeeEmail,
        code
      });

    const qrHash =
      hashToken(token);

    const qrImage =
      await createQrDataUrl(token);

    const ticket =
      await Ticket.create({
        eventId,
        attendeeName,
        attendeeEmail,
        code,
        qrHash
      });

    res.status(201).json({
      success: true,
      ticket,
      qrImage
    });
  }
);