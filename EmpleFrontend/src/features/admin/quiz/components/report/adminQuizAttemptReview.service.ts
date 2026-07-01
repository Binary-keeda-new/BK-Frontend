import { apiRequest } from '@/shared/utils/api';
import type { QuizAttemptResultData } from '@/features/user/practice/quiz/types/quizAttempt.types';

type ApiResponse = {
  success: boolean;
  data: QuizAttemptResultData;
};

export const getAdminQuizAttemptReview = async (attemptId: string) => {
  return apiRequest<ApiResponse>(
    `/api/v1/admin/quizzes/attempts/${attemptId}/review`,
    { method: 'GET' }
  );
};