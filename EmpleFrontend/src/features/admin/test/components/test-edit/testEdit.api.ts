import { apiRequest } from '@/shared/utils/api';
import type {
  CodingProblemOption,
  TestResponse,
  TestSectionListResponse,
  TestSectionSingleResponse,
} from './testEdit.types';
import type { TestSettings } from '../TestSettingsCard';

export const getTest = (testId: string) => {
  return apiRequest<TestResponse>(`/api/v1/admin/tests/${testId}`, {
    method: 'GET',
  });
};

export const getSections = (testId: string) => {
  return apiRequest<TestSectionListResponse>(
    `/api/v1/admin/tests/${testId}/sections`,
    {
      method: 'GET',
    }
  );
};

export const getCodingProblems = () => {
  return apiRequest<{
    success: boolean;
    message: string;
    data: CodingProblemOption[];
  }>('/api/v1/admin/coding-problems', {
    method: 'GET',
  });
};

export const saveTestDetails = (
  testId: string,
  payload: {
    title: string;
    description: string;
    totalSections: number;
    settings: TestSettings;
  }
) => {
  return apiRequest<TestResponse>(`/api/v1/admin/tests/${testId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const publishTest = (testId: string) => {
  return apiRequest(`/api/v1/admin/tests/${testId}`, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'published',
    }),
  });
};

export const createSection = (
  testId: string,
  payload: {
    type: string;
    numberOfQuestions: number;
    duration: number;
    codingProblemIds: string[];
  }
) => {
  return apiRequest<TestSectionSingleResponse>(
    `/api/v1/admin/tests/${testId}/sections`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
};

export const updateSection = (
  sectionId: string,
  payload: {
    type: string;
    numberOfQuestions: number;
    duration: number;
    codingProblemIds: string[];
  }
) => {
  return apiRequest<TestSectionSingleResponse>(
    `/api/v1/admin/test-sections/${sectionId}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );
};

export const deleteSection = (sectionId: string) => {
  return apiRequest(`/api/v1/admin/test-sections/${sectionId}`, {
    method: 'DELETE',
  });
};

export const importQuestionsToSection = (
  testId: string,
  sectionId: string,
  questions: unknown[]
) => {
  return apiRequest(`/api/v1/admin/tests/${testId}/sections/${sectionId}/questions`, {
    method: 'POST',
    body: JSON.stringify({
      questions,
    }),
  });
};