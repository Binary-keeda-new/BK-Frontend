'use client';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { UserTestSection } from '../types/test.types';
import {
  getTestSectionAttempt,
  submitTestSectionAttempt,
  saveTestSectionAnswers,
  syncTimerHeartbeat,
  resumeAttemptTimer,
  forceSubmitTestAttempt,
  type TestSectionAttemptData,
  type HeartbeatPayload,
} from '../services/testAttempt.service';
import QuestionCard from '../components/test-attempt/QuestionCard';
import QuestionPanel from '../components/test-attempt/QuestionPanel';
import SubmitConfirmModal from '../components/test-attempt/SubmitConfirmModal';
import TestAttemptHeader from '../components/test-attempt/TestAttemptHeader';
import type { Status } from '../components/test-attempt/testAttempt.types'
import { formatTimeLeft, getQuestionMode } from '../components/test-attempt/testAttempt.utils';
import TestCalculator from '../components/test-attempt/TestCalculator';
import CodingWorkspace from '@/features/user/coding/components/codingWorkspace';
import TestVirtualKeyboard from '../components/test-attempt/TestVirtualKeyboard';

type Props = {
  attemptId: string;
  attemptExpiresAt?: string | null;
  initialRemainingSeconds?: number;
  initialQuestionIndex?: number;
  warningsLeft?: number;
  securityWarnings?: number;
  testId: string;
  section: UserTestSection;
  sectionIndex: number;
  isAttemptActive?: boolean;
  onBackToSections: () => void;
  onSectionCompleted: (sectionId: string) => void;
  onAttemptStateChange?: (status: import('../types/test.types').TestAttemptStatus, requiresReview?: boolean) => void;
  minTimeBeforeSubmit?: number;
  allowCalculator?: boolean;
  allowVirtualKeyboard?: boolean;
};

const EMPTY_CODING_SUBMISSIONS: any[] = [];

