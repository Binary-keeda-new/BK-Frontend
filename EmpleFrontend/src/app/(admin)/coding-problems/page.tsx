'use client';

import { useRouter } from 'next/navigation';
import CodingProblemsPage from '@/features/admin/coding-problems/pages/codingProblemsPage';

export default function CodingProblemsRoute() {
  const router = useRouter();

  return (
    <CodingProblemsPage
      onEditProblem={(id) => router.push(`/coding-problems/${id}`)}
      onPreviewProblem={() => {}}
    />
  );
}
