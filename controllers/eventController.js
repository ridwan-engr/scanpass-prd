import { Event } from "../models/Event.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Event
export const createEvent = asyncHandler(
  async (req, res) => {
    const {
      name,
      description,
      venue,
      startsAt,
      endsAt
    } = req.body;

    const startDate = new Date(startsAt);
    const endDate = new Date(endsAt);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      throw new ApiError(
        400,
        "Invalid event date."
      );
    }

    if (endDate <= startDate) {
      throw new ApiError(
        400,
        "End date must be later than start date."
      );
    }

    const event = await Event.create({
      name,
      description,
      venue,
      startsAt: startDate,
      endsAt: endDate,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });
  }
);

// List All Events
export const listEvents = asyncHandler(
  async (req, res) => {
    const events = await Event.find()
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        startsAt: 1
      });

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  }
);

// Get Single Event
export const getEvent = asyncHandler(
  async (req, res) => {
    const event = await Event.findById(
      req.params.eventId
    ).populate(
      "createdBy",
      "name email"
    );

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    res.status(200).json({
      success: true,
      event
    });
  }
);

// Update Event
export const updateEvent = asyncHandler(
  async (req, res) => {
    const event = await Event.findById(
      req.params.eventId
    );

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    const fields = [
      "name",
      "description",
      "venue",
      "startsAt",
      "endsAt"
    ];

    fields.forEach((field) => {
      if (
        req.body[field] !== undefined
      ) {
        event[field] =
          field.includes("At")
            ? new Date(req.body[field])
            : req.body[field];
      }
    });

    if (
      event.endsAt <= event.startsAt
    ) {
      throw new ApiError(
        400,
        "End date must be later than start date."
      );
    }

    await event.save();

    res.status(200).json({
      success: true,
      message:
        "Event updated successfully",
      event
    });
  }
);

// Delete Event
export const deleteEvent = asyncHandler(
  async (req, res) => {
    const event =
      await Event.findByIdAndDelete(
        req.params.eventId
      );

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Event deleted successfully"
    });
  }
);