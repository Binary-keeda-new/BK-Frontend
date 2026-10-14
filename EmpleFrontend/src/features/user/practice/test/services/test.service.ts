import { apiRequest } from '@/shared/utils/api';
import { UserTest, UserTestReport } from '../types/test.types';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type TestAttemptStatusItem = {
  attempted: boolean;
  status: 'in_progress' | 'submitted';
  attemptId: string;
};

export type TestCodingReviewSubmission = {
  problemId: string;
  language: string;
  sourceCode: string;
  accepted?: boolean;
  passedCount?: number;
  totalCount?: number;
  results?: any[];
  submittedAt?: string;
};

export type TestObjectiveReviewItem = {
  questionId: string;
  question: string;
  options: string[];
  selectedOptions: string[];
  correctOptions?: string[];
  evaluationStatus: string;
  awardedMarks: number;
  positiveMarks: number;
  negativeMarks: number;
  solution?: string;
  solutionMedia?: string;
  timeTakenSeconds?: number;
};

export type TestCodingReviewItem = {
  problemId: string;
  problem: any;
  sourceCode: string;
  language: string;
  status: string;
  passedTestCases: number;
  totalTestCases: number;
  score: number;
  maxMarks: number;
};

export type TestSectionReviewResponse =
  | {
      attemptId: string;
      sectionId: string;
      type: 'mcq';
      questions: TestObjectiveReviewItem[];
    }
  | {
      attemptId: string;
      sectionId: string;
      type: 'coding';
      submissions: TestCodingReviewItem[];
    };

export type TestAttemptStatusMap = Record<string, TestAttemptStatusItem>;

export const getTests = async () => {
  const result = await apiRequest<ApiResponse<UserTest[]>>('/api/v1/tests', {
    method: 'GET',
  });

  return result.data;
};

export const getTestAttemptStatus = async (testIds: string[]) => {
  if (testIds.length === 0) return {};

  const result = await apiRequest<ApiResponse<TestAttemptStatusMap>>(
    `/api/v1/test-attempts/status?testIds=${testIds.join(',')}`,
    {
      method: 'GET',
    }
  );

  return result.data;
};
export const startTestAttempt = async (
  testId: string,
  password?: string
) => {
  const result = await apiRequest<
    ApiResponse<{
      _id: string;
      expiresAt?: string | null;
      remainingSeconds?: number;
      violationCount?: number;
      maxViolations?: number;
      warningsLeft?: number;
      activeSectionId?: string | null;
      activeQuestionId?: string | null;
      activeQuestionIndex?: number;
    }>
  >(`/api/v1/test-attempts/${testId}/start`, {
    method: 'POST',
    body: JSON.stringify({
      password,
    }),
  });

  return result.data;
};



export const submitTestFeedback = async (
  attemptId: string,
  payload: {
    rating: number;
    comment: string;
  }
) => {
  const result = await apiRequest<ApiResponse<unknown>>(
    `/api/v1/test-attempts/${attemptId}/feedback`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return result.data;
};

export const getTestAttemptDetails = async (attemptId: string) => {
  const result = await apiRequest<
    ApiResponse<{
      _id: string;
      testId: string;
      status: import('../types/test.types').TestAttemptStatus;
      startedAt: string;
      expiresAt?: string | null;
      remainingSeconds?: number;
      requiresReview?: boolean;
      violationCount?: number;
      maxViolations?: number;
      warningsLeft?: number;
      activeSectionId?: string | null;
      activeQuestionId?: string | null;
      activeQuestionIndex?: number;
      sections: {
        sectionId: string;
        status: string;
      }[];
    }>
  >(`/api/v1/test-attempts/${attemptId}`, {
    method: 'GET',
  });

  return result.data;
};

export const getTestSectionReview = async (
  attemptId: string,
  sectionId: string
) => {
  const result = await apiRequest<ApiResponse<TestSectionReviewResponse>>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/review`,
    {
      method: 'GET',
    }
  );

  return result.data;
};

export const getUserTestReport = async (attemptId: string) => {
  const result = await apiRequest<ApiResponse<any>>(
    `/api/v1/test-attempts/${attemptId}/report`,
    {
      method: 'GET',
    }
  );

  const data = result.data;

  if (data.status === 'finalizing' || data.resultReady === false) {
    return {
      status: data.status,
      resultReady: data.resultReady,
      requiresReview: data.requiresReview,
    } as UserTestReport;
  }

  const report = data.report || data;

  const totalScore = report.totalScore ?? report.totalMarks ?? 0;
  const maxScore = report.maximumScore ?? report.maxScore ?? report.maximumMarks ?? 0;
  const percentage = typeof report.percentage === 'number'
    ? Math.round(report.percentage * 10) / 10
    : (maxScore > 0 ? Math.round((totalScore / maxScore) * 100 * 10) / 10 : 0);

  return {
    attemptId: report.attemptId || attemptId,
    test: {
      id: report.testId || report.test?.id || '',
      title: report.testTitle || report.test?.title || 'Assessment Result',
      description: report.testDescription || report.test?.description,
    },
    candidate: report.candidate,
    status: data.status || report.status || 'submitted',
    resultReady: data.resultReady ?? true,
    requiresReview: data.requiresReview ?? false,
    startedAt: report.startedAt,
    submittedAt: report.submittedAt,
    timeUsedMs: (report.totalTimeTakenSeconds || report.timeUsedSeconds || report.totalTimeMs || 0) * (report.totalTimeMs ? 1 : 1000),
    totalDurationMs: (report.totalDurationMinutes || 0) * 60 * 1000,
    totalScore,
    maxScore,
    percentage,
    passStatus: report.passStatus ?? (percentage >= (report.passingPercentage || 50)),
    completionType: report.completionType,
    sectionBreakdown: (report.sections || report.sectionBreakdown || []).map((s: any, idx: number) => {
      const sectionScore = s.score ?? s.awardedMarks ?? 0;
      const sectionMaxScore = s.maximumMarks ?? s.maxScore ?? s.maxMarks ?? 0;
      return {
        sectionId: s.sectionId || s._id || `sec_${idx}`,
        title: s.title || `Section ${s.order ?? (idx + 1)}`,
        type: s.type || 'mcq',
        score: sectionScore,
        maxScore: sectionMaxScore,
        timeSpentMs: (s.timeSpentSeconds || s.timeTakenSeconds || s.timeSpentMs || 0) * (s.timeSpentMs ? 1 : 1000),
        status: s.status || 'submitted',
        correct: s.correct,
        incorrect: s.incorrect,
        unanswered: s.unanswered,
        numberOfProblems: s.numberOfProblems,
        finalizedProblems: s.finalizedProblems,
      };
    }),
    summary: report.summary || {},
    sections: report.sections || [],
    mcqReview: report.mcqReview || [],
    codingReview: report.codingReview || [],
    rank: report.rank,
  } as UserTestReport;
};