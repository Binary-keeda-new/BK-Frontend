// import { validationResult } from 'express-validator';
// import * as authService from '../services/auth.service.js';

// export const register = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;

//     const { user, token } = await authService.registerUser({
//       name,
//       email,
//       password,
//     });

//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     const { user, token } = await authService.loginUser({
//       email,
//       password,
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


import { validationResult } from 'express-validator';
import * as authService from '../services/auth.service.js';

// ─── Register ───────────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Login ──────────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const { user, token } = await authService.loginUser({ email, password });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Forgot Password ────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const result = await authService.forgotPassword({ email });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ─── Reset Password ─────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, email, newPassword } = req.body;
    const result = await authService.resetPassword({ token, email, newPassword });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};