import express from "express";

import {
  createQuestionBank,
  getAllQuestionBanks,
  getQuestionBankById,
  updateQuestionBank,
  deleteQuestionBank,
} from "./questionBank.controller.js";

import {
  validateCreateQuestionBank,
  validateUpdateQuestionBank,
} from "./questionBank.validator.js";

import {
  getQuestionBankQuestions,
  createQuestionBankQuestions,
  updateQuestionBankQuestion,
  deleteQuestionBankQuestion,
} from "../question/question.controller.js";

import { verifyDescope } from "../../core/middlewares/auth.middleware.js";
import roleMiddleware from "../../core/middlewares/role.middleware.js";
import { ROLES } from "../../core/utils/constants.js";

const router = express.Router();

router.use(verifyDescope);
router.use(roleMiddleware(ROLES.ADMIN));

router.post("/", validateCreateQuestionBank, createQuestionBank);
router.get("/", getAllQuestionBanks);
router.get("/:id", getQuestionBankById);
router.put("/:id", validateUpdateQuestionBank, updateQuestionBank);
router.delete("/:id", deleteQuestionBank);

router.get("/:id/questions", getQuestionBankQuestions);
router.post("/:id/questions", createQuestionBankQuestions);
router.put("/:id/questions/:questionId", updateQuestionBankQuestion);
router.delete("/:id/questions/:questionId", deleteQuestionBankQuestion);

export default router;