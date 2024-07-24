import mongoose from "mongoose";
import { env } from "./env";
import Logging from "../utils/Logging";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URL, {
      retryWrites: true,
      w: "majority",
    });
    console.log(`Connected to MongoDB at ${env.MONGODB_URL}`);
  } catch (error) {
    Logging.error(`Unable to establish Database Connection: ${error}`);
    throw error;
  }
}
