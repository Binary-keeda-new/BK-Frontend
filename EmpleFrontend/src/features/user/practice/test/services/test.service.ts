import { apiRequest } from '@/shared/utils/api';
import { UserTest } from '../types/test.types';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getTests = async () => {
  const result = await apiRequest<ApiResponse<UserTest[]>>(
    '/api/v1/tests',
    {
      method: 'GET',
    }
  );

  return result.data;
};

export const getTestById = async (testId: string) => {
  const result = await apiRequest<ApiResponse<UserTest>>(
    `/api/v1/tests/${testId}`,
    {
      method: 'GET',
    }
  );

  return result.data;
};