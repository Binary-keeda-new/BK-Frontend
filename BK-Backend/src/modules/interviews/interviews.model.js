import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Fresher", "Experienced"],
      required: true,
    },
    rounds: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    result: {
      type: String,
      enum: ["Selected", "Rejected", "Pending"],
      default: "Pending",
    },
    postedAt: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

interviewSchema.index({ createdAt: -1 });

export default mongoose.model("Interview", interviewSchema);