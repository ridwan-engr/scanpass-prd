import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    venue: {
      type: String,
      required: true
    },

    startsAt: {
      type: Date,
      required: true
    },

    endsAt: {
      type: Date,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Event = mongoose.model(
  "Event",
  eventSchema
);