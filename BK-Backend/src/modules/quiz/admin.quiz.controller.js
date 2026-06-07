import mongoose from "mongoose";
import quizService from "./admin.quiz.service.js";

const createQuiz = async (req, res, next) => {
  try {
    const {
      title,
      description,
      instructions,
      marks,
      numberOfQuestions,
      category,
      subcategory,
      status,
      duration,
      passingMarks,
      startAt,
      endAt,
    } = req.body;

    const payload = {
      title,
      description,
      instructions: instructions || "",
      category,
      subcategory,
      totalMarks: marks !== undefined ? Number(marks) : 0,
      numberOfQuestions:
        numberOfQuestions !== undefined ? Number(numberOfQuestions) : 0,
      status: status || "draft",
      duration: duration !== undefined ? Number(duration) : 0,
      passingMarks: passingMarks !== undefined ? Number(passingMarks) : 0,
      startAt: startAt || null,
      endAt: endAt || null,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    };

    const quiz = await quizService.createQuiz(payload);

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    const { quizid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const { marks, duration, passingMarks, numberOfQuestions, ...rest } = req.body;

    const payload = {
      ...rest,
      ...(marks !== undefined ? { totalMarks: Number(marks) } : {}),
      ...(duration !== undefined ? { duration: Number(duration) } : {}),
      ...(passingMarks !== undefined ? { passingMarks: Number(passingMarks) } : {}),
      ...(numberOfQuestions !== undefined
        ? { numberOfQuestions: Number(numberOfQuestions) }
        : {}),
      updatedBy: req.user?._id,
    };

    const quiz = await quizService.updateQuizById(quizid, payload);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const { quizid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await quizService.deleteQuizById(quizid);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSingleQuiz = async (req, res, next) => {
  try {
    const { quizid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await quizService.getQuizById(quizid);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz fetched successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

const getAllQuizzes = async (req, res, next) => {
  try {
    const { status, category, subcategory, search } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await quizService.getAllQuizzes({
      status,
      category,
      subcategory,
      search,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: "Quizzes fetched successfully",
      data: result.items,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const previewQuiz = async (req, res, next) => {
  try {
    const { quizid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await quizService.previewQuizById(quizid);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz preview fetched successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getSingleQuiz,
  getAllQuizzes,
  previewQuiz,
};