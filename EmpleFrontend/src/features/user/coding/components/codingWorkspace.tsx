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
  timeTakenSeconds?: number;
  submissionId?: string; // added for Test mode
};

type CodingWorkspaceProps = {
  problems: UserCodingProblem[];
  onBack?: () => void;
  onComplete?: (submissions: CodingSubmission[]) => void | Promise<void>;
  formattedTimeLeft?: string | null;
  timeLeftMs?: number | null;
  initialSubmissions?: CodingSubmission[];
} & (
  | { mode?: 'practice' }
  | { mode: 'test'; attemptId: string; sectionId: string }
);

export default function CodingWorkspace(props: CodingWorkspaceProps) {
  const {
    problems,
    onBack,
    onComplete,
    formattedTimeLeft,
    timeLeftMs,
    initialSubmissions = [],
  } = props;
  
  const mode = props.mode || 'practice';

  const testContext = props.mode === 'test' ? { attemptId: props.attemptId, sectionId: props.sectionId } : undefined;

  const workspaceState = useCodingWorkspace(problems, initialSubmissions, testContext);

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