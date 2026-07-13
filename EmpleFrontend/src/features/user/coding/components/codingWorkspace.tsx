'use client';

import type { UserCodingProblem } from '../../practice/test/types/test.types';
import WorkspaceLayout from './workspaceLayout';

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
  onComplete?: (submission: CodingSubmission) => void | Promise<void>;
  formattedTimeLeft?: string | null;
timeLeftMs?: number | null;
};

export default function CodingWorkspace({
  problems,
  mode = 'practice',
  onBack,
  onComplete,
  formattedTimeLeft,
  timeLeftMs,
}: Props) {
  const firstProblem = problems[0];

  if (!firstProblem) {
    return (
      <div className="p-6 text-red-400">
        No coding problems found for this section.
      </div>
    );
  }

  return (
    <WorkspaceLayout
      problemId={firstProblem._id}
      mode={mode}
      onBack={onBack}
      onComplete={onComplete}
      formattedTimeLeft={formattedTimeLeft}
  timeLeftMs={timeLeftMs}
    />
  );
}