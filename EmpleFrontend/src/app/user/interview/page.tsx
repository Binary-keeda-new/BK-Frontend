'use client';

import { useRouter } from 'next/navigation';
import InterviewExperience from '@/features/user/jobs/components/InterviewExperience';

export default function InterviewPage() {
  const router = useRouter();
  return <InterviewExperience onBack={() => router.back()} />;
}