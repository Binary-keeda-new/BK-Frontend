import mongoose from 'mongoose';
import Quiz from '../quiz/quiz.model.js';
import QuizQuestion from '../quiz-question/quizQuestion.model.js';
import QuizAttempt from './quiz.attempt.model.js';
import User from "../user/user.model.js";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeStringArray(arr = []) {
  return [...new Set(arr.map((item) => String(item).trim()))].sort();
}

function areArraysEqual(a = [], b = []) {
  const x = normalizeStringArray(a);
  const y = normalizeStringArray(b);

  if (x.length !== y.length) return false;
  return x.every((item, index) => item === y[index]);
}

function evaluateAnswer(question, selectedOptions = []) {
  const hasAnswer = selectedOptions.some((item) => String(item).trim() !== '');

  if (!hasAnswer) {
    return {
      isCorrect: false,
      marksAwarded: 0,
    };
  }

  if (question.questionType === 'MCQ' || question.questionType === 'MSQ') {
    const selected = normalizeStringArray(selectedOptions);
    const correct = normalizeStringArray(question.correctOptions || []);
    const isCorrect = areArraysEqual(selected, correct);

    return {
      isCorrect,
      marksAwarded: isCorrect
        ? Number(question.positiveMarks || 0)
        : -Number(question.negativeMarks || 0),
    };
  }

  if (question.questionType === 'NAT') {
    const submitted = String(selectedOptions?.[0] || '').trim();
    const correct = String(question.correctOptions?.[0] || '').trim();
    const isCorrect = submitted === correct;

    return {
      isCorrect,
      marksAwarded: isCorrect
        ? Number(question.positiveMarks || 0)
        : -Number(question.negativeMarks || 0),
    };
  }

  return {
    isCorrect: false,
    marksAwarded: 0,
  };
}

class QuizAttemptService {
  static async startQuizAttempt({ quizId, userId }) {
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    const error = new Error('Invalid quizId');
    error.statusCode = 400;
    throw error;
  }

  if (!userId) {
    const error = new Error('Invalid userId');
    error.statusCode = 400;
    throw error;
  }

