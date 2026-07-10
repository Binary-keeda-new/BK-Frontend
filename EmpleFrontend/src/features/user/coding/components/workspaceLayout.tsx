'use client';

import useCodingWorkspace from '../hooks/useCodingWorkspace';
import WorkspaceHeader from './workspaceHeader';
import ProblemSidebar from './problemSidebar';
import MonacoEditor from './monacoEditor';
import ConsolePanel from './consolePanel';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

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
  problemId: string;
  mode?: 'practice' | 'test';
  onBack?: () => void;
  onComplete?: (submission: CodingSubmission) => void | Promise<void>;
};

export default function WorkspaceLayout({
  problemId,
  mode = 'practice',
  onBack,
  onComplete,
}: Props) {
  const {
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
    submitCompleted,
    customInput,
    setCustomInput,
  } = useCodingWorkspace(problemId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--clr-background)] text-[var(--clr-text)]">
        Loading coding problem...
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--clr-background)] text-red-400">
        {error || 'Coding problem could not be loaded.'}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[var(--clr-background)]">
      <WorkspaceHeader
  problem={problem}
  mode={mode}
  onBack={onBack}
/>

      <div className="flex flex-1 overflow-hidden p-4">
  <PanelGroup direction="horizontal" className="h-full w-full gap-3">
    <Panel defaultSize={42} minSize={25}>
      <div className="h-full overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
        <ProblemSidebar problem={problem} />
      </div>
    </Panel>

    <PanelResizeHandle className="w-1 rounded-full bg-[var(--clr-border)] transition hover:bg-[var(--clr-accent)]" />

    <Panel minSize={35}>
      <PanelGroup direction="vertical" className="h-full gap-3">
        <Panel defaultSize={68} minSize={35}>
          <div className="h-full overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
            <MonacoEditor
              problem={problem}
              code={code}
              setCode={setCode}
              language={selectedLanguage}
              changeLanguage={changeLanguage}
              running={running}
              submitting={submitting}
              onRunCode={handleRunCode}
              onSubmitCode={handleSubmitCode}
            />
          </div>
        </Panel>

        <PanelResizeHandle className="h-1 rounded-full bg-[var(--clr-border)] transition hover:bg-[var(--clr-accent)]" />

        <Panel defaultSize={32} minSize={18}>
          <div className="h-full overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
            <ConsolePanel
  running={running}
  submitting={submitting}
  result={executionResult}
  error={executionError}
  customInput={customInput}
  setCustomInput={setCustomInput}
  onRunCode={handleRunCode}
/>
          </div>
        </Panel>

        {mode === 'test' && submitCompleted && (
          <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onComplete?.({
                    problemId,
                    language: selectedLanguage,
                    sourceCode: code,
                    accepted: executionResult?.accepted,
                    passedCount: executionResult?.passedCount,
                    totalCount: executionResult?.totalCount,
                    results: executionResult?.results || [],
                  })
                }
                className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-bold text-white"
              >
                Complete Coding Section
              </button>
            </div>
          </div>
        )}
      </PanelGroup>
    </Panel>
  </PanelGroup>
</div>
    </div>
  );
}