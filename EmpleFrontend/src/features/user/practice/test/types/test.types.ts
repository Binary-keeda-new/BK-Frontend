export type TestSectionType = 'mcq' | 'coding';


export type UserTestSection = {
  _id: string;
  title: string;
  type: TestSectionType;
  duration: number;
  numberOfQuestions: number;
  codingProblemIds?: UserCodingProblem[];
};

export type TestAttemptStatusMap = Record<
  string,
  { attempted: boolean; status: string; attemptId: string }
>;

export interface UserTestReport {
  attemptId: string;
  test: {
    id: string;
    title: string;
    description?: string;
  };
  candidate: {
    id: string;
    name: string;
    email?: string;
  };
  status: string;
  startedAt: string;
  submittedAt: string;
  timeUsedMs: number;
  totalDurationMs: number;
  summary: {
    score: number;
    totalMarks: number;
    percentage: number;
    correct: number;
    incorrect: number;
    skipped: number;
    totalMcqQuestions: number;
    codingAccepted: number;
    totalCodingProblems: number;
    codingTestCasesPassed: number;
    codingTestCasesTotal: number;
    accuracy: number;
  };
  rank?: {
    position: number;
    totalCandidates: number;
  } | null;
  sections: Array<{
    sectionId: string;
    title: string;
    type: 'mcq' | 'coding';
    score: number | null;
    totalMarks: number | null;
    attempted: number;
    totalItems: number;
    accuracyOrAcceptanceRate: number;
    timeSpentMs: number;
    status: string;
  }>;
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
}

export type UserTest = {
  _id: string;
  title: string;
  description?: string;
  totalSections: number;
  totalDuration: number;
  attempted: boolean;
  sections: UserTestSection[];

  status?: 'not_started' | 'in_progress' | 'completed';
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
};