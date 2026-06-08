import UserQuizService from "./user.quiz.service.js";

class UserQuizController {
  static async getQuizzes(req, res, next) {
    try {
      const { category, subcategory } = req.query;

      const quizzes = await UserQuizService.getPublishedQuizzes({
        category,
        subcategory,
      });

      return res.status(200).json({
        success: true,
        message: "Quizzes fetched successfully",
        data: quizzes,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getQuizById(req, res, next) {
    try {
      const { quizId } = req.params;

      const quiz = await UserQuizService.getPublishedQuizById(quizId);

      return res.status(200).json({
        success: true,
        message: "Quiz fetched successfully",
        data: quiz,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserQuizController;