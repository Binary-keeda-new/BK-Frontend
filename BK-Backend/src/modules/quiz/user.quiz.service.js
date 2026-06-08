import mongoose from "mongoose";
import Quiz from "./quiz.model.js";

class UserQuizService {
  static async getPublishedQuizzes({ category, subcategory }) {
    const now = new Date();

    const query = {
      status: "published",
      isDeleted: false,
      $and: [
        {
          $or: [{ startAt: null }, { startAt: { $exists: false } }, { startAt: { $lte: now } }],
        },
        {
          $or: [{ endAt: null }, { endAt: { $exists: false } }, { endAt: { $gte: now } }],
        },
      ],
    };

    if (category) {
      query.category = category;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    const quizzes = await Quiz.find(query)
      .select(
        "title description instructions category subcategory duration totalMarks numberOfQuestions passingMarks startAt endAt createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return quizzes;
  }

  static async getPublishedQuizById(quizId) {
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      const error = new Error("Invalid quizId");
      error.statusCode = 400;
      throw error;
    }

    const now = new Date();

    const quiz = await Quiz.findOne({
      _id: quizId,
      status: "published",
      isDeleted: false,
      $and: [
        {
          $or: [{ startAt: null }, { startAt: { $exists: false } }, { startAt: { $lte: now } }],
        },
        {
          $or: [{ endAt: null }, { endAt: { $exists: false } }, { endAt: { $gte: now } }],
        },
      ],
    })
      .select(
        "title description instructions category subcategory duration totalMarks numberOfQuestions passingMarks startAt endAt createdAt"
      )
      .lean();

    if (!quiz) {
      const error = new Error("Quiz not found");
      error.statusCode = 404;
      throw error;
    }

    return quiz;
  }
}

export default UserQuizService;