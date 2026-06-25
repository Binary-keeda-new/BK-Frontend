'use client';

import CodingProblemsPage from '@/features/admin/coding-problems/pages/codingProblemsPage';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <CodingProblemsPage
      onEditProblem={(id) => router.push(`/coding-problems/${id}`)}
    />
  );
}