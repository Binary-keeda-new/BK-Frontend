export type QuizQuestionType = "MCQ" | "MSQ" | "NAT";

export interface AttemptQuestion {
  questionId: string;
  question: string;
  questionType: QuizQuestionType;
  options: string[];
  imageUrl: string | null;
  positiveMarks: number;
  negativeMarks: number;
}

export interface AttemptAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect?: boolean;
  marksAwarded?: number;
  startedAt?: string;
  answeredAt?: string;
  timeTakenSeconds?: number;
}

export interface QuizAttemptData {
  _id: string;
  quizId: string;
  userId: string;
  status: "in_progress" | "submitted" | "auto_submitted";
  totalQuestions: number;
  totalMarksObtained: number;
  startedAt: string;
  submittedAt: string | null;
  expiresAt: string | null;
  answers: AttemptAnswer[];
  questions: AttemptQuestion[];
  isAlreadySubmitted?: boolean;
  result?: QuizAttemptResultData;
}

export interface QuizAttemptResponse {
  success: boolean;
  message: string;
  data: QuizAttemptData;
}

export interface QuizAttemptResultAnswer {
  questionId: string;
  question: string | null;
  questionType: QuizQuestionType | null;
  options: string[];
  correctOptions: string[];
  selectedOptions: string[];
  isCorrect: boolean;
  marksAwarded: number;
  positiveMarks: number;
  negativeMarks: number;
  imageUrl: string | null;
  solution?: string | null;
  solutionMedia?: string | null;
}

export interface QuizAttemptResultData {
  attemptId: string;
  quizId: string;
  status: "submitted" | "auto_submitted";
  totalQuestions: number;
  totalMarksObtained: number;
  startedAt: string;
  submittedAt: string;
  answers: QuizAttemptResultAnswer[];
}

export interface QuizAttemptResultResponse {
  success: boolean;
  message: string;
  data: QuizAttemptResultData;
}

export interface SaveAnswerPayload {
  questionId: string;
  selectedOptions: string[];
  startedAt?: string;
  answeredAt?: string;
  timeTakenSeconds?: number;
}
export interface SubmitAttemptPayload {
  answers: SaveAnswerPayload[];
}