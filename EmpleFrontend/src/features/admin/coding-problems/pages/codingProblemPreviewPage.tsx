'use client';

import { useEffect, useState } from 'react';
import ProblemPanel from '@/features/admin/coding-problems/components/problemPanel';
import { apiRequest } from '@/shared/utils/api';

interface Props {
  problemId: string;
}

export default function CodingProblemPreviewPage({
  problemId,
}: Props) {
  const [problem, setProblem] =
    useState<any>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await apiRequest<{ data: any }>(
          `/api/v1/coding-problems/${problemId}`
        );

        const p = data.data;

      setProblem({
  _id: p._id,

  title: p.title || '',

  difficulty: p.difficulty || 'Easy',

  topics: p.topics || [],

  statement:
    p.statement || '',

  examples:
    p.examples || [],

  constraints:
    p.constraints || [],

  hints:
    p.hints || [],
});
      } catch (err) {
        console.error('Failed to fetch coding problem preview:', err);
      }
    };

    fetchProblem();
  }, [problemId]);

  if (!problem) {
    return (
      <div className="p-6">
        Loading preview...
      </div>
    );
  }

  return (
    <ProblemPanel
      problem={problem}
    />
  );
}