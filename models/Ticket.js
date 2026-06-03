import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },

    attendeeName: {
      type: String,
      required: true
    },

    attendeeEmail: {
      type: String,
      required: true
    },

    code: {
      type: String,
      unique: true
    },

    qrHash: {
      type: String
    },

    status: {
      type: String,
      enum: ["active", "used", "cancelled"],
      default: "active"
    },

    checkedInAt: Date
  },
  {
    timestamps: true
  }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);