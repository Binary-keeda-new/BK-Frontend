import express from 'express';
import * as controller from './blogs.controller.js';
import { idParamRule } from './blogs.validator.js';

const router = express.Router();

router.get('/',    controller.listBlogs);
router.get('/:id', idParamRule, controller.getBlog);

export default router;