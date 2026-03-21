// import { Router } from 'express';
// import { body } from 'express-validator';
// import * as authController from '../controllers/auth.controller.js';

// const router = Router();

// // POST /api/auth/register
// router.post(
//   '/register',
//   [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Valid email is required'),
//     body('password')
//       .isLength({ min: 6 })
//       .withMessage('Password must be at least 6 characters'),
//   ],
//   authController.register
// );

// // POST /api/auth/login
// router.post(
//   '/login',
//   [
//     body('email').isEmail().withMessage('Valid email is required'),
//     body('password').notEmpty().withMessage('Password is required'),
//   ],
//   authController.login
// );

// export default router;

import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  authController.register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

// POST /api/auth/forgot-password
router.post(
  '/forgot-password',
  [
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  authController.forgotPassword
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  authController.resetPassword
);

export default router;