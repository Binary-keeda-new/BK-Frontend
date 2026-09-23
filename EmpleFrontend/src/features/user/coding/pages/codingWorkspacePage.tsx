'use client';

import CodingWorkspace from '../components/codingWorkspace';

type Props = {
  problemId: string;
};

export default function CodingWorkspacePage({ problemId }: Props) {
  // Pass it as an array to satisfy the new CodingWorkspace signature
  return <CodingWorkspace problems={[{ _id: problemId } as any]} />;
}