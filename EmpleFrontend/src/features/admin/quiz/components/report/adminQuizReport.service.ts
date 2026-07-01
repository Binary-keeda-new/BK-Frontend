import { apiRequest } from '@/shared/utils/api';
import type { QuizReport } from './quizReport.types';

type ApiResponse = {
  success: boolean;
  data: QuizReport;
};

export const getAdminQuizReport = async (
  quizId: string
): Promise<QuizReport> => {
  const response = await apiRequest<ApiResponse>(
    `/api/v1/admin/quizzes/${quizId}/report`,
    {
      method: 'GET',
    }
  );

  return response.data;
};