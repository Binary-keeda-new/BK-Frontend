import express from "express";
import * as quizQuestionController from "./quizQuestion.controller.js";

import { verifyDescope } from "../../core/middlewares/auth.middleware.js";
import roleMiddleware from "../../core/middlewares/role.middleware.js";
import { ROLES } from "../../core/utils/constants.js";

const router = express.Router();

// All routes below this require login
router.use(verifyDescope);

// All routes below this require admin role
router.use(roleMiddleware(ROLES.ADMIN));

// Add manual question into quiz
router.post("/", quizQuestionController.createManualQuizQuestion);

// Import bank questions into quiz
router.post("/import", quizQuestionController.importQuestionsFromBankToQuiz);

// Get all questions of a quiz
router.get("/quiz/:quizId", quizQuestionController.getQuizQuestions);

// Bulk delete should come before "/:id"
router.delete("/bulk-delete", quizQuestionController.bulkDeleteQuizQuestions);

// Get single quiz question
router.get("/:id", quizQuestionController.getQuizQuestionById);

// Update quiz question
router.put("/:id", quizQuestionController.updateQuizQuestion);

// Delete quiz question
router.delete("/:id", quizQuestionController.deleteQuizQuestion);

export default router;