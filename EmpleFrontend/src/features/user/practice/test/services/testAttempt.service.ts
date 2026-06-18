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
  answers: {
    questionId: string;
    selectedOptions: string[];
  }[];
};

export type TestSectionAnswerPayload = {
  questionId: string;
  selectedOptions: string[];
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
  answers: TestSectionAnswerPayload[]
) => {
  const result = await apiRequest<ApiResponse<unknown>>(
    `/api/v1/test-attempts/${attemptId}/sections/${sectionId}/submit`,
    {
      method: 'POST',
      body: JSON.stringify({
        answers,
      }),
    }
  );

  return result.data;
};