export default function TestAttempt({
  attemptId,
  attemptExpiresAt,
  initialRemainingSeconds,
  initialQuestionIndex = 0,
  warningsLeft,
  securityWarnings = 0,
  section,
  sectionIndex,
  isAttemptActive = true,
  onBackToSections,
  onSectionCompleted,
  onAttemptStateChange,
  minTimeBeforeSubmit = 0,
  allowCalculator = false,
  allowVirtualKeyboard = false,
}: Props) {
  const [data, setData] = useState<TestSectionAttemptData | null>(null);
  const [current, setCurrent] = useState(initialQuestionIndex >= 0 ? initialQuestionIndex : 0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ [initialQuestionIndex >= 0 ? initialQuestionIndex : 0]: true });
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timings, setTimings] = useState<Record<string, number>>({});
  const [currentQuestionStartedAt, setCurrentQuestionStartedAt] = useState<number>(Date.now());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptStartedAt] = useState(Date.now());
  const [canSubmit, setCanSubmit] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Active Attempt Timer (measured in seconds)
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(() => {
    if (typeof initialRemainingSeconds === 'number') {
      return Math.max(0, initialRemainingSeconds);
    }
    if (section?.duration) {
      return section.duration * 60;
    }
    return null;
  });

  const timeLeftMs = useMemo(() => {
    return remainingSeconds !== null ? Math.max(0, remainingSeconds * 1000) : null;
  }, [remainingSeconds]);



  useEffect(() => {
    if (!isAttemptActive) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAttemptActive]);

  // Phase 6C: Autosave state
  const serverRevisionRef = useRef(0);
  const localRevisionRef = useRef(0);
  const isDirtyRef = useRef(false);
  const isSavingRef = useRef(false);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const periodicTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedSnapshotRef = useRef<string>('');
  const sectionIdRef = useRef(section._id);
  const attemptIdRef = useRef(attemptId);
  const answersRef = useRef(answers);
  const timingsRef = useRef(timings);
  const currentQuestionStartedAtRef = useRef(currentQuestionStartedAt);

  const isAttemptActiveRef = useRef(isAttemptActive);

  useEffect(() => {
    isAttemptActiveRef.current = isAttemptActive;
    if (!isAttemptActive) {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
      isDirtyRef.current = false;
      isSavingRef.current = false;
    }
  }, [isAttemptActive]);

  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
      isDirtyRef.current = false;
      isSavingRef.current = false;
    };
  }, []);

  const questions = useMemo(() => {
    if (!data?.questions) return [];
    return data.questions.map((q: any) => ({
      ...q,
      questionId: q.questionId || q._id || q.id || '',
    })).filter((q: any) => Boolean(q.questionId));
  }, [data?.questions]);

  const totalQuestions = questions.length;
  const q = questions[current];

  const qRef = useRef(q);

  useEffect(() => {
    answersRef.current = answers;
    timingsRef.current = timings;
    qRef.current = q;
    currentQuestionStartedAtRef.current = currentQuestionStartedAt;
  }, [answers, timings, q, currentQuestionStartedAt]);


  useEffect(() => {
    if (!minTimeBeforeSubmit) {
      setCanSubmit(true);
      return;
    }

    const timer = setInterval(() => {
      const elapsedMinutes = (Date.now() - attemptStartedAt) / 1000 / 60;

      if (elapsedMinutes >= minTimeBeforeSubmit) {
        setCanSubmit(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [attemptStartedAt, minTimeBeforeSubmit]);

  const selected = useMemo(() => {
    if (!q) return [];
    return answers[q.questionId] ?? [];
  }, [answers, q]);

  const loadSection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getTestSectionAttempt(attemptId, section._id);
      setData(result);

      const answerMap: Record<string, string[]> = {};
      const initialTimings: Record<string, number> = {};
      
      for (const answer of result.answers || []) {
        const qId = (answer as any).questionId || (answer as any)._id || (answer as any).id;
        if (qId) {
          answerMap[qId] = answer.selectedOptions ?? [];
        }
      }

      let initialAnswers = answerMap;
      let initialVisited = { 0: true };
      let initialFlagged: Record<number, boolean> = {};

      // Phase 6C: Reconciliation
      let serverRev = result.answerRevision ?? 0;
      let localRev = serverRev;
      let localWon = false;

      try {
        const localRaw = localStorage.getItem(`emple_test_progress_${attemptId}_${section._id}`);
        if (localRaw) {
          const localData = JSON.parse(localRaw);
          const localStoredRev = localData.answerRevision;
          const hasMeaningfulLocalAnswers = localData.answers && Object.keys(localData.answers).length > 0;

          if (localStoredRev !== undefined) {
             if (localStoredRev > serverRev) {
               initialAnswers = localData.answers ?? initialAnswers;
               localRev = localStoredRev;
               localWon = true;
             }
          } else {
             // Legacy
             if (serverRev === 0 && hasMeaningfulLocalAnswers) {
               initialAnswers = localData.answers;
               localRev = 1;
               localWon = true;
             }
          }

          if (localData.timings) {
            Object.assign(initialTimings, localData.timings);
          }
          if (localData.visited) initialVisited = localData.visited;
          if (localData.flagged) initialFlagged = localData.flagged;
        }
      } catch (e) {
        console.error('Failed to parse local storage progress', e);
      }

      serverRevisionRef.current = serverRev;
      localRevisionRef.current = localWon ? Math.max(localRev, serverRev) + 1 : serverRev;
      isDirtyRef.current = localWon;
      lastSavedSnapshotRef.current = JSON.stringify(localWon ? answerMap : initialAnswers); 
      sectionIdRef.current = section._id;
      attemptIdRef.current = attemptId;

      setAnswers(initialAnswers);
      setTimings(initialTimings);
      setCurrentQuestionStartedAt(Date.now());
      let restoredCurrent = typeof initialQuestionIndex === 'number' && initialQuestionIndex >= 0 ? initialQuestionIndex : 0;
      try {
        const localRaw = localStorage.getItem(`emple_test_progress_${attemptId}_${section._id}`);
        if (localRaw) {
          const localData = JSON.parse(localRaw);
          if (typeof localData?.currentQuestion === 'number' && localData.currentQuestion >= 0) {
            restoredCurrent = localData.currentQuestion;
          }
        }
      } catch (e) {}
      setCurrent(restoredCurrent);
      setVisited((prev) => ({ ...prev, ...initialVisited, [restoredCurrent]: true }));
      setFlagged(initialFlagged);
    } catch (err) {
      if (isAttemptActiveRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to load test section');
      }
    } finally {
      setLoading(false);
    }
  }, [attemptId, section._id]);

  useEffect(() => {
    void loadSection();
  }, [loadSection]);

  // Phase 6C: Autosave Implementation
  const performAutosave = useCallback(async () => {
    if (!isAttemptActiveRef.current || section.type === 'coding' || !attemptIdRef.current || !sectionIdRef.current || submitting || isSavingRef.current || !isDirtyRef.current) return;
    if (sectionIdRef.current !== section._id) return; // guard against section transition

    const currentAnswers = answersRef.current;
    const currentTimings = timingsRef.current;
    const currentQ = qRef.current;
    const currentQStartedAt = currentQuestionStartedAtRef.current;

    const snapshotAnswers = Object.entries(currentAnswers).map(([questionId, selectedOptions]) => {
      let extraTime = 0;
      if (currentQ && currentQ.questionId === questionId) {
        extraTime = Math.floor((Date.now() - currentQStartedAt) / 1000);
      }
      return {
        questionId,
        selectedOptions,
        timeTakenSeconds: (currentTimings[questionId] || 0) + extraTime,
      };
    });

    const snapshotString = JSON.stringify(currentAnswers);
    if (snapshotString === lastSavedSnapshotRef.current) {
      isDirtyRef.current = false;
      return;
    }

    const revisionToSave = Math.max(localRevisionRef.current, serverRevisionRef.current + 1);
    localRevisionRef.current = revisionToSave;
    isSavingRef.current = true;

    try {
      const res = await saveTestSectionAnswers(attemptIdRef.current, sectionIdRef.current, {
        revision: revisionToSave,
        answers: snapshotAnswers,
      });

      if (sectionIdRef.current !== section._id) return; // ignore if moved away

      if (res.saved) {
        serverRevisionRef.current = res.currentRevision ?? revisionToSave;
        if (JSON.stringify(answersRef.current) === snapshotString) {
          isDirtyRef.current = false; 
        }
        lastSavedSnapshotRef.current = snapshotString;
        
        try {
          const key = `emple_test_progress_${attemptIdRef.current}_${sectionIdRef.current}`;
          const localRaw = localStorage.getItem(key);
          if (localRaw) {
             const localData = JSON.parse(localRaw);
             localData.answerRevision = serverRevisionRef.current;
             localStorage.setItem(key, JSON.stringify(localData));
          }
        } catch(e) {}
      } else if (res.reason === 'stale_revision') {
        serverRevisionRef.current = res.currentRevision;
      }
    } catch (e) {
      // SILENT HANDLING OF LOCKED / COMPLETED / STALE AUTOSAVE ERRORS
      isDirtyRef.current = false;
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
    } finally {
      if (sectionIdRef.current === section._id) {
        isSavingRef.current = false;
      }
    }
  }, [section._id, section.type, submitting]);

  useEffect(() => {
    if (!isAttemptActive || section.type === 'coding' || loading || submitting) return;

    if (JSON.stringify(answers) !== lastSavedSnapshotRef.current) {
      isDirtyRef.current = true;
    }

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);

    autosaveTimerRef.current = setTimeout(() => {
      if (isAttemptActiveRef.current && isDirtyRef.current && !isSavingRef.current) {
        void performAutosave();
      }
    }, 2000);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [answers, performAutosave, section.type, loading, submitting, isAttemptActive]);

  useEffect(() => {
    if (!isAttemptActive || section.type === 'coding' || loading || submitting) return;

    periodicTimerRef.current = setInterval(() => {
      if (isAttemptActiveRef.current && isDirtyRef.current && !isSavingRef.current) {
        void performAutosave();
      }
    }, 30000);

    return () => {
      if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
    };
  }, [performAutosave, section.type, loading, submitting, isAttemptActive]);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOffline(false);
      try {
        const resumeRes = await resumeAttemptTimer(attemptId);
        if (typeof resumeRes.remainingSeconds === 'number') {
          setRemainingSeconds(resumeRes.remainingSeconds);
        }
      } catch (e) {
        console.error('Failed to reconcile timer on reconnect', e);
      }
      if (isDirtyRef.current && !isSavingRef.current && section.type !== 'coding') {
        void performAutosave();
      }
    };
    const handleOffline = () => {
      setIsOffline(true);
      try {
        const stateToSave = {
          currentQuestion: current,
          answers: answersRef.current,
          visited,
          flagged,
          timings: timingsRef.current,
          answerRevision: localRevisionRef.current,
          timestamp: Date.now(),
        };
        localStorage.setItem(`emple_test_progress_${attemptId}_${section._id}`, JSON.stringify(stateToSave));
      } catch (e) {}
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [attemptId, performAutosave, section._id, section.type, current, visited, flagged]);

  const handleBackToSections = useCallback(() => {
     if (isDirtyRef.current && !isSavingRef.current && section.type !== 'coding') {
       void performAutosave();
     }
     onBackToSections();
  }, [onBackToSections, performAutosave, section.type]);

  useEffect(() => {
    if (!data || section.type === 'coding' || loading) return;
    try {
      const stateToSave = {
        currentQuestion: current,
        answers,
        visited,
        flagged,
        timings,
        answerRevision: localRevisionRef.current,
        timestamp: Date.now()
      };
      localStorage.setItem(`emple_test_progress_${attemptId}_${section._id}`, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save progress to local storage', e);
    }
  }, [current, answers, visited, flagged, timings, data, attemptId, section._id, section.type, loading]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;

    // Immediately cancel pending autosave timers and dirty tracking before submit
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
    isDirtyRef.current = false;

    try {
      setSubmitting(true);
      setError(null);

      const finalAnswers = Object.entries(answers).map(([questionId, selectedOptions]) => {
        // Calculate time for the question we're currently on when submitting
        let extraTime = 0;
        if (q && q.questionId === questionId) {
          extraTime = Math.floor((Date.now() - currentQuestionStartedAt) / 1000);
        }
        
        return {
          questionId,
          selectedOptions,
          timeTakenSeconds: (timings[questionId] || 0) + extraTime,
        };
      });

      await submitTestSectionAttempt(
        attemptId,
        section._id,
        finalAnswers
      );

      localStorage.removeItem(`emple_test_progress_${attemptId}_${section._id}`);

      onSectionCompleted(section._id);
    } catch (err) {
      const msg = err instanceof Error ? err.message.toLowerCase() : 'failed to submit section';
      if (hasAutoSubmitted.current) {
        onSectionCompleted(section._id);
      } else if (
        msg.includes('expired') ||
        msg.includes('finalizing') ||
        msg.includes('submitted') ||
        msg.includes('force_submitted') ||
        msg.includes('completed') ||
        msg.includes('locked')
      ) {
        if (onAttemptStateChange) {
           let status: import('../types/test.types').TestAttemptStatus = 'submitted';
           if (msg.includes('finalizing')) status = 'finalizing';
           else if (msg.includes('force_submitted')) status = 'force_submitted';
           onAttemptStateChange(status);
        } else {
           onSectionCompleted(section._id);
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to submit section');
      }
    } finally {
      setSubmitting(false);
      setShowSubmitConfirm(false);
    }
  }, [answers, attemptId, onSectionCompleted, onAttemptStateChange, section._id, submitting, q, currentQuestionStartedAt, timings]);

  const openSubmitConfirm = useCallback(() => {
    if (submitting || loading || !canSubmit) return;
    setShowSubmitConfirm(true);
  }, [loading, submitting, canSubmit]);

  const handleOption = useCallback(
    (option: string) => {
      if (!q) return;

      const mode = getQuestionMode(q.questionType);

      setAnswers((prev) => {
        const currentSelected = prev[q.questionId] ?? [];

        const nextSelected =
          mode === 'mcq'
            ? currentSelected[0] === option
              ? []
              : [option]
            : currentSelected.includes(option)
            ? currentSelected.filter((item) => item !== option)
            : [...currentSelected, option];

        return {
          ...prev,
          [q.questionId]: nextSelected,
        };
      });
    },
    [q]
  );

  const formattedTimeLeft = useMemo(() => formatTimeLeft(timeLeftMs), [timeLeftMs]);

  // Active attempt 1-second tick (ONLY when attempt is active and candidate is online)
  useEffect(() => {
    if (!isAttemptActive || isOffline || loading || submitting || remainingSeconds === null || remainingSeconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAttemptActive, isOffline, loading, submitting, remainingSeconds]);

  // Auto-submit when active remaining time hits 0
  const hasAutoSubmitted = useRef(false);
  useEffect(() => {
    if (remainingSeconds === 0 && !submitting && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      if (section.type === 'coding') {
        forceSubmitTestAttempt(attemptId).then((res) => {
          if (onAttemptStateChange) {
            onAttemptStateChange(res.status, res.requiresReview);
          } else {
            onSectionCompleted(section._id);
          }
        }).catch(() => {
          onSectionCompleted(section._id);
        });
      } else {
        void handleSubmit();
      }
    }
  }, [remainingSeconds, submitting, handleSubmit, section.type, attemptId, onAttemptStateChange, onSectionCompleted, section._id]);

  // Periodic timer checkpoint with server (every 6 seconds while active and online)
  const currentRef = useRef(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!isAttemptActive || isOffline || loading || submitting || remainingSeconds === null || remainingSeconds <= 0) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const payload: HeartbeatPayload = {
          activeSectionId: section._id,
          activeQuestionId: qRef.current?.questionId || null,
          activeQuestionIndex: currentRef.current,
          isPaused: false,
        };

        const res = await syncTimerHeartbeat(attemptId, payload);
        if (res.isTerminated || res.remainingSeconds <= 0 || res.status !== 'in_progress') {
          if (!hasAutoSubmitted.current) {
            hasAutoSubmitted.current = true;
            if (onAttemptStateChange) {
              onAttemptStateChange(res.status || 'submitted');
            } else {
              onSectionCompleted(section._id);
            }
          }
          return;
        }

        if (typeof res.remainingSeconds === 'number') {
          setRemainingSeconds(res.remainingSeconds);
        }
      } catch (err) {
        // Network hiccups handled gracefully without interrupting active countdown
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [attemptId, isAttemptActive, isOffline, loading, submitting, remainingSeconds, section._id, onAttemptStateChange, onSectionCompleted]);

  const handleNatChange = useCallback(
    (value: string) => {
      if (!q) return;

      setAnswers((prev) => ({
        ...prev,
        [q.questionId]: value ? [value] : [],
      }));
    },
    [q]
  );

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= totalQuestions) return;

      // Update timing for the question we are leaving
      if (q) {
        const timeSpent = Math.floor((Date.now() - currentQuestionStartedAt) / 1000);
        setTimings((prev) => ({
          ...prev,
          [q.questionId]: (prev[q.questionId] || 0) + timeSpent,
        }));
      }

      setVisited((prev) => ({
        ...prev,
        [idx]: true,
      }));

      setCurrent(idx);
      setCurrentQuestionStartedAt(Date.now());
      setSidebarOpen(false);
    },
    [totalQuestions, q, currentQuestionStartedAt]
  );

  const toggleFlag = useCallback(() => {
    setFlagged((prev) => ({
      ...prev,
      [current]: !prev[current],
    }));
  }, [current]);

  const getStatus = useCallback(
    (idx: number): Status => {
      const question = questions[idx];
      if (!question) return 'not-visited';

      const selectedOptions = answers[question.questionId] ?? [];

      if (flagged[idx]) return 'flagged';
      if (selectedOptions.some((item) => item.trim() !== '')) return 'answered';
      if (visited[idx]) return 'not-attempted';

      return 'not-visited';
    },
    [answers, flagged, questions, visited]
  );

  const answeredCount = useMemo(() => {
    return questions.filter((question) => {
      const selectedOptions = answers[question.questionId] ?? [];
      return selectedOptions.some((item) => item.trim() !== '');
    }).length;
  }, [answers, questions]);

  const normalizedCodingProblems = useMemo(() => {
    const rawList: any[] = data?.codingProblems && data.codingProblems.length > 0
      ? data.codingProblems
      : section.codingProblems
      ? [...section.codingProblems]
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((cp) => cp.problemId)
      : section.codingProblemIds || [];

    return rawList.map((p: any) => {
      if (typeof p === 'string') {
        return { _id: p, problemId: p, title: 'Coding Problem' };
      }
      const id = p?.problemId || p?._id || p?.id || '';
      const finalId = typeof id === 'string' ? id : id?.problemId || id?._id || id?.id || '';
      return {
        ...p,
        _id: finalId,
        problemId: finalId,
      };
    }).filter((p: any) => Boolean(p.problemId || p._id));
  }, [data?.codingProblems, section.codingProblems, section.codingProblemIds]);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col min-h-0 bg-[#0b0c10] text-[var(--text,#f0f0f4)] select-none">
        <TestAttemptHeader
          sectionIndex={sectionIndex}
          current={0}
          totalQuestions={0}
          answeredCount={0}
          formattedTimeLeft={formattedTimeLeft}
          timeLeftMs={timeLeftMs}
          warningsLeft={warningsLeft}
          securityWarnings={securityWarnings}
          submitting={false}
          loading={true}
          canSubmit={false}
          onBackToSections={handleBackToSections}
          onOpenQuestions={() => {}}
          onSubmit={() => {}}
        />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[var(--orange,#f15a22)] border-t-transparent" />
            <p className="mt-3 text-sm text-[var(--muted2,#8a8a9a)]">Loading section...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex h-full w-full flex-col min-h-0 bg-[#0b0c10] text-[var(--text,#f0f0f4)] select-none">
        <TestAttemptHeader
          sectionIndex={sectionIndex}
          current={0}
          totalQuestions={0}
          answeredCount={0}
          formattedTimeLeft={formattedTimeLeft}
          timeLeftMs={timeLeftMs}
          warningsLeft={warningsLeft}
          securityWarnings={securityWarnings}
          submitting={false}
          loading={false}
          canSubmit={false}
          onBackToSections={handleBackToSections}
          onOpenQuestions={() => {}}
          onSubmit={() => {}}
        />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="max-w-md w-full rounded-2xl border border-[var(--border,#262936)] bg-[var(--surface,#161820)] p-6 text-center shadow-xl">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-[var(--text,#f0f0f4)] mb-2">Unable to Load Section</h3>
            <p className="text-sm text-[var(--muted2,#8a8a9a)] mb-6">{error}</p>
            <button
              type="button"
              onClick={handleBackToSections}
              className="rounded-xl bg-[var(--orange,#f15a22)] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#ff6830] transition"
            >
              ← Back to Sections
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (section.type === 'coding') {
    return (
      <CodingWorkspace
        problems={normalizedCodingProblems}
        initialSubmissions={(data as any)?.codingSubmissions || EMPTY_CODING_SUBMISSIONS}
        mode="test"
        attemptId={attemptId}
        sectionId={section._id}
        onBack={onBackToSections}
        formattedTimeLeft={formattedTimeLeft}
        timeLeftMs={timeLeftMs}
        onComplete={async (submissions) => {
          if (submitting) return;
          try {
            setSubmitting(true);
            await submitTestSectionAttempt(
              attemptId,
              section._id,
              [],
              submissions.map(s => ({
                problemId: s.problemId,
                submissionId: s.submissionId || '',
              }))
            );
            // Clean up local drafts on complete
            submissions.forEach(sub => {
              localStorage.removeItem(`emple_test_draft_${attemptId}_${section._id}_${sub.problemId}_${sub.language}`);
              localStorage.removeItem(`emple_draft_${sub.problemId}_${sub.language}`);
            });
            onSectionCompleted(section._id);
          } catch (err) {
            const msg = err instanceof Error ? err.message.toLowerCase() : '';
            if (
               msg.includes('expired') ||
               msg.includes('finalizing') ||
               msg.includes('submitted') ||
               msg.includes('force_submitted') ||
               msg.includes('completed') ||
               msg.includes('locked')
            ) {
               if (onAttemptStateChange) {
                  let status: import('../types/test.types').TestAttemptStatus = 'submitted';
                  if (msg.includes('finalizing')) status = 'finalizing';
                  else if (msg.includes('force_submitted')) status = 'force_submitted';
                  onAttemptStateChange(status);
               } else {
                  onSectionCompleted(section._id);
               }
            } else {
              console.error('Failed to submit coding section', err);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      />
    );
  }

  if (!data || !q) {
    return (
      <div className="flex h-full w-full flex-col min-h-0 bg-[#0b0c10] text-[var(--text,#f0f0f4)] select-none">
        <TestAttemptHeader
          sectionIndex={sectionIndex}
          current={0}
          totalQuestions={0}
          answeredCount={0}
          formattedTimeLeft={formattedTimeLeft}
          timeLeftMs={timeLeftMs}
          warningsLeft={warningsLeft}
          securityWarnings={securityWarnings}
          submitting={submitting}
          loading={loading}
          canSubmit={true}
          onBackToSections={handleBackToSections}
          onOpenQuestions={() => {}}
          onSubmit={() => onSectionCompleted(section._id)}
        />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="max-w-md w-full rounded-2xl border border-[var(--border,#262936)] bg-[var(--surface,#161820)] p-6 text-center shadow-xl">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-bold text-[var(--text,#f0f0f4)] mb-2">No Questions Available</h3>
            <p className="text-sm text-[var(--muted2,#8a8a9a)] mb-6">
              This section currently does not have any questions configured.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={handleBackToSections}
                className="rounded-xl border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-5 py-2.5 text-xs font-bold text-[var(--text,#f0f0f4)] hover:text-white transition"
              >
                ← Back to Sections
              </button>
              <button
                type="button"
                onClick={() => onSectionCompleted(section._id)}
                className="rounded-xl bg-[var(--orange,#f15a22)] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#ff6830] transition"
              >
                Complete Section →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mode = getQuestionMode(q.questionType);

  const panel = (
    <QuestionPanel
      current={current}
      totalQuestions={totalQuestions}
      answeredCount={answeredCount}
      submitting={submitting}
      loading={loading}
      canSubmit={canSubmit}
      getStatus={getStatus}
      goTo={goTo}
      onSubmit={openSubmitConfirm}
    />
  );

  return (
    <div className="flex h-full w-full flex-col min-h-0 overflow-hidden bg-[#0b0c10] text-[var(--text,#f0f0f4)] select-none">
      <TestAttemptHeader
        sectionIndex={sectionIndex}
        current={current}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        formattedTimeLeft={formattedTimeLeft}
        timeLeftMs={timeLeftMs}
        warningsLeft={warningsLeft}
        securityWarnings={securityWarnings}
        submitting={submitting}
        loading={loading}
        canSubmit={canSubmit}
        onBackToSections={handleBackToSections}
        onOpenQuestions={() => setSidebarOpen(true)}
        onSubmit={openSubmitConfirm}
        allowCalculator={allowCalculator}
        onOpenCalculator={() => setShowCalculator(true)}
        allowVirtualKeyboard={allowVirtualKeyboard}
        onOpenVirtualKeyboard={() => setShowVirtualKeyboard(true)}
      />

      {/* Main Center Area: Split between Question (75-80%) and Right Palette (20-25%) */}
      <main className="w-full max-w-[1920px] mx-auto flex flex-col p-3.5 sm:p-4 md:p-5 overflow-hidden">
        {isOffline && (
          <div className="shrink-0 mb-3 flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/15 p-2.5 text-xs font-semibold text-amber-300">
            <span className="text-lg">📡</span>
            <div>
              <p className="font-bold">Connection Lost</p>
              <p className="text-xs font-normal text-amber-200">
                Your test has been paused and your progress has been preserved. The timer will continue when you reconnect/resume.
              </p>
            </div>
          </div>
        )}

        {/* Shared Row: Question and Palette stretch to same height (occupying ~2/3 of screen) */}
        <div className="flex w-full flex-row gap-4 lg:gap-5 items-stretch h-[60vh] min-h-[360px] max-h-[580px]">
          {/* Left: Question Card (takes 75-80% width, stretches full height of row) */}
          <div className="flex-1 min-w-0 h-full">
            <QuestionCard
              question={q}
              current={current}
              selected={selected}
              mode={mode}
              isFlagged={Boolean(flagged[current])}
              error={error}
              onToggleFlag={toggleFlag}
              onOption={handleOption}
              onNatChange={handleNatChange}
            />
          </div>

          {/* Right Desktop Question Palette: same height as question card, stretches full height */}
          <aside className="hidden md:flex flex-col w-72 lg:w-80 shrink-0 h-full">
            {panel}
          </aside>
        </div>

        {/* Navigation Controls: Placed ONLY under the Question Card section, not under the question palette */}
        <div className="flex w-full flex-row gap-4 lg:gap-5 mt-3.5 shrink-0">
          <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="rounded-xl border border-[var(--border,#262936)] bg-[var(--surface,#161820)] px-6 py-2.5 text-xs md:text-sm font-bold text-[var(--text,#f0f0f4)] transition hover:bg-[var(--surface2,#1e2028)] hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-30 shadow-sm"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={toggleFlag}
              className={`rounded-xl border px-5 py-2.5 text-xs md:text-sm font-semibold transition shadow-sm ${
                flagged[current]
                  ? 'border-amber-500/50 bg-amber-500/15 text-amber-400'
                  : 'border-[var(--border,#262936)] bg-[var(--surface,#161820)] text-[var(--muted2,#8a8a9a)] hover:text-white hover:border-white/20'
              }`}
            >
              {flagged[current] ? '🚩 Marked for Review' : '🏳 Mark for Review'}
            </button>

            {current === totalQuestions - 1 ? (
              <button
                type="button"
                onClick={openSubmitConfirm}
                disabled={submitting || loading || !canSubmit}
                className="rounded-xl bg-[var(--orange,#f15a22)] hover:bg-[#ff6830] px-6 py-2.5 text-xs md:text-sm font-bold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Section
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                className="rounded-xl bg-[var(--orange,#f15a22)] hover:bg-[#ff6830] px-7 py-2.5 text-xs md:text-sm font-bold text-white shadow-md transition hover:opacity-95"
              >
                Save & Next →
              </button>
            )}
          </div>

          {/* Spacer corresponding to Right Question Palette width so nothing sits beneath it */}
          <div className="hidden md:block w-72 lg:w-80 shrink-0" aria-hidden="true" />
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[200] bg-[rgba(0,0,0,0.75)] backdrop-blur-[4px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[88vw] max-w-[380px] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {panel}
          </div>
        </div>
      )}

      {showSubmitConfirm && (
        <SubmitConfirmModal
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
          submitting={submitting}
          onCancel={() => setShowSubmitConfirm(false)}
          onSubmit={() => void handleSubmit()}
        />
      )}
      <TestCalculator
        open={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
      <TestVirtualKeyboard
        open={showVirtualKeyboard}
        onClose={() => setShowVirtualKeyboard(false)}
        onKeyPress={(key) => {
          if (!q) return;

          if (q.questionType !== 'NAT') return;

          const currentValue = (answers[q.questionId] ?? [''])[0];

          if (key === 'BACKSPACE') {
            handleNatChange(currentValue.slice(0, -1));
            return;
          }

          if (key === 'ENTER') {
            return;
          }

          handleNatChange(currentValue + key);
        }}
      />
    </div>
  );
}