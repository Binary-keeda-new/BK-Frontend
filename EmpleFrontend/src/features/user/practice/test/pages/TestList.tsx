'use client';
import { useEffect, useState, useRef } from 'react';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';
import { useSearchParams, useRouter } from 'next/navigation';
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
  getUserTestReport,
} from '../services/test.service';
import { forceSubmitTestAttempt, reportTestSecurityViolation, resumeAttemptTimer } from '../services/testAttempt.service';
import TestFullscreenGate from '../components/TestFullscreenGate';
import TestViolationModal from '../components/TestViolationModal';
import TestMCQReview from './TestMCQReview';
import TestCodingReview from './TestCodingReview';
import TestResult from './TestResult';

type Props = {
  onFullscreenModeChange?: (value: boolean) => void;
  
};


export default function TestList({ onFullscreenModeChange }: Props) {
  const [tests, setTests] = useState<UserTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [attemptStatusMap, setAttemptStatusMap] = useState<Record<string, { status: import('../types/test.types').TestAttemptStatus; attemptId?: string }>>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialAttemptId = searchParams?.get('attemptId');

  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(initialAttemptId || null);

  const [selectedTest, setSelectedTest] = useState<UserTest | null>(null);
  const [view, setView] = useState<
  | 'list'
  | 'review-sections'
  | 'review-mcq'
  | 'review-coding'
  | 'fullscreen'
  | 'resume-fullscreen'
  | 'instructions'
  | 'sections'
  | 'attempt'
  | 'finalizing'
  | 'requires-review'
  | 'feedback'
  | 'report'
>(initialAttemptId ? 'report' : 'list');

  const [agreed, setAgreed] = useState(false);
  const [enabledSectionIndex, setEnabledSectionIndex] = useState(0);
  const [completedSectionIds, setCompletedSectionIds] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<UserTestSection | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const [attemptedTestIds, setAttemptedTestIds] = useState<string[]>([]);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [securityWarnings, setSecurityWarnings] = useState(0);
  const [maxViolations, setMaxViolations] = useState(5);
  const [warningsLeft, setWarningsLeft] = useState(5);
  const [isForceSubmitted, setIsForceSubmitted] = useState(false);

  const [pendingTest, setPendingTest] = useState<UserTest | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [attemptExpiresAt, setAttemptExpiresAt] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [resumedQuestionIndex, setResumedQuestionIndex] = useState<number>(0);
  const [needsFullscreen, setNeedsFullscreen] = useState(false);
  const [activeViolation, setActiveViolation] = useState<string | null>(null);
  const [reviewSection, setreviewSection] = useState<UserTestSection | null>(null);
const [reviewSectionIndex, setreviewSectionIndex] = useState(0);

  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' }[]>([]);
  const hasAutoSubmittedGlobal = useRef(false);
  const warnedAutoSubmit = useRef(false);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };
  useEffect(() => {
    const fullscreenViews = ['fullscreen', 'resume-fullscreen', 'attempt'];
    
    if (selectedTest?.settings?.noExitScreen) {
      fullscreenViews.push('instructions', 'sections', 'feedback');
    }

    onFullscreenModeChange?.(fullscreenViews.includes(view));

    return () => onFullscreenModeChange?.(false);
  }, [view, onFullscreenModeChange, selectedTest]);

  // Global check: if active remainingSeconds reaches 0, trigger auto submit outside of attempt view
  useEffect(() => {
    if (remainingSeconds === null || !activeAttemptId) return;

    if (remainingSeconds <= 4 && remainingSeconds > 0 && !warnedAutoSubmit.current) {
      warnedAutoSubmit.current = true;
      addToast('Time is almost up! The test will auto-submit shortly...', 'error');
    }

    if (remainingSeconds <= 0 && !hasAutoSubmittedGlobal.current) {
      if (view === 'attempt') {
        return; // TestAttempt handles section submission
      }

      hasAutoSubmittedGlobal.current = true;
      forceSubmitTestAttempt(activeAttemptId).then((res) => {
        if (selectedTest) {
          setCompletedSectionIds(selectedTest.sections.map((s) => s._id));
        }
        if (res.status === 'finalizing') {
          setView(res.requiresReview ? 'requires-review' : 'finalizing');
        } else {
          setView('report');
        }
      }).catch((e) => {
        console.error('Failed to auto submit test', e);
        setView('finalizing');
      });
    }
  }, [remainingSeconds, activeAttemptId, selectedTest, view]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (view === 'finalizing' && activeAttemptId) {
      interval = setInterval(async () => {
        try {
          const report = await getUserTestReport(activeAttemptId);
          if (report.status === 'submitted' || report.status === 'force_submitted') {
             clearInterval(interval);
             setView('report');
             setAttemptStatusMap(prev => ({
                ...prev,
                [selectedTest?._id || '']: { ...prev[selectedTest?._id || ''], status: report.status }
             }));
          } else if (report.status === 'finalizing' && report.requiresReview) {
             clearInterval(interval);
             setView('requires-review');
          }
        } catch (error) {
          const e = error as Error;
          const msg = e.message?.toLowerCase() || '';
          if (msg.includes('401') || msg.includes('403') || msg.includes('not found') || msg.includes('invalid')) {
            clearInterval(interval);
            addToast('Cannot access test result. Please contact support.', 'error');
            setView('list');
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [view, activeAttemptId, selectedTest?._id]);

  const [attemptSections, setAttemptSections] = useState<any[]>([]);

  const handleResumeAttempt = async (test: UserTest, attemptId: string) => {
    try {
      const attempt = await getTestAttemptDetails(attemptId);

      setActiveAttemptId(attempt._id);
      setAttemptExpiresAt(attempt.expiresAt || null);
      setRemainingSeconds(attempt.remainingSeconds ?? null);
      setResumedQuestionIndex(attempt.activeQuestionIndex || 0);

      const mappedSections = (attempt.sections || []).map((s: any) => ({
        sectionId: s.sectionId?.toString?.() || s.sectionId,
        title: s.title,
        type: s.type,
        order: s.order,
        status: s.status,
        isEditable: s.isEditable,
      }));
      setAttemptSections(mappedSections);

      const completedIds = mappedSections
        .filter((s: any) => s.status === 'completed' || s.status === 'submitted')
        .map((s: any) => s.sectionId);

      setCompletedSectionIds(completedIds);

      let targetSectionIndex = mappedSections.findIndex(
        (s: any) => s.sectionId === attempt.activeSectionId
      );
      if (targetSectionIndex === -1) {
        targetSectionIndex = mappedSections.findIndex(
          (s: any) => s.status === 'in_progress' || s.status === 'not_started'
        );
      }
      if (targetSectionIndex === -1) targetSectionIndex = 0;

      setEnabledSectionIndex(targetSectionIndex);

      const activeSec = test.sections.find((s) => s._id === attempt.activeSectionId) ||
        test.sections[targetSectionIndex] || test.sections[0];
      if (activeSec) {
        setActiveSection(activeSec);
        setActiveSectionIndex(test.sections.indexOf(activeSec));
      }

      const maxV = attempt.maxViolations || test.settings?.maxSecurityViolations || 5;
      setMaxViolations(maxV);
      const count = attempt.violationCount || 0;
      setSecurityWarnings(count);
      const left = attempt.warningsLeft !== undefined ? attempt.warningsLeft : Math.max(0, maxV - count);
      setWarningsLeft(left);
      setSelectedTest(test);
      setAgreed(true);

      if (attempt.status === 'force_submitted' || attempt.status === 'submitted' || left <= 0) {
        setIsForceSubmitted(true);
        setView('report');
        return;
      }

      // Show Section Progress page first (Do NOT skip into question UI directly)
      setView('sections');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to resume test';

      if (message.toLowerCase().includes('expired')) {
        addToast('This test attempt has expired.', 'error');
        return;
      }

      if (
        message.toLowerCase().includes('ip') ||
        message.toLowerCase().includes('network')
      ) {
        addToast("Can't connect to network.", 'error');
        return;
      }

      addToast(message, 'error');
    }
  };

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const data = await getTests();
        setTests(data);

        const ids = data.map((test) => test._id);
        const statusMap = await getTestAttemptStatus(ids);
        setAttemptStatusMap(statusMap);
        // Do NOT automatically reopen attempt on navigation to Practice -> Tests
        // The test list must always be shown with "Resume Test" on unfinished test
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
      setRemainingSeconds(attempt.remainingSeconds ?? null);
      setResumedQuestionIndex(attempt.activeQuestionIndex || 0);
      const maxV = attempt.maxViolations || test.settings?.maxSecurityViolations || 5;
      setMaxViolations(maxV);
      const count = attempt.violationCount || 0;
      setSecurityWarnings(count);
      const left = attempt.warningsLeft !== undefined ? attempt.warningsLeft : Math.max(0, maxV - count);
      setWarningsLeft(left);
      setSelectedTest(test);
      setAgreed(true);

      setEnabledSectionIndex(0);
      setCompletedSectionIds([]);
      setAttemptSections([]);

      try {
        const details = await getTestAttemptDetails(attempt._id);
        if (details?.sections) {
          const mappedSections = details.sections.map((s: any) => ({
            sectionId: s.sectionId?.toString?.() || s.sectionId,
            title: s.title,
            type: s.type,
            order: s.order,
            status: s.status,
            isEditable: s.isEditable,
          }));
          setAttemptSections(mappedSections);
          const completedIds = mappedSections
            .filter((s: any) => s.status === 'completed' || s.status === 'submitted')
            .map((s: any) => s.sectionId);
          setCompletedSectionIds(completedIds);
        }
      } catch (e) {
        console.error('Failed to load attempt section details', e);
      }

      try {
        sessionStorage.setItem(
          'emple_active_test_attempt',
          JSON.stringify({ testId: test._id, attemptId: attempt._id })
        );
      } catch (e) {}

      // Start attempt directly in sections
      setView('sections');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to start test';

      if (message.toLowerCase().includes('password')) {
        setPasswordError(message);
        setShowPasswordPrompt(true);
        setPendingTest(test);
        return;
      }

      addToast(message, 'error');
    }
  };

  const handleAttempt = async (test: UserTest) => {
    const status = attemptStatusMap[test._id];

    if (status?.status === 'in_progress' && status?.attemptId) {
      await handleResumeAttempt(test, status.attemptId);
      return;
    }

    if (test.settings?.passwordProtected) {
      setPendingTest(test);
      setPasswordInput('');
      setPasswordError('');
      setShowPasswordPrompt(true);
      return;
    }

    // Show Instructions BEFORE starting attempt
    setSelectedTest(test);
    setAgreed(false);
    setEnabledSectionIndex(0);
    setCompletedSectionIds([]);
    setAttemptSections([]);
    const maxV = test.settings?.maxSecurityViolations || 5;
    setMaxViolations(maxV);
    setWarningsLeft(maxV);
    setSecurityWarnings(0);
    setView('instructions');
  };

const handleReviewTest = (test: UserTest) => {
  const status = attemptStatusMap[test._id];

  if (!status?.attemptId) {
    console.error('No attempt id found for review');
    return;
  }

  setActiveAttemptId(status.attemptId);
  setSelectedTest(test);
  setreviewSection(null);
  setreviewSectionIndex(0);
  setView('review-sections');
};

const handleViewReport = (test: UserTest) => {
  const status = attemptStatusMap[test._id];

  if (!status?.attemptId) {
    console.error('No attempt id found for report');
    return;
  }

  setActiveAttemptId(status.attemptId);
  setSelectedTest(test);
  setView('report');
};

const handleReviewSection = (
  section: UserTestSection,
  index: number
) => {
  setreviewSection(section);
  setreviewSectionIndex(index);

  if (section.type === 'mcq') {
    setView('review-mcq');
  } else {
    setView('review-coding');
  }
};

  const handleBackToList = () => {
    setSelectedTest(null);
    setAgreed(false);
    setView('list');
    setActiveAttemptId(null);
    try {
      sessionStorage.removeItem('emple_active_test_attempt');
    } catch (e) {}
    if (initialAttemptId) {
      router.replace('/user/practice/test');
    }
  };

  const handleAttemptSection = async (section: UserTestSection, index: number) => {
    setActiveSection(section);
    setActiveSectionIndex(index);

    const isFs = typeof document !== 'undefined' && Boolean(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (isFs) {
      if (activeAttemptId) {
        try {
          const res = await resumeAttemptTimer(activeAttemptId);
          if (typeof res.remainingSeconds === 'number') {
            setRemainingSeconds(res.remainingSeconds);
          }
          if (typeof res.activeQuestionIndex === 'number') {
            setResumedQuestionIndex(res.activeQuestionIndex);
          }
        } catch (e) {
          console.error('Failed to notify backend timer resume', e);
        }
      }
      setView('attempt');
    } else {
      setView('resume-fullscreen');
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-[var(--muted2)]">Loading tests...</div>;
  }

  if (view === 'review-sections' && selectedTest) {
  return (
    <TestSectionsPreview
      mode="review"
      test={selectedTest}
      enabledSectionIndex={0}
      completedSectionIds={[]}
      onBack={handleBackToList}
      onReviewSection={handleReviewSection}
      navigationMode={selectedTest.settings?.navigationMode || 'sequential'}
    />
  );
}

if (view === 'review-mcq' && activeAttemptId && reviewSection) {
  return (
   <TestMCQReview
  attemptId={activeAttemptId!}
  section={reviewSection}
  sectionIndex={reviewSectionIndex}
  onBack={() => setView('review-sections')}
/>
  );
}
if (view === 'review-coding' && activeAttemptId && reviewSection) {
  return (
    <TestCodingReview
      attemptId={activeAttemptId}
      section={reviewSection}
      sectionIndex={reviewSectionIndex}
      onBack={() => setView('review-sections')}
    />
  );
}

  if (view === 'fullscreen' && selectedTest) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0b0c10] flex items-center justify-center w-screen h-[100dvh] overflow-hidden">
        <TestFullscreenGate
          testTitle={selectedTest.title}
          onBack={handleBackToList}
          onEntered={() => setView('instructions')}
        />
      </div>
    );
  }

  if (view === 'resume-fullscreen' && selectedTest) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0b0c10] flex items-center justify-center w-screen h-[100dvh] overflow-hidden">
        <TestFullscreenGate
          testTitle={selectedTest.title}
          warningCount={warningsLeft}
          onBack={() => setView('sections')}
          onEntered={async () => {
            try {
              if (activeAttemptId) {
                const res = await resumeAttemptTimer(activeAttemptId);
                if (typeof res.remainingSeconds === 'number') {
                  setRemainingSeconds(res.remainingSeconds);
                }
                if (typeof res.activeQuestionIndex === 'number') {
                  setResumedQuestionIndex(res.activeQuestionIndex);
                }
                if (res.activeSectionId) {
                  const sec = selectedTest.sections.find((s) => s._id === res.activeSectionId);
                  if (sec) {
                    setActiveSection(sec);
                    setActiveSectionIndex(selectedTest.sections.indexOf(sec));
                  }
                }
              }
            } catch (e) {
              console.error('Failed to notify backend timer resume', e);
            }
            setView('attempt');
          }}
        />
      </div>
    );
  }

  if (view === 'instructions' && selectedTest) {
    return (
      <TestInstructionsView
        test={selectedTest}
        agreed={agreed}
        onAgreeChange={setAgreed}
        onBack={handleBackToList}
        onPreview={() => beginAttempt(selectedTest)}
      />
    );
  }

  if (view === 'sections' && selectedTest) {
    return (
      <TestSectionsPreview
        test={selectedTest}
        attemptSections={attemptSections}
        enabledSectionIndex={enabledSectionIndex}
        completedSectionIds={completedSectionIds}
        onBack={handleBackToList}
        onAttemptSection={handleAttemptSection}
        navigationMode={selectedTest.settings?.navigationMode || 'sequential'}
      />
    );
  }

  if (view === 'attempt' && selectedTest && activeSection) {
    return (
      <div id="emple-test-fullscreen-root" className="fixed inset-0 z-[9999] bg-[#0b0c10] text-[var(--text,#f0f0f4)] w-screen h-[100dvh] flex flex-col overflow-hidden">
        <TestSecurityShell
          settings={selectedTest.settings}
          isActive={!isForceSubmitted && view === 'attempt'}
          onViolation={(type) => {
            console.warn('Test security violation:', type);

            if (activeAttemptId) {
              reportTestSecurityViolation(activeAttemptId, type).then(res => {
                const vCount = typeof res.violationCount === 'number' ? res.violationCount : securityWarnings;
                const maxV = res.maxViolations || maxViolations;
                const left = typeof res.warningsLeft === 'number' ? res.warningsLeft : Math.max(0, maxV - vCount);

                setSecurityWarnings(vCount);
                if (res.maxViolations) setMaxViolations(maxV);
                setWarningsLeft(left);

                if (res.forceSubmitted || left <= 0 || res.status === 'finalizing' || res.status === 'force_submitted' || res.status === 'submitted') {
                   setIsForceSubmitted(true);
                   setActiveViolation(null);
                   setNeedsFullscreen(false);
                   try { sessionStorage.removeItem('emple_active_test_attempt'); } catch (e) {}
                } else {
                   setActiveViolation(type);
                }
              }).catch(e => {
                 console.error('Failed to report security violation', e);
              });
            }
          }}
        >
          <TestViolationModal
            violationType={activeViolation}
            warningsLeft={warningsLeft}
            warningCount={securityWarnings}
            maxViolations={maxViolations}
            isForceSubmitted={isForceSubmitted}
            onForceSubmitAcknowledge={() => {
              setIsForceSubmitted(false);
              setActiveViolation(null);
              try { sessionStorage.removeItem('emple_active_test_attempt'); } catch (e) {}
              setView('report');
            }}
            onContinue={() => {
              setActiveViolation(null);
              setNeedsFullscreen(false);
            }}
          />

          {needsFullscreen ? (
            <TestFullscreenGate
              testTitle={selectedTest.title}
              onBack={handleBackToList}
              onEntered={() => setNeedsFullscreen(false)}
              warningCount={warningsLeft}
            />
          ) : (
          <TestAttempt
            testId={selectedTest._id}
            attemptId={activeAttemptId!}
            attemptExpiresAt={attemptExpiresAt}
            initialRemainingSeconds={remainingSeconds ?? undefined}
            initialQuestionIndex={resumedQuestionIndex}
            warningsLeft={warningsLeft}
            securityWarnings={securityWarnings}
            section={activeSection}
            sectionIndex={activeSectionIndex}
            isAttemptActive={view === 'attempt' && !needsFullscreen && !activeViolation && !isForceSubmitted}
            allowCalculator={selectedTest.settings?.allowCalculator || false}
            allowVirtualKeyboard={
              selectedTest.settings?.allowVirtualKeyboard || false
            }
            minTimeBeforeSubmit={
              selectedTest.settings?.minTimeBeforeSubmit || 0
            }
          onAttemptStateChange={(status, requiresReview) => {
             if (status === 'finalizing') {
                setView(requiresReview ? 'requires-review' : 'finalizing');
             } else {
                setView('report');
             }
          }}
          onBackToSections={() => setView('sections')}
          onSectionCompleted={async (sectionId) => {
            const nextCompleted = completedSectionIds.includes(sectionId)
              ? completedSectionIds
              : [...completedSectionIds, sectionId];

            setCompletedSectionIds(nextCompleted);

            if (activeAttemptId) {
              try {
                const details = await getTestAttemptDetails(activeAttemptId);
                if (details?.sections) {
                  const mappedSections = details.sections.map((s: any) => ({
                    sectionId: s.sectionId?.toString?.() || s.sectionId,
                    title: s.title,
                    type: s.type,
                    order: s.order,
                    status: s.status,
                    isEditable: s.isEditable,
                  }));
                  setAttemptSections(mappedSections);
                }
              } catch (e) {
                console.error('Failed to reload attempt sections', e);
              }
            }

            if (nextCompleted.length === selectedTest.sections.length) {
              setView('feedback');
              return;
            }

            // If the active test timer has reached 0, force to feedback instead of allowing next section
            if (remainingSeconds !== null && remainingSeconds <= 0) {
              if (!hasAutoSubmittedGlobal.current) {
                hasAutoSubmittedGlobal.current = true;
                forceSubmitTestAttempt(activeAttemptId!).then(res => {
                  if (res.status === 'finalizing') {
                     setView(res.requiresReview ? 'requires-review' : 'finalizing');
                  } else {
                     setView('report');
                  }
                }).catch(console.error);
              } else {
                 setView('finalizing');
              }
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
      </div>
    );
  }

  if (view === 'feedback') {
    return (
      <TestFeedbackView
        countdown={redirectCountdown}
        onBack={() => setView('sections')}
        onSubmit={async (payload) => {
          if (!selectedTest || !activeAttemptId) return;

          try {
            await submitTestFeedback(activeAttemptId, payload);
          } catch (e) {
            console.error('Failed to submit feedback', e);
          }

          setAttemptedTestIds((prev) =>
            prev.includes(selectedTest._id) ? prev : [...prev, selectedTest._id]
          );

          try {
            const res = await forceSubmitTestAttempt(activeAttemptId);
            if (res.status === 'finalizing') {
              setView(res.requiresReview ? 'requires-review' : 'finalizing');
            } else {
              setView('report');
            }
          } catch (e) {
            console.error('Failed to trigger final submission', e);
            setView('finalizing');
          }
        }}
      />
    );
  }

  if (view === 'finalizing') {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-[var(--text)]">Finalizing your test...</h2>
        <p className="mt-2 text-[var(--muted2)]">
          Please wait while we process your submission.
        </p>
      </div>
    );
  }

  if (view === 'requires-review') {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-4xl">
          ⏳
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[var(--text)]">Technical Review Required</h2>
        <p className="mt-2 max-w-md text-[var(--muted2)]">
          Your test has been submitted, but part of your result requires technical review. You will be notified when the final result is ready.
        </p>
        <button
          onClick={handleBackToList}
          className="mt-8 rounded-xl bg-[var(--surface2)] border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (view === 'report') {
    return (
      <TestResult 
        attemptId={activeAttemptId!} 
        onBack={handleBackToList}
        onReviewSection={async (sectionId, type) => {
          // Find the section details from the original test to pass to the old components if needed
          // Or just set the view, we can fetch in the components
          const sec = selectedTest?.sections.find(s => s._id === sectionId);
          if (sec) {
            setreviewSection(sec);
            setreviewSectionIndex(selectedTest?.sections.indexOf(sec) || 0);
          } else {
            // Create a stub section just so the review component has what it needs
            setreviewSection({ _id: sectionId, title: 'Review', type, duration: 0, numberOfQuestions: 0 } as any);
            setreviewSectionIndex(0);
          }
          setView(type === 'mcq' ? 'review-mcq' : 'review-coding');
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
              autoComplete="new-password"
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="mt-5 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--orange)] transition-colors"
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
              attemptStatus?.status === 'submitted' ||
              attemptStatus?.status === 'force_submitted';

            const isInProgress = attemptStatus?.status === 'in_progress';
            const isFinalizing = attemptStatus?.status === 'finalizing';

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

                 <div className="flex flex-wrap gap-2">
                {(attemptStatus?.status === 'submitted' || attemptStatus?.status === 'force_submitted') && (
                  <button
                    onClick={() => handleViewReport(test)}
                    className="rounded-xl border border-[var(--orange)] px-5 py-3 text-sm font-bold text-[var(--orange)] hover:bg-[var(--orange)] hover:text-white transition-colors"
                  >
                    View Report
                  </button>
                )}
                <button
                  disabled={isFinalizing}
                  onClick={() => {
                    if (isAttempted) {
                      handleReviewTest(test);
                    } else if (!isFinalizing) {
                      handleAttempt(test);
                    }
                  }}
                  className={`rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    isAttempted
                      ? 'border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20'
                      : isFinalizing
                      ? 'border border-gray-500/30 bg-gray-500/10 text-gray-300 opacity-60 cursor-not-allowed'
                      : isInProgress
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                      : 'bg-[var(--orange)] hover:bg-[#e04f18] text-white'
                  }`}
                >
                  {isAttempted ? 'Review Test' : isFinalizing ? 'Finalizing...' : isInProgress ? 'Resume Test' : 'Attempt Test'}
                </button>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </>
  );
}
