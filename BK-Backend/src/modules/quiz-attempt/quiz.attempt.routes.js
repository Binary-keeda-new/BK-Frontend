import express from 'express';
import QuizAttemptController from './quiz.attempt.controller.js';
import { verifyDescope } from '../../core/middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/quizzes/:quizId/attempts',
  verifyDescope,
  QuizAttemptController.startAttempt
);

router.get(
  "/quiz-attempts",
  verifyDescope,
  QuizAttemptController.getUserAttempts
);

router.get(
  "/quiz-attempts/status",
  verifyDescope,
  QuizAttemptController.getAttemptStatuses
);

router.patch(
  '/quiz-attempts/:attemptId/answer',
  verifyDescope,
  QuizAttemptController.saveAnswer
);

router.post(
  '/quiz-attempts/:attemptId/submit',
  verifyDescope,
  QuizAttemptController.submitAttempt
);

router.get(
  '/quiz-attempts/:attemptId',
  verifyDescope,
  QuizAttemptController.getAttempt
);

router.get(
  '/quiz-attempts/:attemptId/result',
  verifyDescope,
  QuizAttemptController.getResult
);


export default router;