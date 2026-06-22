import { apiRequest } from '@/shared/utils/api';
import { UserTest } from '../types/test.types';

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

export const submitTestSection = async (
  attemptId: string,
  sectionId: string,
  answers: {
    questionId: string;
    selectedOptions: string[];
  }[]
) => {
  const result = await apiRequest<ApiResponse<unknown>>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/submit`,
    {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }
  );

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
      status: string;
      startedAt: string;
      expiresAt?: string | null;
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