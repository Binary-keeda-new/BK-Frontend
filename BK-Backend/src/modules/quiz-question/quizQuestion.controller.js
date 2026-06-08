import mongoose from 'mongoose';
import * as quizQuestionService from './quizQuestion.service.js';

export const createManualQuizQuestion = async (req, res) => {
  try {
    const { quizId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz id',
      });
    }

    const quizQuestion = await quizQuestionService.createManualQuizQuestion({
      ...req.body,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Quiz question created successfully',
      data: quizQuestion,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const importQuestionsFromBankToQuiz = async (req, res) => {
  try {
    const { quizId, questionIds = [] } = req.body;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz id',
      });
    }

    const invalidQuestionId = questionIds.find(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );

    if (invalidQuestionId) {
      return res.status(400).json({
        success: false,
        message: 'One or more question ids are invalid',
      });
    }

    const result = await quizQuestionService.importQuestionsFromBankToQuiz({
      ...req.body,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Questions imported successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuizQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz id',
      });
    }

    const result = await quizQuestionService.getQuizQuestions(quizId);

    return res.status(200).json({
      success: true,
      message: 'Quiz questions fetched successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuizQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz question id',
      });
    }

    const result = await quizQuestionService.getQuizQuestionById(id);

    return res.status(200).json({
      success: true,
      message: 'Quiz question fetched successfully',
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz question id',
      });
    }

    const result = await quizQuestionService.updateQuizQuestion({
      id,
      ...req.body,
      updatedBy: req.user?._id || null,
    });

    return res.status(200).json({
      success: true,
      message: 'Quiz question updated successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz question id',
      });
    }

    const result = await quizQuestionService.deleteQuizQuestion({
      id,
      updatedBy: req.user?._id || null,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const bulkDeleteQuizQuestions = async (req, res) => {
  try {
    const { ids = [] } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'ids array is required',
      });
    }

    const invalidId = ids.find((id) => !mongoose.Types.ObjectId.isValid(id));

    if (invalidId) {
      return res.status(400).json({
        success: false,
        message: 'One or more quiz question ids are invalid',
      });
    }

    const result = await quizQuestionService.bulkDeleteQuizQuestions({ ids });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};