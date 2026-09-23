import { apiRequest } from '@/shared/utils/api';
import type { ExecutionResponseData } from '../../../coding/services/executionService';

export type TestCodingSubmissionStatus =
  | 'queued'
  | 'running'
  | 'accepted'
  | 'wrong_answer'
  | 'compilation_error'
  | 'runtime_error'
  | 'time_limit_exceeded'
  | 'internal_error';

export type TestCodingSubmissionResponse = {
  submissionId: string;
  problemId: string;
  status: TestCodingSubmissionStatus;
  language: string;
  score?: number;
  passedTestCases?: number;
  totalTestCases?: number;
  outputSummary?: {
    compileOutput?: string;
    stderr?: string;
    stdout?: string;
    message?: string;
  };
};

type RunTestCodePayload = {
  language: string;
  sourceCode: string;
  customInput?: string;
};

export const runTestCode = async (
  attemptId: string,
  sectionId: string,
  problemId: string,
  payload: RunTestCodePayload
) => {
  const result = await apiRequest<{
    success: boolean;
    data: ExecutionResponseData;
    message?: string;
  }>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/coding/${problemId}/run`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return result.data;
};

type SubmitTestCodePayload = {
  language: string;
  sourceCode: string;
};

export const submitTestCode = async (
  attemptId: string,
  sectionId: string,
  problemId: string,
  payload: SubmitTestCodePayload
) => {
  const result = await apiRequest<{
    success: boolean;
    data: {
      submissionId: string;
      status: TestCodingSubmissionStatus;
    };
    message?: string;
  }>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/coding/${problemId}/submit`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return result.data;
};

export const pollTestSubmission = async (
  attemptId: string,
  submissionId: string
) => {
  const result = await apiRequest<{
    success: boolean;
    data: TestCodingSubmissionResponse;
    message?: string;
  }>(
    `/api/v1/test-attempts/${attemptId}/coding-submissions/${submissionId}`,
    {
      method: 'GET',
    }
  );

  return result.data;
};
