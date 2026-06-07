import mongoose from "mongoose";

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema(
  {
    descopeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;