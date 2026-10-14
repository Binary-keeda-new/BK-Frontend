'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { UserCodingProblem } from '../../practice/test/types/test.types';
import { getCodingProblem } from '../services/codingProblemService';
import {
  runCode,
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

export const getLanguageStarterCode = (language: string, templates?: Record<string, string>): string => {
  if (templates?.[language] && typeof templates[language] === 'string' && templates[language].trim() !== '') {
    // If template has single-line joined statements, ensure a newline exists between split() and print
    const templateText = templates[language];
    if (language === 'Python' && templateText.includes('split())print(')) {
      return templateText.replace('split())print(', 'split())\nprint(');
    }
    return templateText;
  }
  switch (language) {
    case 'Python':
      return '# Write your solution here\na, b = map(int, input().split())\nprint(a + b)\n';
    case 'C++':
      return '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}\n';
    case 'C':
      return '#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    return 0;\n}\n';
    case 'JavaScript':
      return '// Write your solution here\n';
    case 'Java':
    default:
      return 'public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}\n';
  }
};

export const getDraftStorageKey = (
  problemId: string,
  language: string,
  testContext?: { attemptId: string; sectionId: string }
): string => {
  if (testContext?.attemptId && testContext?.sectionId) {
    return `emple_test_draft_${testContext.attemptId}_${testContext.sectionId}_${problemId}_${language}`;
  }
  return `emple_practice_draft_${problemId}_${language}`;
};

export default function useCodingWorkspace(
  problems: UserCodingProblem[],
  initialSubmissions: any[] = [],
  testContext?: { attemptId: string; sectionId: string }
) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const safeIndex = problems.length > 0
    ? Math.min(Math.max(0, currentProblemIndex), problems.length - 1)
    : 0;

  const setClampedProblemIndex = useCallback((idx: number | ((prev: number) => number)) => {
    setCurrentProblemIndex((prev) => {
      const next = typeof idx === 'function' ? idx(prev) : idx;
      return problems.length > 0 ? Math.min(Math.max(0, next), problems.length - 1) : 0;
    });
  }, [problems.length]);

  const rawProblem = problems[safeIndex];
  const activeProblemId = typeof rawProblem === 'string'
    ? rawProblem
    : (rawProblem as any)?._id || (rawProblem as any)?.id || (rawProblem as any)?.problemId || '';

  const [problemStates, setProblemStates] = useState<Record<string, ProblemWorkspaceState>>({});

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const problemsRef = useRef(problems);
  problemsRef.current = problems;

  const initialSubmissionsRef = useRef(initialSubmissions);
  initialSubmissionsRef.current = initialSubmissions;

  const testContextRef = useRef(testContext);
  testContextRef.current = testContext;

  const fetchingIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!activeProblemId) return;

    // Check if we already have this problem loaded or initialized
    if (problemStates[activeProblemId]) return;

    const currentProblems = problemsRef.current;
    const currentSubmissions = initialSubmissionsRef.current;
    const currentTestContext = testContextRef.current;

    const rawProblemObj = (currentProblems.find(
      (p) =>
        (p as any)._id === activeProblemId ||
        (p as any).problemId === activeProblemId ||
        (p as any).id === activeProblemId
    ) as any) || (typeof rawProblem === 'object' ? rawProblem : { _id: activeProblemId });

    const canonicalId = activeProblemId;

    const hasDirectTemplates = Boolean(
      rawProblemObj.codeTemplates &&
        rawProblemObj.languages &&
        Object.keys(rawProblemObj.codeTemplates).length > 0
    );

    if (hasDirectTemplates) {
      const matchingSubmissions = (currentSubmissions || []).filter(
        (sub) => sub.problemId?.toString() === canonicalId.toString()
      );
      let savedSubmission =
        matchingSubmissions.length > 0
          ? matchingSubmissions[matchingSubmissions.length - 1]
          : null;

      let lang = savedSubmission?.language;
      if (savedSubmission && lang && !rawProblemObj.languages?.includes(lang)) {
        savedSubmission = null;
      }

      lang = savedSubmission?.language || rawProblemObj.languages?.[0] || 'Java';

      let initialCode = savedSubmission?.sourceCode;

      if (typeof window !== 'undefined') {
        const draftKey = getDraftStorageKey(canonicalId, lang, currentTestContext);
        const localDraft = localStorage.getItem(draftKey);
        if (localDraft) {
          initialCode = localDraft;
        }
      }

      if (typeof initialCode !== 'string') {
        const prefix = rawProblemObj.lockedPrefixTemplates?.[lang] || '';
        const editable = getLanguageStarterCode(lang, rawProblemObj.codeTemplates);
        const suffix = rawProblemObj.lockedSuffixTemplates?.[lang] || '';
        initialCode = `${prefix}${editable}${suffix}`;
      }

      let restoredResult: ExecutionResponseData | null = null;
      if (savedSubmission) {
        restoredResult = {
          accepted: savedSubmission.accepted,
          passedCount: savedSubmission.passedCount || 0,
          totalCount: savedSubmission.totalCount || 0,
          results: savedSubmission.results || [],
        };
      }

      setProblemStates((prev) => {
        if (prev[canonicalId]?.problem) return prev;
        return {
          ...prev,
          [canonicalId]: {
            problem: rawProblemObj,
            loading: false,
            error: '',
            selectedLanguage: lang,
            code: initialCode,
            customInput: '',
            executionResult: restoredResult,
            executionError: '',
            submitCompleted: Boolean(savedSubmission),
            timeTakenSeconds: savedSubmission?.timeTakenSeconds || 0,
            testSubmissionState: savedSubmission
              ? {
                  submissionId: savedSubmission.submissionId || savedSubmission._id || '',
                  problemId: canonicalId,
                  status: savedSubmission.accepted ? 'accepted' : 'wrong_answer',
                  language: lang,
                }
              : undefined,
            validSelectedSubmission: savedSubmission
              ? {
                  submissionId: savedSubmission.submissionId || savedSubmission._id || '',
                  problemId: canonicalId,
                  status: savedSubmission.accepted ? 'accepted' : 'wrong_answer',
                  language: lang,
                  accepted: savedSubmission.accepted,
                  passedCount: savedSubmission.passedCount || 0,
                  totalCount: savedSubmission.totalCount || 0,
                  results: savedSubmission.results || [],
                }
              : undefined,
          },
        };
      });
      return;
    }

    // Otherwise, fetch asynchronously
    if (fetchingIdsRef.current.has(canonicalId)) return;
    fetchingIdsRef.current.add(canonicalId);

    // Set initial loading state
    setProblemStates((prev) => {
      if (prev[canonicalId]) return prev;
      return {
        ...prev,
        [canonicalId]: {
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
        },
      };
    });

    let isMounted = true;
    const fetchProblemData = async () => {
      try {
        let data = rawProblemObj;
        if (!rawProblemObj.codeTemplates || !rawProblemObj.languages) {
          data = await getCodingProblem(canonicalId);
        }

        if (!isMounted) return;

        const matchingSubmissions = (currentSubmissions || []).filter(
          (sub) => sub.problemId?.toString() === canonicalId.toString()
        );
        let savedSubmission =
          matchingSubmissions.length > 0
            ? matchingSubmissions[matchingSubmissions.length - 1]
            : null;

        let lang = savedSubmission?.language;
        if (savedSubmission && lang && Array.isArray(data.languages) && !data.languages.includes(lang)) {
          savedSubmission = null;
        }

        lang = savedSubmission?.language || data.languages?.[0] || 'Java';

        let initialCode = savedSubmission?.sourceCode;
        if (typeof window !== 'undefined') {
          const draftKey = getDraftStorageKey(canonicalId, lang, currentTestContext);
          const localDraft = localStorage.getItem(draftKey);
          if (localDraft) {
            initialCode = localDraft;
          }
        }

        if (typeof initialCode !== 'string') {
          const prefix = data.lockedPrefixTemplates?.[lang] || '';
          const editable = getLanguageStarterCode(lang, data.codeTemplates);
          const suffix = data.lockedSuffixTemplates?.[lang] || '';
          initialCode = `${prefix}${editable}${suffix}`;
        }

        let restoredResult: ExecutionResponseData | null = null;
        if (savedSubmission) {
          restoredResult = {
            accepted: savedSubmission.accepted,
            passedCount: savedSubmission.passedCount || 0,
            totalCount: savedSubmission.totalCount || 0,
            results: savedSubmission.results || [],
          };
        }

        setProblemStates((currentStates) => ({
          ...currentStates,
          [canonicalId]: {
            ...currentStates[canonicalId],
            problem: data,
            loading: false,
            error: '',
            selectedLanguage: lang,
            code: initialCode,
            executionResult: restoredResult,
            submitCompleted: Boolean(savedSubmission),
            timeTakenSeconds: savedSubmission?.timeTakenSeconds || 0,
            testSubmissionState: savedSubmission
              ? {
                  submissionId: savedSubmission.submissionId || savedSubmission._id || '',
                  problemId: canonicalId,
                  status: savedSubmission.accepted ? 'accepted' : 'wrong_answer',
                  language: lang,
                }
              : undefined,
            validSelectedSubmission: savedSubmission
              ? {
                  submissionId: savedSubmission.submissionId || savedSubmission._id || '',
                  problemId: canonicalId,
                  status: savedSubmission.accepted ? 'accepted' : 'wrong_answer',
                  language: lang,
                  accepted: savedSubmission.accepted,
                  passedCount: savedSubmission.passedCount || 0,
                  totalCount: savedSubmission.totalCount || 0,
                  results: savedSubmission.results || [],
                }
              : undefined,
          },
        }));
      } catch (err) {
        if (!isMounted) return;

        const fallbackLang = 'Java';
        const fallbackTemplates = {
          Java: getLanguageStarterCode('Java'),
          Python: getLanguageStarterCode('Python'),
          'C++': getLanguageStarterCode('C++'),
          C: getLanguageStarterCode('C'),
        };

        const fallbackProblem = {
          ...rawProblemObj,
          title: rawProblemObj.title || 'Coding Problem',
          statement: rawProblemObj.statement || 'Write code to solve the problem.',
          languages: Array.isArray(rawProblemObj.languages) && rawProblemObj.languages.length > 0
            ? rawProblemObj.languages
            : [fallbackLang, 'Python', 'C++', 'C'],
          codeTemplates: rawProblemObj.codeTemplates || fallbackTemplates,
        };

        setProblemStates((currentStates) => ({
          ...currentStates,
          [canonicalId]: {
            ...currentStates[canonicalId],
            problem: fallbackProblem,
            loading: false,
            error: '',
            selectedLanguage: fallbackLang,
            code: getLanguageStarterCode(fallbackLang, fallbackProblem.codeTemplates),
            customInput: '',
            executionResult: null,
            executionError: '',
            submitCompleted: false,
            timeTakenSeconds: 0,
          },
        }));
      } finally {
        fetchingIdsRef.current.delete(canonicalId);
      }
    };

    void fetchProblemData();

    return () => {
      isMounted = false;
    };
  }, [activeProblemId, problems.length]);

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

  useEffect(() => {
    if (!activeProblemId) return;
    const currentState = problemStates[activeProblemId];
    if (!currentState || currentState.loading || !currentState.problem) return;

    const storageKey = getDraftStorageKey(activeProblemId, currentState.selectedLanguage, testContext);
    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, currentState.code);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    activeProblemId,
    problemStates[activeProblemId]?.code,
    problemStates[activeProblemId]?.selectedLanguage,
    testContext?.attemptId,
    testContext?.sectionId,
  ]);

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

    let newCode: string | null = null;
    if (typeof window !== 'undefined') {
      const draftKey = getDraftStorageKey(activeProblemId, language, testContext);
      newCode = localStorage.getItem(draftKey);
    }

    if (!newCode) {
      const prefix = activeState.problem.lockedPrefixTemplates?.[language] || '';
      const editable = getLanguageStarterCode(language, activeState.problem.codeTemplates);
      const suffix = activeState.problem.lockedSuffixTemplates?.[language] || '';
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

  const attemptId = testContext?.attemptId;
  useEffect(() => {
    if (!attemptId || !activeProblemId) return;

    const activeState = problemStates[activeProblemId];
    if (!activeState?.testSubmissionState) return;

    const { status, submissionId } = activeState.testSubmissionState;
    if (status !== 'queued' && status !== 'running') return;

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const response = await pollTestSubmission(attemptId, submissionId);

        setProblemStates(prev => {
          const currentState = prev[activeProblemId];
          if (currentState?.testSubmissionState?.submissionId !== submissionId) {
            return prev;
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
              submitCompleted: !!nextValidSubmission,
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
        // Polling retry
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [
    attemptId,
    activeProblemId,
    problemStates[activeProblemId]?.testSubmissionState?.status,
    problemStates[activeProblemId]?.testSubmissionState?.submissionId,
  ]);

  const handleRunCode = async () => {
    if (!activeState.problem || running || submitting) return;
    const targetProblemId = activeProblemId || activeState.problem?._id || activeState.problem?.problemId || '';

    try {
      setRunning(true);
      updateActiveState({ executionError: '', executionResult: null });

      if (testContext) {
        const result = await runTestCode(
          testContext.attemptId,
          testContext.sectionId,
          targetProblemId,
          {
            language: activeState.selectedLanguage,
            sourceCode: activeState.code,
            customInput: activeState.customInput,
          }
        );
        updateActiveState({ executionResult: result });
      } else {
        const result = await runCode({
          problemId: targetProblemId,
          language: activeState.selectedLanguage,
          sourceCode: activeState.code,
          customInput: activeState.customInput,
        });
        updateActiveState({ executionResult: result });
      }
    } catch (err: any) {
      const status = err?.status || err?.statusCode;
      if (status === 503) {
        updateActiveState({ executionError: 'Code execution is currently unavailable. Your code is still saved.' });
      } else if (status === 429) {
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
    const targetProblemId = activeProblemId || activeState.problem?._id || activeState.problem?.problemId || '';

    try {
      setSubmitting(true);
      updateActiveState({ executionError: '', executionResult: null });

      if (testContext) {
        const result = await submitTestCode(
          testContext.attemptId,
          testContext.sectionId,
          targetProblemId,
          {
            language: activeState.selectedLanguage,
            sourceCode: activeState.code,
          }
        );

        updateActiveState({
          testSubmissionState: {
            submissionId: result.submissionId,
            problemId: targetProblemId,
            status: result.status,
            language: activeState.selectedLanguage,
          },
          submitCompleted: false,
        });
      } else {
        const result = await runCode({
          problemId: targetProblemId,
          language: activeState.selectedLanguage,
          sourceCode: activeState.code,
          customInput: activeState.customInput,
        });

        updateActiveState({ executionResult: result, submitCompleted: true });
      }
    } catch (err: any) {
      const status = err?.status || err?.statusCode;
      if (status === 503) {
        updateActiveState({ executionError: 'Code execution is currently unavailable. Your code is still saved.' });
      } else if (status === 429) {
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
    setCurrentProblemIndex: setClampedProblemIndex,
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

    problemStates,
    problems,
  };
}