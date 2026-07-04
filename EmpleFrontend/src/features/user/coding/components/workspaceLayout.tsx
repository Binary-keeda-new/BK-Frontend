'use client';

import useCodingWorkspace from '../hooks/useCodingWorkspace';
import WorkspaceHeader from './workspaceHeader';
import ProblemSidebar from './problemSidebar';
import MonacoEditor from './monacoEditor';
import ConsolePanel from './consolePanel';

type Props = {
  problemId: string;
};

export default function WorkspaceLayout({ problemId }: Props) {
  const {
    problem,
    loading,
    error,
    selectedLanguage,
    changeLanguage,
    code,
    setCode,
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
            />
          </div>

          <div className="h-72 border-t border-[var(--clr-border)]">
            <ConsolePanel />
          </div>
        </div>
      </div>
    </div>
  );
}