import express from "express";
import * as controller from "./jobs.controller.js";
import { idParamRule } from "./jobs.validator.js";

const router = express.Router();

// user/public
router.get("/", controller.listJobs);
router.get("/:id", idParamRule, controller.getJob);

export default router;