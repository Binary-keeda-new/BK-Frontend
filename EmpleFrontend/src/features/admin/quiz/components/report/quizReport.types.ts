export type QuizReport = {
  quizId: string;
  summary: {
    totalAttempts: number;
    totalQuestions: number;
    maxMarks: number;
    averageScore: number;
  };
  questionAccuracy: {
    questionId: string;
    q: string;
    question: string;
    questionType: string;
    accuracy: number;
    attempted: number;
    correct: number;
    incorrect: number;
    skipped: number;
    positiveMarks: number;
    negativeMarks: number;
    correctOptions: string[];
    optionDistribution: Record<string, number>;
  }[];
  leaderboard: {
    rank: number;
    userId: string;
    score: number;
    email: string;
    totalQuestions: number;
    submittedAt: string | null;
  }[];
};