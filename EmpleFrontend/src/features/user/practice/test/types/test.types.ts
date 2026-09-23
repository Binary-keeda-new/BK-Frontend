export type TestSectionType = 'mcq' | 'coding';

export type TestAttemptStatus =
  | 'not_started'
  | 'in_progress'
  | 'finalizing'
  | 'submitted'
  | 'force_submitted';

export type UserTestSection = {
  _id: string;
  title: string;
  type: TestSectionType;
  duration: number;
  numberOfQuestions: number;
  codingProblems?: {
    problemId: UserCodingProblem;
    marks: number;
    order: number;
  }[];
  codingProblemIds?: UserCodingProblem[];
};

export type TestAttemptStatusMap = Record<
  string,
  { attempted: boolean; status: TestAttemptStatus; attemptId: string }
>;

export interface UserTestReport {
  attemptId: string;
  test: {
    id: string;
    title: string;
    description?: string;
  };
  candidate?: {
    id: string;
    name: string;
    email?: string;
  };
  status: TestAttemptStatus;
  resultReady: boolean;
  requiresReview: boolean;
  startedAt: string;
  submittedAt: string;
  totalTimeMs?: number;
  timeUsedMs: number;
  totalDurationMs: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  completionType?: 'submitted' | 'force_submitted' | 'expired' | 'manual_force_submit' | 'timer_expired' | 'security_violation_limit';
  passStatus?: boolean | null;
  
  sectionBreakdown?: Array<{
    sectionId: string;
    title: string;
    type: 'mcq' | 'coding';
    score: number;
    maxScore: number;
    timeSpentMs: number;
    status: string;
    
    // MCQ specific
    correct?: number;
    incorrect?: number;
    unanswered?: number;
    
    // Coding specific
    numberOfProblems?: number;
    finalizedProblems?: number;
  }>;

  // Kept for UI compatibility, Phase 6E will overhaul `TestResult`
  summary: any;
  sections: any[];
  mcqReview: Array<{
    questionId: string;
    question: string;
    options: string[];
    correctOptions?: string[];
    difficulty: string;
    topic: string;
    selectedOptions: string[];
    isCorrect: boolean;
    marks: number;
  }>;
  codingReview: Array<{
    problemId: string;
    title: string;
    difficulty: string;
    language: string;
    accepted: boolean;
    passedCount: number;
    totalCount: number;
    marks?: number;
    totalMarks?: number;
    sourceCode: string;
    compileOutput?: string | null;
    stderr?: string | null;
    executionTime?: number | null;
    memory?: number | null;
  }>;
  rank?: any;
}

export type UserTest = {
  _id: string;
  title: string;
  description?: string;
  totalSections: number;
  totalDuration: number;
  attempted: boolean;
  sections: UserTestSection[];

  status?: TestAttemptStatus;
  attemptId?: string;
  settings?: UserTestSettings;
};

export type UserTestSettings = {
  blockKeyboard?: boolean;
  allowVirtualKeyboard?: boolean;
  allowCalculator?: boolean;
  noExitScreen?: boolean;
  ipBinding?: boolean;
  noCopyPaste?: boolean;
  noMinimize?: boolean;
  noDevTools?: boolean;
  noLostFocus?: boolean;
  navigationMode?: 'free' | 'sequential';
  minTimeBeforeSubmit?: number;
  deadline?: string;
  duration?: number;
  passwordProtected?: boolean;
};

export type UserCodingProblem = {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  points: number;
  status?: 'draft' | 'published';
  selectedSubmission?: {
    submissionId: string;
    status: import('../services/testExecution.service').TestCodingSubmissionStatus;
    passedTestCases?: number;
    totalTestCases?: number;
    score?: number;
    language?: string;
  };
  activeSubmission?: {
    submissionId: string;
    status: import('../services/testExecution.service').TestCodingSubmissionStatus;
    language?: string;
  };
};