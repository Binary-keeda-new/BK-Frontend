import mongoose from 'mongoose';
import QuizQuestion from './quizQuestion.model.js';
import Quiz from '../quiz/quiz.model.js';
import Question from '../question/question.model.js';

const validateQuizExists = async (quizId) => {
  const quiz = await Quiz.findOne({ _id: quizId, isDeleted: false });
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  return quiz;
};

const normalizeStringArray = (arr = []) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => String(item).trim()).filter(Boolean);
};

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const createManualQuizQuestion = async ({
  quizId,
  question,
  questionType,
  options = [],
  correctOptions = [],
  positiveMarks = 4,
  negativeMarks = 1,
  imageUrl = null,
  createdBy = null,
}) => {
  await validateQuizExists(quizId);

  const normalizedOptions = normalizeStringArray(options);
  const normalizedCorrectOptions = normalizeStringArray(correctOptions);

  const quizQuestion = await QuizQuestion.create({
    quizId,
    sourceType: 'manual',
    sourceQuestionId: null,
    question,
    questionType,
    options: normalizedOptions,
    correctOptions: normalizedCorrectOptions,
    positiveMarks,
    negativeMarks,
    imageUrl,
    createdBy,
  });

  return quizQuestion;
};

export const importQuestionsFromBankToQuiz = async ({
  quizId,
  questionIds = [],
  createdBy = null,
}) => {
  await validateQuizExists(quizId);

  if (!Array.isArray(questionIds) || questionIds.length === 0) {
    throw new Error('questionIds are required');
  }

  const validIds = questionIds.map((id) => new mongoose.Types.ObjectId(id));

  const bankQuestions = await Question.find({
    _id: { $in: validIds },
    isDeleted: false,
  });

  if (!bankQuestions.length) {
    throw new Error('No valid question bank questions found');
  }

  const payload = bankQuestions.map((item) => ({
    quizId,
    sourceType: 'bank',
    sourceQuestionId: item._id,
    question: item.question,
    options: item.options || [],
    correctOptions: item.correctOptions || [],
    positiveMarks: item.positiveMarks,
    negativeMarks: item.negativeMarks,
    questionType: item.questionType,
    imageUrl: item.imageUrl || null,
    createdBy,
  }));

  return QuizQuestion.insertMany(payload);
};

export const getQuizQuestions = async (quizId) => {
  await validateQuizExists(quizId);

  const questions = await QuizQuestion.find({ quizId }).lean();

  return shuffle(
    questions.map((q) => ({
      ...q,
      options: q.questionType === 'NAT' ? q.options : shuffle(q.options || []),
    }))
  );
};

export const getQuizQuestionById = async (id) => {
  const quizQuestion = await QuizQuestion.findById(id);

  if (!quizQuestion) {
    throw new Error('Quiz question not found');
  }

  return quizQuestion;
};

export const updateQuizQuestion = async ({
  id,
  question,
  questionType,
  options,
  correctOptions,
  positiveMarks,
  negativeMarks,
  imageUrl,
  updatedBy = null,
}) => {
  const quizQuestion = await QuizQuestion.findById(id);

  if (!quizQuestion) {
    throw new Error('Quiz question not found');
  }

  if (question !== undefined) quizQuestion.question = question;
  if (questionType !== undefined) quizQuestion.questionType = questionType;
  if (options !== undefined) {
    quizQuestion.options = normalizeStringArray(options);
  }
  if (correctOptions !== undefined) {
    quizQuestion.correctOptions = normalizeStringArray(correctOptions);
  }
  if (positiveMarks !== undefined) {
    quizQuestion.positiveMarks = positiveMarks;
  }
  if (negativeMarks !== undefined) {
    quizQuestion.negativeMarks = negativeMarks;
  }
  if (imageUrl !== undefined) {
    quizQuestion.imageUrl = imageUrl;
  }

  quizQuestion.updatedBy = updatedBy;

  await quizQuestion.save();
  return quizQuestion;
};

export const deleteQuizQuestion = async ({ id }) => {
  const quizQuestion = await QuizQuestion.findByIdAndDelete(id);

  if (!quizQuestion) {
    throw new Error('Quiz question not found');
  }

  return { message: 'Quiz question deleted successfully' };
};

export const bulkDeleteQuizQuestions = async ({ ids = [] }) => {
  if (!Array.isArray(ids) || !ids.length) {
    throw new Error('ids array is required');
  }

  const validIds = ids.map((id) => new mongoose.Types.ObjectId(id));

  const result = await QuizQuestion.deleteMany({
    _id: { $in: validIds },
  });

  return {
    message: 'Quiz questions deleted successfully',
    deletedCount: result.deletedCount,
  };
};

