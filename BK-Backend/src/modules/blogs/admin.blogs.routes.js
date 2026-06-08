import express from "express";
import * as controller from "./blogs.controller.js";
import {
  createBlogRules,
  updateBlogRules,
  idParamRule,
} from "./blogs.validator.js";

import { verifyDescope } from "../../core/middlewares/auth.middleware.js";
import roleMiddleware from "../../core/middlewares/role.middleware.js";
import { ROLES } from "../../core/utils/constants.js";

const router = express.Router();

// All routes below this line require login
router.use(verifyDescope);

// All routes below this line require admin role
router.use(roleMiddleware(ROLES.ADMIN));

router.get("/", controller.adminListBlogs);
router.post("/", createBlogRules, controller.createBlog);
router.put("/:id", updateBlogRules, controller.updateBlog);
router.delete("/:id", idParamRule, controller.deleteBlog);

export default router;