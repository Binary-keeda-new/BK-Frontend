import express from 'express';
import * as controller from './profile.controller.js';
import { verifyDescope } from '../../core/middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', verifyDescope, controller.getProfile);
router.post('/', verifyDescope, controller.createProfile);
router.put('/', verifyDescope, controller.upsertProfile);

export default router;
