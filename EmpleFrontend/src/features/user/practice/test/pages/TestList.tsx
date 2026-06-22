'use client';

import { useEffect, useState } from 'react';
import TestInstructionsView from '../components/TestInstructionsView';
import TestSectionsPreview from '../components/TestSectionsPreview';
import TestAttempt from './TestAttempt';
import TestFeedbackView from '../components/TestFeedbackView';
import TestSecurityShell from '../components/TestSecurityShell';
import { UserTest, UserTestSection } from '../types/test.types';
import {
  getTests,
  getTestAttemptStatus,
  startTestAttempt,
  submitTestFeedback,
  getTestAttemptDetails,
} from '../services/test.service';
import TestFullscreenGate from '../components/TestFullscreenGate';


export default function TestList() {
  const [tests, setTests] = useState<UserTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [attemptStatusMap, setAttemptStatusMap] = useState<Record<string, any>>({});
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);

  const [selectedTest, setSelectedTest] = useState<UserTest | null>(null);
  const [view, setView] = useState<
    'list' | 'fullscreen' | 'instructions' | 'sections' | 'attempt' | 'feedback'
  >('list');

  const [agreed, setAgreed] = useState(false);
  const [enabledSectionIndex, setEnabledSectionIndex] = useState(0);
  const [completedSectionIds, setCompletedSectionIds] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<UserTestSection | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const [attemptedTestIds, setAttemptedTestIds] = useState<string[]>([]);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [securityWarnings, setSecurityWarnings] = useState(0);

  const [pendingTest, setPendingTest] = useState<UserTest | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [attemptExpiresAt, setAttemptExpiresAt] = useState<string | null>(null);
    const [needsFullscreen, setNeedsFullscreen] = useState(false);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const data = await getTests();
        setTests(data);

        const ids = data.map((test) => test._id);
        const statusMap = await getTestAttemptStatus(ids);
        setAttemptStatusMap(statusMap);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadTests();
  }, []);

  const beginAttempt = async (test: UserTest, password?: string) => {
    try {
      const attempt = await startTestAttempt(test._id, password);

      setActiveAttemptId(attempt._id);
      setAttemptExpiresAt(attempt.expiresAt || null);
      setSelectedTest(test);
      setAgreed(false);
      setEnabledSectionIndex(0);
      setCompletedSectionIds([]);
      setSecurityWarnings(0);
      setView(test.settings?.noExitScreen ? 'fullscreen' : 'instructions');
      setShowPasswordPrompt(false);
      setPendingTest(null);
      setPasswordError('');
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : 'Failed to start test'
      );
    }
  };

