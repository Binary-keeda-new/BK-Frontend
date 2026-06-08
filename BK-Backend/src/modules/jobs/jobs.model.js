import mongoose from "mongoose";

const stageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "released"],
      default: "pending",
    },
    link: {
      type: String,
      trim: true,
      default: null,
    },
    releasedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["private", "government"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    applyLink: {
      type: String,
      required: true,
      trim: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    stages: {
      type: [stageSchema],
      default: undefined,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

// Indexes
jobSchema.index({ lastUpdated: -1 });
jobSchema.index({ type: 1, createdAt: 1 });

// ✅ FIXED EXPORT
export default mongoose.model("Job", jobSchema);