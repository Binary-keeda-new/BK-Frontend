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
      requiresReview?: boolean;
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

  const report = data.report;

  return {
    attemptId: report.attemptId,
    test: {
      id: report.testId,
      title: report.testTitle,
    },
    status: data.status,
    resultReady: data.resultReady,
    requiresReview: data.requiresReview,
    startedAt: report.startedAt,
    submittedAt: report.submittedAt,
    timeUsedMs: (report.totalTimeTakenSeconds || 0) * 1000,
    totalDurationMs: 0,
    totalScore: report.totalScore,
    maxScore: report.maximumScore,
    percentage: report.percentage,
    passStatus: report.passStatus,
    completionType: report.completionType,
    sectionBreakdown: report.sections?.map((s: any) => ({
      sectionId: s.sectionId,
      title: `Section ${s.order}`,
      type: s.type,
      score: s.score,
      maxScore: s.maximumMarks,
      timeSpentMs: 0,
      status: s.status,
      correct: s.correct,
      incorrect: s.incorrect,
      unanswered: s.unanswered,
      numberOfProblems: s.numberOfProblems,
      finalizedProblems: s.finalizedProblems,
    })),
    summary: {},
    sections: [],
    mcqReview: [],
    codingReview: [],
  } as UserTestReport;
};