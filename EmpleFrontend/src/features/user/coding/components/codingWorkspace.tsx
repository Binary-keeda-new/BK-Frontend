'use client';

import type { UserCodingProblem } from '../../practice/test/types/test.types';
import WorkspaceLayout from './workspaceLayout';
import useCodingWorkspace from '../hooks/useCodingWorkspace';

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
  problems: UserCodingProblem[];
  mode?: 'practice' | 'test';
  onBack?: () => void;
  onComplete?: (submissions: CodingSubmission[]) => void | Promise<void>;
  formattedTimeLeft?: string | null;
  timeLeftMs?: number | null;
  initialSubmissions?: CodingSubmission[];
};

export default function CodingWorkspace({
  problems,
  mode = 'practice',
  onBack,
  onComplete,
  formattedTimeLeft,
  timeLeftMs,
  initialSubmissions = [],
}: Props) {
  const workspaceState = useCodingWorkspace(problems, initialSubmissions);

  if (problems.length === 0) {
    return (
      <div className="p-6 text-red-400">
        No coding problems found for this section.
      </div>
    );
  }

  return (
    <WorkspaceLayout
      workspaceState={workspaceState}
      mode={mode}
      onBack={onBack}
      onComplete={onComplete}
      formattedTimeLeft={formattedTimeLeft}
      timeLeftMs={timeLeftMs}
    />
  );
}