import express from "express";
import * as controller from "./interviews.controller.js";
import { createInterviewRules, idParamRule } from "./interviews.validator.js";

const router = express.Router();

router.get("/", controller.listInterviews);
router.get("/:id", idParamRule, controller.getInterview);
router.post("/", createInterviewRules, controller.createInterview);

export default router;