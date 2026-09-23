import { apiRequest } from '@/shared/utils/api';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type TestSectionQuestion = {
  questionId: string;
  question: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  options: string[];
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string | null;
};

export type TestSectionAttemptData = {
  attemptId: string;
  testId: string;
  sectionId: string;
  type: 'mcq' | 'coding';
  duration: number;
  numberOfQuestions: number;
  questions: TestSectionQuestion[];
  answerRevision?: number;
  answers: {
    questionId: string;
    selectedOptions: string[];
    timeTakenSeconds?: number;
  }[];
  codingSubmissions?: CodingSubmissionPayload[];
};

export type TestSectionAnswerPayload = {
  questionId: string;
  selectedOptions: string[];
  timeTakenSeconds?: number;
};

export type CodingSubmissionPayload = {
  problemId: string;
  submissionId: string;
};

export const getTestSectionAttempt = async (
  attemptId: string,
  sectionId: string
) => {
  const result = await apiRequest<ApiResponse<TestSectionAttemptData>>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}`,
    {
      method: 'GET',
    }
  );

  return result.data;
};

export const submitTestSectionAttempt = async (
  attemptId: string,
  sectionId: string,
  answers: TestSectionAnswerPayload[] = [],
  codingSubmissions: CodingSubmissionPayload[] = []
) => {
  const payloadAnswers = answers.length > 0 ? answers : codingSubmissions;

  const result = await apiRequest<ApiResponse<unknown>>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/submit`,
    {
      method: 'POST',
      body: JSON.stringify({
        answers: payloadAnswers,
      }),
    }
  );

  return result.data;
};

export type ForceSubmitResponse = {
  status: import('../types/test.types').TestAttemptStatus;
  requiresReview?: boolean;
};

export const forceSubmitTestAttempt = async (attemptId: string) => {
  const result = await apiRequest<ApiResponse<ForceSubmitResponse>>(
    `/api/v1/test-attempts/${attemptId}/force-submit`,
    {
      method: 'POST',
    }
  );

  return result.data;
};

export type AutosaveResponse =
  | { saved: true; currentRevision?: number }
  | { saved: false; reason: 'stale_revision'; currentRevision: number };

export const saveTestSectionAnswers = async (
  attemptId: string,
  sectionId: string,
  payload: {
    revision: number;
    answers: {
      questionId: string;
      selectedOptions: string[];
      timeTakenSeconds: number;
    }[];
  }
) => {
  const result = await apiRequest<ApiResponse<AutosaveResponse>>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/answers`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }
  );
  return result.data;
};

export type SecurityViolationResponse = {
  violationCount: number;
  maxViolations?: number;
  forceSubmitted: boolean;
  status: import('../types/test.types').TestAttemptStatus;
  requiresReview?: boolean;
};

export const reportTestSecurityViolation = async (
  attemptId: string,
  violationType: string
) => {
  const result = await apiRequest<ApiResponse<SecurityViolationResponse>>(
    `/api/v1/test-attempts/${attemptId}/security-violations`,
    {
      method: 'POST',
      body: JSON.stringify({ type: violationType }),
    }
  );
  return result.data;
};