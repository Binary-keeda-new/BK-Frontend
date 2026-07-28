'use client';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { UserTestSection } from '../types/test.types';
import {
  getTestSectionAttempt,
  submitTestSectionAttempt,
  type TestSectionAttemptData,
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
  securityWarnings?: number;
  testId: string;
  section: UserTestSection;
  sectionIndex: number;
  onBackToSections: () => void;
  onSectionCompleted: (sectionId: string) => void;
  minTimeBeforeSubmit?: number;
  allowCalculator?: boolean;
  allowVirtualKeyboard?: boolean;
};

export default function TestAttempt({
  attemptId,
  attemptExpiresAt,
  securityWarnings = 0,
  section,
  sectionIndex,
  onBackToSections,
  onSectionCompleted,
  minTimeBeforeSubmit = 0,
  allowCalculator = false,
  allowVirtualKeyboard = false,
  
}: Props) {
  const [data, setData] = useState<TestSectionAttemptData | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timings, setTimings] = useState<Record<string, number>>({});
  const [currentQuestionStartedAt, setCurrentQuestionStartedAt] = useState<number>(Date.now());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeftMs, setTimeLeftMs] = useState<number | null>(null);
  const [attemptStartedAt] = useState(Date.now());
  const [canSubmit, setCanSubmit] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);

  const questions = data?.questions ?? [];
  const totalQuestions = questions.length;
  const q = questions[current];


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
        answerMap[answer.questionId] = answer.selectedOptions ?? [];
        // Optional: restore existing timings if the backend provided them in the answer object
        // if (answer.timeTakenSeconds) initialTimings[answer.questionId] = answer.timeTakenSeconds;
      }

      let initialAnswers = answerMap;
      let initialVisited = { 0: true };
      let initialFlagged: Record<number, boolean> = {};

      try {
        const localRaw = localStorage.getItem(`emple_test_progress_${attemptId}_${section._id}`);
        if (localRaw) {
          const localData = JSON.parse(localRaw);
          if (localData.answers) initialAnswers = localData.answers;
          if (localData.timings) {
            Object.assign(initialTimings, localData.timings);
          }
          if (localData.visited) initialVisited = localData.visited;
          if (localData.flagged) initialFlagged = localData.flagged;
        }
      } catch (e) {
        console.error('Failed to parse local storage progress', e);
      }

      setAnswers(initialAnswers);
      setTimings(initialTimings);
      setCurrentQuestionStartedAt(Date.now());
      setCurrent(0);
      setVisited(initialVisited);
      setFlagged(initialFlagged);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load test section');
    } finally {
      setLoading(false);
    }
  }, [attemptId, section._id]);

  useEffect(() => {
    void loadSection();
  }, [loadSection]);

  useEffect(() => {
    if (!data || section.type === 'coding') return;
    try {
      const stateToSave = {
        answers,
        visited,
        flagged,
        timings,
        timestamp: Date.now()
      };
      localStorage.setItem(`emple_test_progress_${attemptId}_${section._id}`, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save progress to local storage', e);
    }
  }, [answers, visited, flagged, timings, data, attemptId, section._id, section.type]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;

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

      onSectionCompleted(section._id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to submit section';
      if (hasAutoSubmitted.current || msg.toLowerCase().includes('expired')) {
        onSectionCompleted(section._id);
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
      setShowSubmitConfirm(false);
    }
  }, [answers, attemptId, onSectionCompleted, section._id, submitting]);

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

  useEffect(() => {
    if (!attemptExpiresAt) {
      setTimeLeftMs(null);
      return;
    }

    const tick = () => {
      const diff = new Date(attemptExpiresAt).getTime() - Date.now();
      setTimeLeftMs(Math.max(diff, 0));
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [attemptExpiresAt]);

  const formattedTimeLeft = useMemo(() => formatTimeLeft(timeLeftMs), [timeLeftMs]);

  const hasAutoSubmitted = useRef(false);
  useEffect(() => {
    if (timeLeftMs === 0 && !submitting && section.type !== 'coding' && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      void handleSubmit();
    }
  }, [timeLeftMs, submitting, handleSubmit, section.type]);

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

if (section.type === 'coding') {
  return (
    <CodingWorkspace
      problems={section.codingProblemIds || []}
      initialSubmissions={data?.codingSubmissions}
      mode="test"
      onBack={onBackToSections}
      formattedTimeLeft={formattedTimeLeft}
      timeLeftMs={timeLeftMs}
      onComplete={async (submissions) => {
        try {
          await submitTestSectionAttempt(
            attemptId,
            section._id,
            [],
            submissions
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : '';
          if (!msg.toLowerCase().includes('expired')) {
            console.error('Failed to submit coding section', err);
          }
        }
        // Clean up local drafts on complete
        submissions.forEach(sub => {
          localStorage.removeItem(`emple_draft_${sub.problemId}_${sub.language}`);
        });
        onSectionCompleted(section._id);
      }}
    />
  );
}

  if (loading) {
    return <div className="p-8 text-[var(--text,#f0f0f4)]">Loading section...</div>;
  }

  if (error && !data) {
    return <div className="p-8 text-[#f87171]">{error}</div>;
  }

  if (!data || !q) {
    return <div className="p-8 text-[#f87171]">Section attempt could not be loaded.</div>;
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
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
        <TestAttemptHeader
          sectionIndex={sectionIndex}
          current={current}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          formattedTimeLeft={formattedTimeLeft}
          timeLeftMs={timeLeftMs}
          securityWarnings={securityWarnings}
          submitting={submitting}
          loading={loading}
          canSubmit={canSubmit}
          onBackToSections={onBackToSections}
          onOpenQuestions={() => setSidebarOpen(true)}
          onSubmit={openSubmitConfirm}
          allowCalculator={allowCalculator}
          onOpenCalculator={() => setShowCalculator(true)}
          allowVirtualKeyboard={allowVirtualKeyboard}
          onOpenVirtualKeyboard={() => setShowVirtualKeyboard(true)}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_16rem]">
          <section className="min-w-0">
            <div className="flex min-w-0 flex-col">
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

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 0}
                  className="rounded-[10px] border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-6 py-2.5 text-sm font-semibold text-[var(--text,#f0f0f4)] transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {current === totalQuestions - 1 ? (
  <button
    type="button"
    onClick={openSubmitConfirm}
    disabled={submitting || loading || !canSubmit}
    className="rounded-[10px] bg-[var(--orange)] px-6 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
  >
    Submit Section
  </button>
) : (
  <button
    type="button"
    onClick={() => goTo(current + 1)}
    className="rounded-[10px] border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-6 py-2.5 text-sm font-semibold text-[var(--text,#f0f0f4)] transition"
  >
    Next
  </button>
)}
              </div>
            </div>
          </section>

          <div className="hidden md:flex flex-col h-full">
            {panel}
          </div>
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
    </>
  );
}