import express from "express";
import UserQuizController from "./user.quiz.controller.js";

const router = express.Router();

router.get("/", UserQuizController.getQuizzes);
router.get("/:quizId", UserQuizController.getQuizById);

export default router;