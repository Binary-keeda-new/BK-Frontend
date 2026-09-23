'use client';

import { useEffect, useState, useCallback } from 'react';
import type { UserCodingProblem } from '../../practice/test/types/test.types';
import { getCodingProblem } from '../services/codingProblemService';
import {
  runCode,
  submitCode,
  type ExecutionResponseData,
} from '../services/executionService';
import {
  runTestCode,
  submitTestCode,
  pollTestSubmission,
  type TestCodingSubmissionResponse,
} from '../../practice/test/services/testExecution.service';

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
  timeTakenSeconds: number;
  testSubmissionState?: TestCodingSubmissionResponse;
  validSelectedSubmission?: TestCodingSubmissionResponse;
};

export default function useCodingWorkspace(
  problems: UserCodingProblem[],
  initialSubmissions: any[] = [],
  testContext?: { attemptId: string; sectionId: string; }
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
      // If already initialized (even if just loading), don't re-fetch/re-initialize
      if (prev[activeProblemId]) {
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
              timeTakenSeconds: savedSubmission?.timeTakenSeconds || 0,
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

      const passedProblem = problems.find(p => p._id === activeProblemId) as any || problems[safeIndex] as any;

      let validSubmission = undefined;
      let activeSubmission = undefined;
      let submitCompleted = false;

      // Handle Test Mode hydration from Phase 6F.1 DTO
      if (testContext && (passedProblem?.selectedSubmission || passedProblem?.activeSubmission)) {
        if (passedProblem.selectedSubmission) {
           validSubmission = passedProblem.selectedSubmission;
        }
        if (passedProblem.activeSubmission && (passedProblem.activeSubmission.status === 'queued' || passedProblem.activeSubmission.status === 'running')) {
           activeSubmission = passedProblem.activeSubmission;
        } else if (validSubmission) {
           activeSubmission = validSubmission;
        }
        
        if (activeSubmission && validSubmission) {
           // We have both an active and a valid fallback. If active fails, we keep valid.
        }
      } else {
        // Fallback to legacy/practice hydration
        const savedSubmission = initialSubmissions?.find(
          (sub) => sub.problemId === activeProblemId
        );
        if (savedSubmission) {
          activeSubmission = {
            submissionId: savedSubmission.submissionId || '',
            status: savedSubmission.status || 'accepted',
            language: savedSubmission.language || 'Java',
            score: savedSubmission.score,
            passedTestCases: savedSubmission.passedCount,
            totalTestCases: savedSubmission.totalCount,
          };
          
          if (
            activeSubmission.status === 'accepted' ||
            activeSubmission.status === 'wrong_answer' ||
            activeSubmission.status === 'compilation_error' ||
            activeSubmission.status === 'runtime_error' ||
            activeSubmission.status === 'time_limit_exceeded' ||
            activeSubmission.status === undefined
          ) {
            validSubmission = activeSubmission;
          }
        }
      }

      if (validSubmission) {
         submitCompleted = true;
      } else if (activeSubmission && (
         activeSubmission.status === 'accepted' ||
         activeSubmission.status === 'wrong_answer' ||
         activeSubmission.status === 'compilation_error' ||
         activeSubmission.status === 'runtime_error' ||
         activeSubmission.status === 'time_limit_exceeded'
      )) {
         submitCompleted = true;
      }

      const initialState: ProblemWorkspaceState = {
        problem: null,
        loading: true,
        error: '',
        selectedLanguage: activeSubmission?.language || validSubmission?.language || 'Java',
        code: '',
        customInput: '',
        executionResult: null,
        executionError: '',
        submitCompleted,
        timeTakenSeconds: 0,
        testSubmissionState: activeSubmission ? {
          submissionId: activeSubmission.submissionId,
          problemId: activeProblemId,
          status: activeSubmission.status as any,
          language: activeSubmission.language || 'Java',
          score: activeSubmission.score,
          passedTestCases: activeSubmission.passedTestCases,
          totalTestCases: activeSubmission.totalTestCases,
        } : undefined,
        validSelectedSubmission: validSubmission ? {
          submissionId: validSubmission.submissionId,
          problemId: activeProblemId,
          status: validSubmission.status as any,
          language: validSubmission.language || 'Java',
          score: validSubmission.score,
          passedTestCases: validSubmission.passedTestCases,
          totalTestCases: validSubmission.totalTestCases,
        } : undefined,
      };

      void fetchProblemData();

      return {
        ...prev,
        [activeProblemId]: initialState
      };
    });
  }, [activeProblemId, problems, safeIndex, initialSubmissions]);

  // Timer: Add 1 second every second to the active problem's timeTakenSeconds
  useEffect(() => {
    if (!activeProblemId) return;

    const timer = setInterval(() => {
      setProblemStates(prev => {
        const state = prev[activeProblemId];
        if (!state || state.loading || !state.problem) return prev;
        
        return {
          ...prev,
          [activeProblemId]: {
            ...state,
            timeTakenSeconds: (state.timeTakenSeconds || 0) + 1,
          }
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeProblemId]);

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
    timeTakenSeconds: 0,
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

  // Polling Effect for Test Mode
  useEffect(() => {
    if (!testContext || !activeProblemId) return;
    
    const activeState = problemStates[activeProblemId];
    if (!activeState?.testSubmissionState) return;
    
    const { status, submissionId } = activeState.testSubmissionState;
    if (status !== 'queued' && status !== 'running') return;

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const response = await pollTestSubmission(testContext.attemptId, submissionId);
        
        // Guard against stale responses (submission ID changed in the meantime)
        setProblemStates(prev => {
           const currentState = prev[activeProblemId];
           if (currentState?.testSubmissionState?.submissionId !== submissionId) {
              return prev; // Active submission changed, ignore this polling result
           }
           
           if (!isMounted) return prev;

           const newStatus = response.status;
           const isValidFinalized = (
             newStatus === 'accepted' ||
             newStatus === 'wrong_answer' ||
             newStatus === 'compilation_error' ||
             newStatus === 'runtime_error' ||
             newStatus === 'time_limit_exceeded'
           );

           let nextValidSubmission = currentState.validSelectedSubmission;
           if (isValidFinalized) {
             nextValidSubmission = response;
           }

           return {
             ...prev,
             [activeProblemId]: {
                ...currentState,
                testSubmissionState: response,
                validSelectedSubmission: nextValidSubmission,
                submitCompleted: !!nextValidSubmission, // Mark completed if valid finalized status exists
             }
           };
        });
        
        if (
           response.status !== 'queued' && 
           response.status !== 'running'
        ) {
           clearInterval(interval);
        }
      } catch (err) {
        // If error fetching poll, don't crash, just let the next interval try, unless 403 or similar
        // For simplicity, log and continue, unless it's a fatal error.
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [testContext, activeProblemId, problemStates[activeProblemId]?.testSubmissionState?.status, problemStates[activeProblemId]?.testSubmissionState?.submissionId]);

  const handleRunCode = async () => {
    if (!activeState.problem || running || submitting) return;

    try {
      setRunning(true);
      updateActiveState({ executionError: '', executionResult: null });

      if (testContext) {
        const result = await runTestCode(
          testContext.attemptId, 
          testContext.sectionId, 
          activeState.problem._id, 
          {
            language: activeState.selectedLanguage,
            sourceCode: activeState.code,
            customInput: activeState.customInput,
          }
        );
        updateActiveState({ executionResult: result });
      } else {
        const result = await runCode({
          problemId: activeState.problem._id,
          language: activeState.selectedLanguage,
          sourceCode: activeState.code,
        });
        updateActiveState({ executionResult: result });
      }
    } catch (err: any) {
      if (err.status === 503) {
        updateActiveState({ executionError: 'Code execution is temporarily unavailable.' });
      } else if (err.status === 429) {
        updateActiveState({ executionError: 'Too many execution requests. Please wait a moment and try again.' });
      } else {
        updateActiveState({ executionError: err.message || 'Failed to run code' });
      }
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!activeState.problem || running || submitting) return;

    try {
      setSubmitting(true);
      updateActiveState({ executionError: '', executionResult: null });

      if (testContext) {
        const result = await submitTestCode(
          testContext.attemptId,
          testContext.sectionId,
          activeState.problem._id,
          {
            language: activeState.selectedLanguage,
            sourceCode: activeState.code,
          }
        );
        
        updateActiveState({
          testSubmissionState: {
            submissionId: result.submissionId,
            problemId: activeState.problem._id,
            status: result.status,
            language: activeState.selectedLanguage,
          },
          submitCompleted: false, // will become true upon successful polling termination
        });
      } else {
        const result = await runCode({
          problemId: activeState.problem._id,
          language: activeState.selectedLanguage,
          sourceCode: activeState.code,
          customInput: activeState.customInput,
        });

        updateActiveState({ executionResult: result, submitCompleted: true });
      }
    } catch (err: any) {
      if (err.status === 503) {
        updateActiveState({ executionError: 'Code execution is temporarily unavailable.' });
      } else if (err.status === 429) {
        updateActiveState({ executionError: 'Too many execution requests. Please wait a moment and try again.' });
      } else {
        updateActiveState({ executionError: err.message || 'Failed to submit code' });
      }
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