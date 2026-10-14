'use client';

import type useCodingWorkspace from '../hooks/useCodingWorkspace';
import WorkspaceHeader from './workspaceHeader';
import ProblemSidebar from './problemSidebar';
import MonacoEditor from './monacoEditor';
import ConsolePanel from './consolePanel';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { useEffect, useRef } from 'react';

type CodingSubmission = {
  problemId: string;
  language: string;
  sourceCode: string;
  accepted?: boolean;
  passedCount?: number;
  totalCount?: number;
  results?: unknown[];
};

type Props = {
  workspaceState: ReturnType<typeof useCodingWorkspace>;
  mode?: 'practice' | 'test';
  onBack?: () => void;
  onComplete?: (submissions: CodingSubmission[]) => void | Promise<void>;
  formattedTimeLeft?: string | null;
  timeLeftMs?: number | null;
};

export default function WorkspaceLayout({
  workspaceState,
  mode = 'practice',
  onBack,
  onComplete,
  formattedTimeLeft,
  timeLeftMs,
}: Props) {
  const {
    currentProblemIndex,
    setCurrentProblemIndex,
    totalProblems,
    problem,
    loading,
    error,
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
    customInput,
    setCustomInput,
    problemStates,
    problems,
  } = workspaceState;

  const handleCompleteSection = () => {
    const submissions = (problems || []).map((p) => {
      const state = problemStates[p._id];
      const validSub = state?.validSelectedSubmission || state?.testSubmissionState;
      return {
        problemId: p._id,
        language: validSub?.language || state?.selectedLanguage || 'Java',
        sourceCode: state?.code || '',
        accepted: validSub?.status === 'accepted' || state?.executionResult?.accepted,
        passedCount: validSub?.passedTestCases || state?.executionResult?.passedCount,
        totalCount: validSub?.totalTestCases || state?.executionResult?.totalCount,
        results: state?.executionResult?.results || [],
        timeTakenSeconds: state?.timeTakenSeconds || 0,
        submissionId: validSub?.submissionId,
      };
    });
    onComplete?.(submissions);
  };

  const hasAutoSubmitted = useRef(false);
  useEffect(() => {
    if (timeLeftMs === 0 && mode === 'test' && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      handleCompleteSection();
    }
  }, [timeLeftMs, mode]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--clr-background)] text-[var(--clr-text)] font-semibold">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full border-2 border-[var(--clr-accent)] border-t-transparent animate-spin" />
          Loading coding workspace...
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[var(--clr-background)] text-red-400">
        <p className="font-semibold">{error || 'Coding problem could not be loaded.'}</p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] px-4 py-2 text-sm font-bold text-[var(--clr-text)]"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[var(--clr-background)] overflow-hidden">
      <WorkspaceHeader
        problem={problem}
        mode={mode}
        onBack={onBack}
        formattedTimeLeft={formattedTimeLeft}
        timeLeftMs={timeLeftMs}
        currentProblemIndex={currentProblemIndex}
        totalProblems={totalProblems}
        onPrev={() => setCurrentProblemIndex(currentProblemIndex - 1)}
        onNext={() => setCurrentProblemIndex(currentProblemIndex + 1)}
        onCompleteSection={handleCompleteSection}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden p-3">
        <PanelGroup direction="horizontal" className="h-full w-full gap-2">
          <Panel defaultSize={35} minSize={20}>
            <div className="h-full overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
              <ProblemSidebar problem={problem} />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 rounded-full bg-[var(--clr-border)] transition hover:bg-[var(--clr-accent)] cursor-col-resize" />

          <Panel minSize={35}>
            <PanelGroup direction="vertical" className="h-full gap-2">
              <Panel defaultSize={62} minSize={30}>
                <div className="h-full overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                  <MonacoEditor
                    problem={problem}
                    code={code}
                    setCode={setCode as any}
                    language={selectedLanguage}
                    changeLanguage={changeLanguage}
                    running={running}
                    submitting={submitting}
                    onRunCode={handleRunCode}
                    onSubmitCode={handleSubmitCode}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 rounded-full bg-[var(--clr-border)] transition hover:bg-[var(--clr-accent)] cursor-row-resize" />

              <Panel defaultSize={38} minSize={20}>
                <div className="h-full overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                  <ConsolePanel
                    running={running}
                    submitting={submitting}
                    result={executionResult}
                    error={executionError}
                    customInput={customInput}
                    setCustomInput={setCustomInput as any}
                    onRunCode={handleRunCode}
                  />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}