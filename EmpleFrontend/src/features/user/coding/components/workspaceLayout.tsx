'use client';

import useCodingWorkspace from '../hooks/useCodingWorkspace';
import WorkspaceHeader from './workspaceHeader';
import ProblemSidebar from './problemSidebar';
import MonacoEditor from './monacoEditor';
import ConsolePanel from './consolePanel';

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
      <WorkspaceHeader problem={problem} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[40%] overflow-y-auto border-r border-[var(--clr-border)]">
          <ProblemSidebar problem={problem} />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
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

          <div className="h-72 border-t border-[var(--clr-border)]">
            <ConsolePanel
              running={running}
              submitting={submitting}
              result={executionResult}
              error={executionError}
            />
          </div>
          {mode === 'test' && submitCompleted && (
  <div className="border-t border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 text-right">
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
)}
        </div>
      </div>
    </div>
  );
}