  const quiz = await Quiz.findById(quizId).lean();
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    throw error;
  }

  if (quiz.isDeleted) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    throw error;
  }

  if (quiz.status !== 'published') {
    const error = new Error('Quiz is not available');
    error.statusCode = 400;
    throw error;
  }

  const now = new Date();

  if (quiz.startAt && now < new Date(quiz.startAt)) {
    const error = new Error('Quiz has not started yet');
    error.statusCode = 400;
    throw error;
  }

  if (quiz.endAt && now > new Date(quiz.endAt)) {
    const error = new Error('Quiz has already ended');
    error.statusCode = 400;
    throw error;
  }

  const existingAttempt = await QuizAttempt.findOne({ quizId, userId });
  if (existingAttempt) {
    return existingAttempt;
  }

  const questions = await QuizQuestion.find({ quizId }).lean();
  if (!questions.length) {
    const error = new Error('No questions found for this quiz');
    error.statusCode = 400;
    throw error;
  }

  const questionOrder = questions.map((question) => {
    const rawOptions = Array.isArray(question.options) ? question.options : [];

    return {
      questionId: question._id,
      optionsOrder:
        question.questionType === 'NAT' ? [] : shuffleArray(rawOptions),
    };
  });

  const expiresAt = quiz.duration
    ? new Date(Date.now() + quiz.duration * 60 * 1000)
    : null;

  try {
  const attempt = await QuizAttempt.create({
    quizId,
    userId,
    questionOrder,
    totalQuestions: questions.length,
    status: 'in_progress',
    startedAt: new Date(),
    expiresAt,
  });

  return attempt;
} catch (error) {
  if (error.code === 11000) {
    const existingAttempt = await QuizAttempt.findOne({ quizId, userId });

    if (existingAttempt) {
      return existingAttempt;
    }
  }

  throw error;
}
}

  static async saveAnswer({ attemptId, userId, questionId, selectedOptions }) {
    if (
      !mongoose.Types.ObjectId.isValid(attemptId) ||
      !mongoose.Types.ObjectId.isValid(questionId)
    ) {
      const error = new Error('Invalid attemptId or questionId');
      error.statusCode = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error('Invalid userId');
      error.statusCode = 400;
      throw error;
    }

    if (!Array.isArray(selectedOptions)) {
      const error = new Error('selectedOptions must be an array');
      error.statusCode = 400;
      throw error;
    }

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      userId,
    });

    if (!attempt) {
      const error = new Error('Quiz attempt not found');
      error.statusCode = 404;
      throw error;
    }

    if (attempt.status === 'submitted' || attempt.status === 'auto_submitted') {
      const error = new Error('Cannot update answers after submission');
      error.statusCode = 400;
      throw error;
    }

    if (attempt.expiresAt && new Date() > new Date(attempt.expiresAt)) {
      await this.submitQuizAttempt({ attemptId, userId, autoSubmit: true });

      const error = new Error('Time is over. Quiz auto-submitted');
      error.statusCode = 400;
      throw error;
    }

    const questionExistsInAttempt = attempt.questionOrder.some(
      (item) => item.questionId.toString() === questionId
    );

    if (!questionExistsInAttempt) {
      const error = new Error('Question does not belong to this attempt');
      error.statusCode = 400;
      throw error;
    }

    const question = await QuizQuestion.findById(questionId).lean();
    if (!question) {
      const error = new Error('Question not found');
      error.statusCode = 404;
      throw error;
    }

    if (question.questionType === 'MCQ' && selectedOptions.length > 1) {
      const error = new Error('Only one option can be selected for MCQ');
      error.statusCode = 400;
      throw error;
    }

    if (question.questionType === 'NAT' && selectedOptions.length > 1) {
      const error = new Error('NAT accepts only one answer');
      error.statusCode = 400;
      throw error;
    }

    const normalizedSelectedOptions = selectedOptions.map((item) =>
      String(item).trim()
    );

    const existingAnswer = attempt.answers.find(
      (answer) => answer.questionId.toString() === questionId
    );

    if (existingAnswer) {
      existingAnswer.selectedOptions = normalizedSelectedOptions;
    } else {
      attempt.answers.push({
        questionId,
        selectedOptions: normalizedSelectedOptions,
      });
    }

    await attempt.save();

    return attempt;
  }

  static async submitQuizAttempt({ attemptId, userId, autoSubmit = false }) {
    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      const error = new Error('Invalid attemptId');
      error.statusCode = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error('Invalid userId');
      error.statusCode = 400;
      throw error;
    }

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      userId,
    });

    if (!attempt) {
      const error = new Error('Quiz attempt not found');
      error.statusCode = 404;
      throw error;
    }

    if (attempt.status === 'submitted' || attempt.status === 'auto_submitted') {
      return attempt;
    }

    const questionIds = attempt.questionOrder.map((item) => item.questionId);

    const questions = await QuizQuestion.find({
      _id: { $in: questionIds },
    }).lean();

    const questionMap = new Map(
      questions.map((question) => [question._id.toString(), question])
    );

    let totalMarksObtained = 0;
    const finalAnswers = [];

    for (const qId of questionIds) {
      const question = questionMap.get(qId.toString());

      const existingAnswer = attempt.answers.find(
        (answer) => answer.questionId.toString() === qId.toString()
      );

      const selectedOptions = existingAnswer?.selectedOptions || [];

      if (!question) {
        finalAnswers.push({
          questionId: qId,
          selectedOptions,
          isCorrect: false,
          marksAwarded: 0,
        });
        continue;
      }

      const evaluation = evaluateAnswer(question, selectedOptions);

      totalMarksObtained += evaluation.marksAwarded;

      finalAnswers.push({
        questionId: qId,
        selectedOptions,
        isCorrect: evaluation.isCorrect,
        marksAwarded: evaluation.marksAwarded,
      });
    }

    attempt.answers = finalAnswers;
    attempt.totalMarksObtained = totalMarksObtained;
    attempt.status = autoSubmit ? 'auto_submitted' : 'submitted';
    attempt.submittedAt = new Date();

    await attempt.save();

    return attempt;
  }

  static async getAttemptById({ attemptId, userId }) {
    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      const error = new Error('Invalid attemptId');
      error.statusCode = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error('Invalid userId');
      error.statusCode = 400;
      throw error;
    }

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      userId,
    }).lean();

    if (!attempt) {
      const error = new Error('Quiz attempt not found');
      error.statusCode = 404;
      throw error;
    }

    const questionIds = attempt.questionOrder.map((item) => item.questionId);

    const questions = await QuizQuestion.find({
      _id: { $in: questionIds },
    })
      .select('question options questionType imageUrl positiveMarks negativeMarks')
      .lean();

    const questionMap = new Map(
      questions.map((question) => [question._id.toString(), question])
    );

    const orderedQuestions = attempt.questionOrder.map((item) => {
      const question = questionMap.get(item.questionId.toString());

      return {
        questionId: item.questionId,
        question: question?.question || null,
        questionType: question?.questionType || null,
        options:
          item.optionsOrder?.length > 0
            ? item.optionsOrder
            : question?.options || [],
        imageUrl: question?.imageUrl || null,
        positiveMarks: question?.positiveMarks || 0,
        negativeMarks: question?.negativeMarks || 0,
      };
    });

    return {
      _id: attempt._id,
      quizId: attempt.quizId,
      userId: attempt.userId,
      status: attempt.status,
      totalQuestions: attempt.totalQuestions,
      totalMarksObtained: attempt.totalMarksObtained,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      expiresAt: attempt.expiresAt,
      answers: attempt.answers,
      questions: orderedQuestions,
    };
  }

  static async getAttemptResult({ attemptId, userId }) {
    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      const error = new Error('Invalid attemptId');
      error.statusCode = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error('Invalid userId');
      error.statusCode = 400;
      throw error;
    }

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      userId,
    }).lean();

    if (!attempt) {
      const error = new Error('Quiz attempt not found');
      error.statusCode = 404;
      throw error;
    }

    if (attempt.status === 'in_progress') {
      const error = new Error('Result is available only after submission');
      error.statusCode = 400;
      throw error;
    }

    const questionIds = attempt.questionOrder.map((item) => item.questionId);

    const questions = await QuizQuestion.find({
      _id: { $in: questionIds },
    })
      .select(
        'question options correctOptions questionType positiveMarks negativeMarks imageUrl'
      )
      .lean();

    const questionMap = new Map(
      questions.map((question) => [question._id.toString(), question])
    );

    const answers = attempt.answers.map((answer) => {
      const question = questionMap.get(answer.questionId.toString());

      return {
        questionId: answer.questionId,
        question: question?.question || null,
        questionType: question?.questionType || null,
        options: question?.options || [],
        correctOptions: question?.correctOptions || [],
        selectedOptions: answer.selectedOptions,
        isCorrect: answer.isCorrect,
        marksAwarded: answer.marksAwarded,
        positiveMarks: question?.positiveMarks || 0,
        negativeMarks: question?.negativeMarks || 0,
        imageUrl: question?.imageUrl || null,
      };
    });

    return {
      attemptId: attempt._id,
      quizId: attempt.quizId,
      status: attempt.status,
      totalQuestions: attempt.totalQuestions,
      totalMarksObtained: attempt.totalMarksObtained,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      answers,
    };
  }

  static async getAttemptStatuses({ descopeId, quizIds }) {
    if (!descopeId) {
      const error = new Error("Invalid user");
      error.statusCode = 400;
      throw error;
    }

    const validQuizIds = (quizIds || []).filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (!validQuizIds.length) {
      return {};
    }

    const user = await User.findOne({ descopeId }).select("_id").lean();

    if (!user) {
      return {};
    }

    const attempts = await QuizAttempt.find({
      userId: user._id,
      quizId: { $in: validQuizIds },
    })
      .select("_id quizId status")
      .lean();

    const statusMap = {};

    for (const attempt of attempts) {
      statusMap[attempt.quizId.toString()] = {
        attempted: true,
        status: attempt.status,
        attemptId: attempt._id.toString(),
      };
    }

    return statusMap;
  }

  static async getUserAttempts({ userId, type }) {
  if (!userId) {
    const error = new Error("Invalid userId");
    error.statusCode = 400;
    throw error;
  }

  const query = {
    userId,
    status: { $in: ["submitted", "auto_submitted"] },
  };

  const attempts = await QuizAttempt.find(query)
    .populate({
      path: "quizId",
      select: "title category subcategory totalMarks",
    })
    .sort({ submittedAt: -1, createdAt: -1 })
    .lean();

  return attempts
    .filter((attempt) => attempt.quizId)
    .map((attempt) => ({
      attemptId: attempt._id,
      quizId: attempt.quizId._id,
      quizTitle: attempt.quizId.title,
      category: attempt.quizId.category,
      subcategory: attempt.quizId.subcategory,
      totalMarks: attempt.quizId.totalMarks,
      totalMarksObtained: attempt.totalMarksObtained || 0,
      totalQuestions: attempt.totalQuestions || 0,
      status: attempt.status,
      submittedAt: attempt.submittedAt,
    }));
}

}

export default QuizAttemptService;