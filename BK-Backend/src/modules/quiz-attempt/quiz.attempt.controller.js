import QuizAttemptService from "./quiz.attempt.service.js";
import User from "../user/user.model.js";

async function getMongoUserIdFromRequest(req) {
  const descopeId = req.user?.sub;

  if (!descopeId) {
    const error = new Error("Invalid user");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findOne({ descopeId }).select("_id").lean();

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user._id;
}

class QuizAttemptController {
  static async startAttempt(req, res, next) {
    try {
      const { quizId } = req.params;
      const userId = await getMongoUserIdFromRequest(req);

      const attempt = await QuizAttemptService.startQuizAttempt({
        quizId,
        userId,
      });

      return res.status(201).json({
        success: true,
        message: "Quiz attempt started successfully",
        data: attempt,
      });
    } catch (error) {
      next(error);
    }
  }

  static async saveAnswer(req, res, next) {
    try {
      const { attemptId } = req.params;
      const { questionId, selectedOptions } = req.body;
      const userId = await getMongoUserIdFromRequest(req);

      const attempt = await QuizAttemptService.saveAnswer({
        attemptId,
        userId,
        questionId,
        selectedOptions,
      });

      return res.status(200).json({
        success: true,
        message: "Answer saved successfully",
        data: attempt,
      });
    } catch (error) {
      next(error);
    }
  }

  static async submitAttempt(req, res, next) {
    try {
      const { attemptId } = req.params;
      const userId = await getMongoUserIdFromRequest(req);

      const attempt = await QuizAttemptService.submitQuizAttempt({
        attemptId,
        userId,
      });

      return res.status(200).json({
        success: true,
        message: "Quiz submitted successfully",
        data: attempt,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAttempt(req, res, next) {
    try {
      const { attemptId } = req.params;
      const userId = await getMongoUserIdFromRequest(req);

      const attempt = await QuizAttemptService.getAttemptById({
        attemptId,
        userId,
      });

      return res.status(200).json({
        success: true,
        message: "Quiz attempt fetched successfully",
        data: attempt,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getResult(req, res, next) {
    try {
      const { attemptId } = req.params;
      const userId = await getMongoUserIdFromRequest(req);

      const result = await QuizAttemptService.getAttemptResult({
        attemptId,
        userId,
      });

      return res.status(200).json({
        success: true,
        message: "Quiz result fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAttemptStatuses(req, res, next) {
    try {
      const descopeId = req.user?.sub;
      const quizIdsParam = req.query.quizIds || "";

      const quizIds = String(quizIdsParam)
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      const data = await QuizAttemptService.getAttemptStatuses({
        descopeId,
        quizIds,
      });

      return res.status(200).json({
        success: true,
        message: "Attempt statuses fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserAttempts(req, res, next) {
  try {
    const userId = await getMongoUserIdFromRequest(req);

    const attempts = await QuizAttemptService.getUserAttempts({
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "User attempts fetched successfully",
      data: attempts,
    });
  } catch (error) {
    next(error);
  }
}
}

export default QuizAttemptController;