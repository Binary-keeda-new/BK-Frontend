'use client';

import CodingWorkspace from '../components/codingWorkspace';

type Props = {
  problemId: string;
};

export default function CodingWorkspacePage({ problemId }: Props) {
  return <CodingWorkspace problemId={problemId} />;
}