import { apiRequest } from '@/shared/utils/api';

export type ExecutionTestResult = {
  input?: string;
  expectedOutput?: string;
  actualOutput?: string;
  stderr?: string;
  compileOutput?: string;
  status?: {
    id?: number;
    description?: string;
  };
  passed?: boolean;
  time?: string;
  memory?: number;
};

export type ExecutionResponseData = {
  accepted?: boolean;
  passedCount?: number;
  totalCount?: number;
  results: ExecutionTestResult[];
  stdout?: string;
  stderr?: string;
  compileOutput?: string;
  message?: string;
};

type ApiExecutionResponse = {
  success: boolean;
  data: any;
  message?: string;
};

type ExecutePayload = {
  problemId: string;
  language: string;
  sourceCode: string;
  customInput?: string;
};

export function normalizeExecutionResult(raw: any): ExecutionResponseData {
  if (!raw) {
    return {
      accepted: false,
      passedCount: 0,
      totalCount: 0,
      results: [],
      stdout: '',
      stderr: '',
      compileOutput: '',
    };
  }

  const targetObj = raw.data || raw.executionResult || raw;

  const rawResults = Array.isArray(targetObj.results)
    ? targetObj.results
    : Array.isArray(targetObj.testResults)
    ? targetObj.testResults
    : Array.isArray(targetObj.testCases)
    ? targetObj.testCases
    : Array.isArray(targetObj.runResults)
    ? targetObj.runResults
    : Array.isArray(targetObj.testCaseResults)
    ? targetObj.testCaseResults
    : Array.isArray(targetObj.outputSummary?.results)
    ? targetObj.outputSummary.results
    : Array.isArray(targetObj.outputSummary?.testResults)
    ? targetObj.outputSummary.testResults
    : [];

  const results: ExecutionTestResult[] = rawResults.map((item: any) => ({
    input: item?.input ?? item?.sampleInput ?? '',
    expectedOutput: item?.expectedOutput ?? item?.expected_output ?? item?.expected ?? '',
    actualOutput: item?.actualOutput ?? item?.actual_output ?? item?.stdout ?? item?.output ?? '',
    stderr: item?.stderr ?? item?.error ?? '',
    compileOutput: item?.compileOutput ?? item?.compile_output ?? '',
    status: typeof item?.status === 'object'
      ? item.status
      : item?.status
      ? { description: String(item.status) }
      : undefined,
    passed: Boolean(item?.passed ?? item?.isCorrect ?? (item?.status?.id === 3)),
    time: item?.time ? String(item.time) : item?.executionTimeMs ? `${item.executionTimeMs}ms` : undefined,
    memory: item?.memory ?? item?.memoryUsedKb,
  }));

  const passedCount = typeof targetObj.passedCount === 'number'
    ? targetObj.passedCount
    : typeof targetObj.passedTestCases === 'number'
    ? targetObj.passedTestCases
    : results.filter(r => r.passed).length;

  const totalCount = typeof targetObj.totalCount === 'number'
    ? targetObj.totalCount
    : typeof targetObj.totalTestCases === 'number'
    ? targetObj.totalTestCases
    : results.length;

  const accepted = typeof targetObj.accepted === 'boolean'
    ? targetObj.accepted
    : (totalCount > 0 && passedCount === totalCount);

  const stdout = targetObj.stdout || targetObj.output || targetObj.outputSummary?.stdout || '';
  const stderr = targetObj.stderr || targetObj.error || targetObj.executionError || targetObj.errorMessage || targetObj.outputSummary?.stderr || '';
  const compileOutput = targetObj.compileOutput || targetObj.compile_output || targetObj.outputSummary?.compileOutput || targetObj.outputSummary?.compile_output || '';
  const message = targetObj.message || targetObj.outputSummary?.message || (typeof targetObj.status === 'string' ? targetObj.status : targetObj.status?.description || '');

  return {
    accepted,
    passedCount,
    totalCount,
    results,
    stdout,
    stderr,
    compileOutput,
    message,
  };
}

export async function runCode(payload: ExecutePayload): Promise<ExecutionResponseData> {
  const response = await apiRequest<ApiExecutionResponse>(
    '/api/v1/code-execution/run',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return normalizeExecutionResult(response.data);
}

export async function submitCode(payload: ExecutePayload): Promise<ExecutionResponseData> {
  const response = await apiRequest<ApiExecutionResponse>(
    '/api/v1/code-execution/submit',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return normalizeExecutionResult(response.data);
}