const handleAttempt = async (test: UserTest) => {
  const status = attemptStatusMap[test._id];

  if (status?.status === 'in_progress' && status?.attemptId) {
    try {
      const attempt = await getTestAttemptDetails(status.attemptId);

      setActiveAttemptId(attempt._id);
      setAttemptExpiresAt(attempt.expiresAt || null);

      const completedIds = attempt.sections
        .filter((s) => s.status === 'submitted')
        .map((s) => s.sectionId);

      setCompletedSectionIds(completedIds);

      const unlockedIndex = attempt.sections.findIndex(
        (s) =>
          s.status === 'unlocked' ||
          s.status === 'in_progress'
      );

      setEnabledSectionIndex(
        unlockedIndex >= 0 ? unlockedIndex : completedIds.length
      );

      setSelectedTest(test);
      setView('sections');

      return;
    } catch (error) {
      console.error(error);
    }
  }

  if (test.settings?.passwordProtected) {
    setPendingTest(test);
    setPasswordInput('');
    setPasswordError('');
    setShowPasswordPrompt(true);
    return;
  }

  await beginAttempt(test);
};

  const handleBackToList = () => {
    setSelectedTest(null);
    setAgreed(false);
    setView('list');
  };

  const handleAttemptSection = (section: UserTestSection, index: number) => {
    setActiveSection(section);
    setActiveSectionIndex(index);
    setView('attempt');
  };

  if (loading) {
    return <div className="p-6 text-sm text-[var(--muted2)]">Loading tests...</div>;
  }

  if (view === 'fullscreen' && selectedTest) {
  return (
    <TestFullscreenGate
      testTitle={selectedTest.title}
      onBack={handleBackToList}
      onEntered={() => setView('instructions')}
    />
  );
}

  if (view === 'instructions' && selectedTest) {
    return (
      <TestInstructionsView
        test={selectedTest}
        agreed={agreed}
        onAgreeChange={setAgreed}
        onBack={handleBackToList}
        onPreview={() => setView('sections')}
      />
    );
  }

  if (view === 'sections' && selectedTest) {
    return (
      <TestSectionsPreview
        test={selectedTest}
        enabledSectionIndex={enabledSectionIndex}
        completedSectionIds={completedSectionIds}
        onBack={() => setView('instructions')}
        onAttemptSection={handleAttemptSection}
        navigationMode={selectedTest.settings?.navigationMode || 'sequential'}
      />
    );
  }

  if (view === 'attempt' && selectedTest && activeSection) {
    return (
      <TestSecurityShell
  settings={selectedTest.settings}
  onViolation={(type) => {
  console.warn('Test security violation:', type);

  setSecurityWarnings((prev) => prev + 1);

  if (type === 'exit_fullscreen' && selectedTest.settings?.noExitScreen) {
    setNeedsFullscreen(true);
  }
}}
>
  {needsFullscreen ? (
  <TestFullscreenGate
    testTitle={selectedTest.title}
    onBack={handleBackToList}
    onEntered={() => setNeedsFullscreen(false)}
  />
) : (
        <TestAttempt
          testId={selectedTest._id}
          attemptId={activeAttemptId!}
          attemptExpiresAt={attemptExpiresAt}
          securityWarnings={securityWarnings}
          section={activeSection}
          sectionIndex={activeSectionIndex}
          minTimeBeforeSubmit={
  selectedTest.settings?.minTimeBeforeSubmit || 0
}
          onBackToSections={() => setView('sections')}
          onSectionCompleted={(sectionId) => {
            const nextCompleted = completedSectionIds.includes(sectionId)
              ? completedSectionIds
              : [...completedSectionIds, sectionId];

            setCompletedSectionIds(nextCompleted);

            if (nextCompleted.length === selectedTest.sections.length) {
              setView('feedback');
              return;
            }

            setEnabledSectionIndex((prev) => {
              const nextIndex = prev + 1;
              return nextIndex >= selectedTest.sections.length ? prev : nextIndex;
            });

            setView('sections');
          }}
        />
)}
          </TestSecurityShell>

        );

  }

  if (view === 'feedback') {
    return (
      <TestFeedbackView
        countdown={redirectCountdown}
        onBack={() => setView('sections')}
        onSubmit={async (payload) => {
          if (!selectedTest || !activeAttemptId) return;

          await submitTestFeedback(activeAttemptId, payload);

          setAttemptedTestIds((prev) =>
            prev.includes(selectedTest._id) ? prev : [...prev, selectedTest._id]
          );

          setRedirectCountdown(3);

          const interval = setInterval(() => {
            setRedirectCountdown((prev) => {
              if (!prev || prev <= 1) {
                clearInterval(interval);
                setRedirectCountdown(null);
                handleBackToList();
                return null;
              }

              return prev - 1;
            });
          }, 1000);
        }}
      />
    );
  }

  return (
    <>
      {showPasswordPrompt && pendingTest && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-bold text-[var(--text)]">
              Password Required
            </h2>

            <p className="mt-2 text-sm text-[var(--muted2)]">
              Enter the test password to continue.
            </p>

            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="mt-5 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--text)] outline-none"
            />

            {passwordError && (
              <p className="mt-3 text-sm text-red-400">{passwordError}</p>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPendingTest(null);
                  setPasswordError('');
                }}
                className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted2)]"
              >
                Cancel
              </button>

              <button
                onClick={() => beginAttempt(pendingTest, passwordInput)}
                className="rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--text)]">Tests</h1>
          <p className="mt-1 text-sm text-[var(--muted2)]">
            Attempt assessments and track your performance.
          </p>
        </div>

        <div className="space-y-4">
          {tests.map((test) => {
            const attemptStatus = attemptStatusMap[test._id];

            const isAttempted =
              test.attempted ||
              attemptedTestIds.includes(test._id) ||
              attemptStatus?.status === 'submitted';

            const isInProgress = attemptStatus?.status === 'in_progress';

            return (
              <div
                key={test._id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text)]">
                      {test.title}
                    </h2>

                    <p className="mt-1 text-sm text-[var(--muted2)]">
                      {test.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--muted2)]">
                      <span>{test.totalSections} Sections</span>
                      <span>{test.totalDuration} Minutes</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAttempt(test)}
                    className={`rounded-xl px-5 py-3 text-sm font-bold ${
                      isAttempted
                        ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        : isInProgress
                        ? 'border border-sky-500/30 bg-sky-500/10 text-sky-300'
                        : 'bg-[var(--orange)] text-white'
                    }`}
                  >
                    {isAttempted ? 'Preview →' : isInProgress ? 'Resume →' : 'Attempt →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}