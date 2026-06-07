import Quiz from "./quiz.model.js";
import QuizQuestion from "../quiz-question/quizQuestion.model.js";
import QuizAttempt from "../quiz-attempt/quiz.attempt.model.js";

const createQuiz = async (payload) => {
  return await Quiz.create(payload);
};

const updateQuizById = async (quizId, payload) => {
  const quiz = await Quiz.findOne({ _id: quizId, isDeleted: false });

  if (!quiz) {
    return null;
  }

  const nextStatus = payload.status ?? quiz.status;
  const nextNumberOfQuestions =
    payload.numberOfQuestions ?? quiz.numberOfQuestions;

  if (nextStatus === "published") {
    const questionCount = await QuizQuestion.countDocuments({ quizId });

    if (questionCount < nextNumberOfQuestions) {
      throw new Error(
        `Cannot publish quiz: ${questionCount} question(s) added, but ${nextNumberOfQuestions} required`
      );
    }
  }

  return await Quiz.findOneAndUpdate(
    { _id: quizId, isDeleted: false },
    payload,
    { returnDocument: "after" }
  );
};

const deleteQuizById = async (quizId) => {
  const quiz = await Quiz.findOne({ _id: quizId, isDeleted: false });

  if (!quiz) {
    return null;
  }

  const hasAttempts = await QuizAttempt.exists({ quizId });

  if (hasAttempts) {
    throw new Error(
      "Quiz cannot be deleted because it has already been attempted"
    );
  }

  await Quiz.findByIdAndDelete(quizId);
  await QuizQuestion.deleteMany({ quizId });

  return quiz;
};

const getQuizById = async (quizId) => {
  const quiz = await Quiz.findOne({ _id: quizId, isDeleted: false });

  if (!quiz) {
    return null;
  }

  const questions = await QuizQuestion.find({ quizId }).lean();

  return {
    ...quiz.toObject(),
    questions,
  };
};

const getAllQuizzes = async ({
  status,
  category,
  subcategory,
  search,
  page = 1,
  limit = 10,
}) => {
  const query = { isDeleted: false };

  if (status) query.status = status;
  if (category) query.category = category;
  if (subcategory) query.subcategory = subcategory;

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Quiz.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Quiz.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const previewQuizById = async (quizId) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    isDeleted: false,
  }).lean();

  if (!quiz) {
    return null;
  }

  const questions = await QuizQuestion.find({ quizId }).lean();

  const shuffledQuestions = shuffle(
    questions.map((q) => ({
      ...q,
      options: q.questionType === "NAT" ? q.options : shuffle(q.options || []),
    }))
  );

  return {
    ...quiz,
    questions: shuffledQuestions,
  };
};

export default {
  createQuiz,
  updateQuizById,
  deleteQuizById,
  getQuizById,
  getAllQuizzes,
  previewQuizById,
};