import express from "express";
import quizController from "./admin.quiz.controller.js";
import {
  validateCreateQuiz,
  validateUpdateQuiz,
} from "./admin.quiz.validator.js";

import { verifyDescope } from "../../core/middlewares/auth.middleware.js";
import roleMiddleware from "../../core/middlewares/role.middleware.js";
import { ROLES } from "../../core/utils/constants.js";

const router = express.Router();

// All routes below this require login
router.use(verifyDescope);

// All routes below this require admin role
router.use(roleMiddleware(ROLES.ADMIN));

router.post("/", validateCreateQuiz, quizController.createQuiz);
router.get("/", quizController.getAllQuizzes);

// Keep more specific GET routes before generic dynamic routes
router.get("/:quizid/preview", quizController.previewQuiz);
router.get("/:quizid", quizController.getSingleQuiz);

router.put("/:quizid", validateUpdateQuiz, quizController.updateQuiz);
router.delete("/:quizid", quizController.deleteQuiz);

export default router;