import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Password Reset Fields
    resetPasswordToken: {
     type: String,
     default: null,
},
      resetPasswordExpire: {
      type: Date,
       default: null,
},
  },
  {
    timestamps: true,
  }
);

// Instance method to compare password
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

export default User;