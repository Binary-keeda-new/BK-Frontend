// import bcrypt from 'bcryptjs';
// import User from '../models/user.model.js';
// import generateToken from '../utils/generateToken.js';

// export const registerUser = async ({ name, email, password }) => {
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     const error = new Error('Email already in use');
//     error.statusCode = 400;
//     throw error;
//   }

//   const salt = await bcrypt.genSalt(10);
//   const passwordHash = await bcrypt.hash(password, salt);

//   const user = await User.create({
//     name,
//     email,
//     passwordHash,
//   });

//   const token = generateToken(user._id);

//   return { user, token };
// };

// export const loginUser = async ({ email, password }) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     const error = new Error('Invalid email or password');
//     error.statusCode = 401;
//     throw error;
//   }

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     const error = new Error('Invalid email or password');
//     error.statusCode = 401;
//     throw error;
//   }

//   const token = generateToken(user._id);

//   return { user, token };
// };










import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Resend } from 'resend';
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

// Initialize Resend
// const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Register ───────────────────────────────────────────────
export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already in use');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, passwordHash });
  const token = generateToken(user._id);

  return { user, token };
};

// ─── Login ──────────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);
  return { user, token };
};

// ─── Forgot Password ────────────────────────────────────────
export const forgotPassword = async ({ email }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('No account found with this email');
    error.statusCode = 404;
    throw error;
  }

  // Generate & hash reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save();

  // Send reset email
  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}&email=${email}`;

  await resend.emails.send({
    from: 'Emple <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your Emple password',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;">
        <h2>Password Reset Request</h2>
        <p>Click the button below to reset your password. This link expires in <strong>30 minutes</strong>.</p>
        <a href="${resetUrl}"
          style="background:#f97316;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:16px 0;">
          Reset Password
        </a>
        <p style="color:#888;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  return { message: 'Reset link sent to your email' };
};

// ─── Reset Password ─────────────────────────────────────────
export const resetPassword = async ({ token, email, newPassword }) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error('Invalid or expired reset token');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  return { message: 'Password reset successful' };
};


