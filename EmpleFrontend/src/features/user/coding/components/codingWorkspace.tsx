'use client';

import WorkspaceLayout from './workspaceLayout';

type Props = {
  problemId: string;
};

export default function CodingWorkspace({ problemId }: Props) {
  return <WorkspaceLayout problemId={problemId} />;
}