import { apiRequest } from '@/shared/utils/api';
import type { CodingProblem } from '../types/workspace';

type CodingProblemResponse = {
  success: boolean;
  data: CodingProblem;
  message?: string;
};

export async function getCodingProblem(problemId: string) {
  const response = await apiRequest<CodingProblemResponse>(
    `/api/v1/coding-problems/${problemId}`,
    {
      method: 'GET',
    }
  );

  return response.data;
}