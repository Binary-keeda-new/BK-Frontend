export type LeaderboardItem = {
  rank: number;
  userId: string;
  email: string;
  score: number;
  submittedAt?: string | null;
  attemptId: string;
};

export type CodingSubmissionAnalytics = {
  attemptId: string;
  userId: string;
  sectionId: string;
  problemId: string;
  language: string;
  accepted: boolean;
  passedCount: number;
  totalCount: number;
  submittedAt?: string;
  results: unknown[];
};

export type LanguageDistributionItem = {
  language: string;
  count: number;
};

export type SubmissionTimelineItem = {
  hour: number;
  count: number;
};

export type TestReport = {
  test: {
    _id: string;
    title: string;
    description?: string;
    status?: string;
  };

  summary: {
    totalAttempts: number;
    submittedAttempts: number;
    totalSections: number;
    mcqSections: number;
    codingSections: number;
    averageScore: number;
    averageDurationSeconds: number;
    completionRate: number;
  };

  mcq: {
    questionAccuracy: unknown[];
  };

  coding: {
    totalSubmissions: number;
    acceptedSubmissions: number;
    acceptanceRate: number;
    avgExecTimeMs: number;
    avgMemoryKb: number;
    avgTestCasesPassedRate: number;
    submissionTimeline: SubmissionTimelineItem[];
    avgAttemptsPerProblem: number;
    languageDistribution: LanguageDistributionItem[];
    submissions: CodingSubmissionAnalytics[];
    problemWiseAnalytics: ProblemWiseCodingAnalytics[];
  };

  leaderboard: LeaderboardItem[];
};

export type ProblemWiseCodingAnalytics = {
  problemId: string;
  problemTitle: string;
  difficulty: string;
  total: number;
  accepted: number;
  acceptanceRate: number;
  averageTimeTakenSeconds?: number;
};