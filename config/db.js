import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  try {
    await mongoose.connect(
      env.mongodbUri
    );

    console.log(
      "MongoDB Connected Successfully"
    );
  } catch (error) {
    console.error(
      "Database Connection Failed",
      error
    );

    throw error;
  }
}