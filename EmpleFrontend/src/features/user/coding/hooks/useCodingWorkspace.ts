'use client';

import { useEffect, useState } from 'react';
import { CodingProblem } from '../types/workspace';
import { getCodingProblem } from '../services/codingProblemService';
import {
  runCode,
  submitCode,
  type ExecutionResponseData,
} from '../services/executionService';

export default function useCodingWorkspace(problemId: string) {
  const [problem, setProblem] = useState<CodingProblem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState('Java');
  const [code, setCode] = useState('');

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [executionResult, setExecutionResult] =
    useState<ExecutionResponseData | null>(null);
  const [executionError, setExecutionError] = useState('');
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [customInput, setCustomInput] = useState('');

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getCodingProblem(problemId);

        setProblem(data);

        const defaultLanguage = data.languages?.[0] || 'Java';

        setSelectedLanguage(defaultLanguage);
        const lang =
  defaultLanguage as keyof typeof data.codeTemplates;

const prefix =
  data.lockedPrefixTemplates?.[lang] || '';

const editable =
  data.codeTemplates?.[lang] || '';

const suffix =
  data.lockedSuffixTemplates?.[lang] || '';

setCode(`${prefix}${editable}${suffix}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problem');
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      void loadProblem();
    }
  }, [problemId]);

  const changeLanguage = (language: string) => {
    if (!problem) return;

    setSelectedLanguage(language);

    const lang =
  language as keyof typeof problem.codeTemplates;

const prefix =
  problem.lockedPrefixTemplates?.[lang] || '';

const editable =
  problem.codeTemplates?.[lang] || '';

const suffix =
  problem.lockedSuffixTemplates?.[lang] || '';

setCode(`${prefix}${editable}${suffix}`);

    setExecutionResult(null);
    setExecutionError('');
    setSubmitCompleted(false);
  };

  const handleRunCode = async () => {
    if (!problem || running || submitting) return;

    try {
      setRunning(true);
      setExecutionError('');
      setExecutionResult(null);
            setSubmitCompleted(false);

      const result = await runCode({
        problemId: problem._id,
        language: selectedLanguage,
        sourceCode: code,
      });

      setExecutionResult(result);

    } catch (err) {
      setExecutionError(err instanceof Error ? err.message : 'Failed to run code');
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!problem || running || submitting) return;

    try {
      setSubmitting(true);
      setExecutionError('');
      setExecutionResult(null);

      const result = await runCode({
  problemId: problem._id,
  language: selectedLanguage,
  sourceCode: code,
  customInput,
});

      setExecutionResult(result);
      setSubmitCompleted(true);
    } catch (err) {
      setExecutionError(
        err instanceof Error ? err.message : 'Failed to submit code'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    problem,
    loading,
    error,
    customInput,
setCustomInput,

    selectedLanguage,
    changeLanguage,

    code,
    setCode,

    running,
    submitting,
    executionResult,
    executionError,
    handleRunCode,
    handleSubmitCode,
    submitCompleted,
  };
}