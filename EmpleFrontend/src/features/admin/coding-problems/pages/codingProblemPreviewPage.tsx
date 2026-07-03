'use client';

import { useEffect, useState } from 'react';
import ProblemPanel from '@/features/admin/coding-problems/components/problemPanel';

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
      const response = await fetch(
        `http://localhost:5000/api/v1/admin/coding-problems/${problemId}`
      );

      const data =
        await response.json();

      const p = data.data;

      setProblem({
  _id: p._id,

  title: p.title || '',

  difficulty: p.difficulty || 'Easy',

  topics: p.topics || [],

  recommendedTime:
    p.recommendedTime || 15,

  statement:
    p.statement || '',

  examples:
    p.examples || [],

  constraints:
    p.constraints || [],

  hints:
    p.hints || [],
});
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