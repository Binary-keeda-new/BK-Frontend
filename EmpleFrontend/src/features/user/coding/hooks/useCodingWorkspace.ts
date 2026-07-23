'use client';

import { useEffect, useState, useCallback } from 'react';
import type { UserCodingProblem } from '../../practice/test/types/test.types';
import { getCodingProblem } from '../services/codingProblemService';
import {
  runCode,
  submitCode,
  type ExecutionResponseData,
} from '../services/executionService';

export type ProblemWorkspaceState = {
  problem: any | null;
  loading: boolean;
  error: string;
  selectedLanguage: string;
  code: string;
  customInput: string;
  executionResult: ExecutionResponseData | null;
  executionError: string;
  submitCompleted: boolean;
};

export default function useCodingWorkspace(
  problems: UserCodingProblem[],
  initialSubmissions: any[] = []
) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  
  // Guard against out-of-bounds
  const safeIndex = Math.min(Math.max(0, currentProblemIndex), Math.max(0, problems.length - 1));
  if (safeIndex !== currentProblemIndex && problems.length > 0) {
    setCurrentProblemIndex(safeIndex);
  }

  const activeProblemId = problems[safeIndex]?._id;

  const [problemStates, setProblemStates] = useState<Record<string, ProblemWorkspaceState>>({});
  
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!activeProblemId) return;

    setProblemStates(prev => {
      // If already initialized with a problem, don't re-fetch/re-initialize
      if (prev[activeProblemId]?.problem) {
        return prev;
      }

      // Safe to do async fetch
      const fetchProblemData = async () => {
        try {
          const passedProblem = problems[safeIndex] as any;
          let data = passedProblem;
          
          if (!passedProblem.codeTemplates || !passedProblem.languages) {
            data = await getCodingProblem(activeProblemId);
          }

          const matchingSubmissions = initialSubmissions.filter(
            (sub) => sub.problemId?.toString() === activeProblemId.toString()
          );
          let savedSubmission = matchingSubmissions.length > 0 
            ? matchingSubmissions[matchingSubmissions.length - 1] 
            : null;

          let lang = savedSubmission?.language;
          if (savedSubmission && lang && !data.languages?.includes(lang)) {
             savedSubmission = null; // Invalidate if language no longer supported
          }

          lang = savedSubmission?.language || data.languages?.[0] || 'Java';

          let initialCode = savedSubmission?.sourceCode;

          if (typeof window !== 'undefined') {
            const localDraft = localStorage.getItem(`emple_draft_${activeProblemId}_${lang}`);
            if (localDraft) {
              initialCode = localDraft;
            }
          }

          if (typeof initialCode !== 'string') {
            const prefix = data.lockedPrefixTemplates?.[lang] || '';
            const editable = data.codeTemplates?.[lang] || '';
            const suffix = data.lockedSuffixTemplates?.[lang] || '';
            initialCode = `${prefix}${editable}${suffix}`;
          }

          let restoredResult = null;
          if (savedSubmission) {
             restoredResult = {
               accepted: savedSubmission.accepted,
               passedCount: savedSubmission.passedCount,
               totalCount: savedSubmission.totalCount,
               results: savedSubmission.results || [],
             } as ExecutionResponseData;
          }

          setProblemStates(currentStates => ({
            ...currentStates,
            [activeProblemId]: {
              ...currentStates[activeProblemId],
              problem: data,
              loading: false,
              error: '',
              selectedLanguage: lang,
              code: initialCode,
              executionResult: restoredResult,
              submitCompleted: !!savedSubmission,
            }
          }));
        } catch (err) {
          setProblemStates(currentStates => ({
            ...currentStates,
            [activeProblemId]: {
              ...currentStates[activeProblemId],
              loading: false,
              error: err instanceof Error ? err.message : 'Failed to load problem',
            }
          }));
        }
      };

      const initialState: ProblemWorkspaceState = {
        problem: null,
        loading: true,
        error: '',
        selectedLanguage: 'Java',
        code: '',
        customInput: '',
        executionResult: null,
        executionError: '',
        submitCompleted: false,
      };

      void fetchProblemData();

      return {
        ...prev,
        [activeProblemId]: initialState
      };
    });
  }, [activeProblemId, problems, safeIndex, initialSubmissions]);

  // Auto-save while typing to localStorage
  useEffect(() => {
    if (!activeProblemId) return;
    const currentState = problemStates[activeProblemId];
    if (!currentState || currentState.loading || !currentState.problem) return;

    const storageKey = `emple_draft_${activeProblemId}_${currentState.selectedLanguage}`;
    const timeoutId = setTimeout(() => {
      localStorage.setItem(storageKey, currentState.code);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [activeProblemId, problemStates[activeProblemId]?.code, problemStates[activeProblemId]?.selectedLanguage]);

  const activeState = problemStates[activeProblemId] || {
    problem: null,
    loading: true,
    error: '',
    selectedLanguage: 'Java',
    code: '',
    customInput: '',
    executionResult: null,
    executionError: '',
    submitCompleted: false,
  };

  const updateActiveState = useCallback((updates: Partial<ProblemWorkspaceState>) => {
    if (!activeProblemId) return;
    setProblemStates(prev => ({
      ...prev,
      [activeProblemId]: {
        ...prev[activeProblemId],
        ...updates
      }
    }));
  }, [activeProblemId]);

  const changeLanguage = (language: string) => {
    if (!activeState.problem) return;

    const lang = language as keyof typeof activeState.problem.codeTemplates;
    
    let newCode: string | null = null;
    if (typeof window !== 'undefined') {
       newCode = localStorage.getItem(`emple_draft_${activeProblemId}_${language}`);
    }

    if (!newCode) {
      const prefix = activeState.problem.lockedPrefixTemplates?.[lang] || '';
      const editable = activeState.problem.codeTemplates?.[lang] || '';
      const suffix = activeState.problem.lockedSuffixTemplates?.[lang] || '';
      newCode = `${prefix}${editable}${suffix}`;
    }

    updateActiveState({
      selectedLanguage: language,
      code: newCode,
      executionResult: null,
      executionError: '',
      submitCompleted: false,
    });
  };

  const setCode = (code: string) => updateActiveState({ code });
  const setCustomInput = (customInput: string) => updateActiveState({ customInput });

  const handleRunCode = async () => {
    if (!activeState.problem || running || submitting) return;

    try {
      setRunning(true);
      updateActiveState({ executionError: '', executionResult: null, submitCompleted: false });

      const result = await runCode({
        problemId: activeState.problem._id,
        language: activeState.selectedLanguage,
        sourceCode: activeState.code,
      });

      updateActiveState({ executionResult: result });
    } catch (err) {
      updateActiveState({ executionError: err instanceof Error ? err.message : 'Failed to run code' });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!activeState.problem || running || submitting) return;

    try {
      setSubmitting(true);
      updateActiveState({ executionError: '', executionResult: null });

      const result = await runCode({
        problemId: activeState.problem._id,
        language: activeState.selectedLanguage,
        sourceCode: activeState.code,
        customInput: activeState.customInput,
      });

      updateActiveState({ executionResult: result, submitCompleted: true });
    } catch (err) {
      updateActiveState({ executionError: err instanceof Error ? err.message : 'Failed to submit code' });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    currentProblemIndex: safeIndex,
    setCurrentProblemIndex,
    totalProblems: problems.length,
    activeProblemId,

    problem: activeState.problem,
    loading: activeState.loading,
    error: activeState.error,
    customInput: activeState.customInput,
    setCustomInput,
    selectedLanguage: activeState.selectedLanguage,
    changeLanguage,
    code: activeState.code,
    setCode,
    executionResult: activeState.executionResult,
    executionError: activeState.executionError,
    submitCompleted: activeState.submitCompleted,
    
    running,
    submitting,
    handleRunCode,
    handleSubmitCode,
    
    // For section completion
    problemStates,
    problems,
  };
}