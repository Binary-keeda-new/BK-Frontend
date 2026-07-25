import { apiRequest } from '@/shared/utils/api';

export type ExecutionTestResult = {
  input?: string;
  expectedOutput?: string;
  actualOutput?: string;
  stderr?: string;
  compileOutput?: string;
  status?: {
    id: number;
    description: string;
  };
  passed: boolean;
  time?: string;
  memory?: number;
};

export type ExecutionResponseData = {
  accepted?: boolean;
  passedCount: number;
  totalCount: number;
  results: ExecutionTestResult[];
};

type ApiExecutionResponse = {
  success: boolean;
  data: ExecutionResponseData;
  message?: string;
};

type ExecutePayload = {
  problemId: string;
  language: string;
  sourceCode: string;
  customInput?: string;
};

export async function runCode(payload: ExecutePayload) {
  const response = await apiRequest<ApiExecutionResponse>(
    '/api/v1/code-execution/run',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return response.data;
}

export async function submitCode(payload: ExecutePayload) {
  const response = await apiRequest<ApiExecutionResponse>(
    '/api/v1/code-execution/submit',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return response.data;
}