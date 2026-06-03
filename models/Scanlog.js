import mongoose from "mongoose";

const scanLogSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket"
    },

    scannerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },

    status: {
      type: String,
      enum: [
        "valid",
        "already-used",
        "expired",
        "invalid"
      ]
    },

    scanTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const ScanLog = mongoose.model(
  "ScanLog",
  scanLogSchema
);