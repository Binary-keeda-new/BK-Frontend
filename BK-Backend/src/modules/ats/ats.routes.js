import express from 'express';
import multer from 'multer';
import { verifyDescope } from '../../core/middlewares/auth.middleware.js';
import { validateATSRequest } from './ats.validator.js';
import { standardAnalysis, aiAnalysis } from './ats.controller.js';

const router = express.Router();


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});


router.post(
  '/standard',
  verifyDescope,
  upload.single('resume'),
  validateATSRequest,
  standardAnalysis
);


router.post(
  '/ai',
  verifyDescope,
  upload.single('resume'),
  validateATSRequest,
  aiAnalysis
);

export default router;
