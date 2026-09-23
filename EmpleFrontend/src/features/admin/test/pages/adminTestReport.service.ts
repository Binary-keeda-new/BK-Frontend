import { apiRequest } from '@/shared/utils/api';
import type { TestReport } from './testReport.types';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getAdminTestReport = async (testId: string) => {
  const result = await apiRequest<ApiResponse<TestReport>>(
    `/api/v1/admin/tests/${testId}/report`,
    {
      method: 'GET',
    }
  );

  return result.data;
};