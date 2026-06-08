import express from "express";
import * as controller from "./jobs.controller.js";
import {
  createJobRules,
  updateJobRules,
  idParamRule,
} from "./jobs.validator.js";

import { verifyDescope } from "../../core/middlewares/auth.middleware.js";
import roleMiddleware from "../../core/middlewares/role.middleware.js";
import { ROLES } from "../../core/utils/constants.js";

const router = express.Router();

// All routes below this require login
router.use(verifyDescope);

// All routes below this require admin role
router.use(roleMiddleware(ROLES.ADMIN));

router.get("/", controller.listJobs);
router.post("/", createJobRules, controller.createJob);
router.put("/:id", updateJobRules, controller.updateJob);
router.delete("/:id", idParamRule, controller.deleteJob);

export default router;
