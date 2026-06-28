'use client';

import WorkspaceHeader from './workspaceHeader';
import ProblemSidebar from './problemSidebar';
import MonacoEditor from './monacoEditor';
import ConsolePanel from './consolePanel';

export default function WorkspaceLayout() {
  return (
    <div className="flex h-screen flex-col bg-[var(--clr-background)]">

      <WorkspaceHeader />

      <div className="flex flex-1 overflow-hidden">

        {/* Left Panel */}

        <div className="w-[40%] overflow-y-auto border-r border-[var(--clr-border)]">

          <ProblemSidebar />

        </div>

        {/* Right Panel */}

        <div className="flex flex-1 flex-col">

          <div className="flex-1 overflow-hidden">

            <MonacoEditor />

          </div>

          <div className="h-72 border-t border-[var(--clr-border)]">

            <ConsolePanel />

          </div>

        </div>

      </div>

    </div>
  );
}