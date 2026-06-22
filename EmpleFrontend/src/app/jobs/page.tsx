import { Metadata } from 'next';
import JobBoard from '@/features/user/jobs/components/JobBoard';

export const metadata: Metadata = {
  title: 'Jobs | Emple',
  description: 'Explore the latest private and government job opportunities. Browse, search, and filter jobs with Emple.',
  alternates: {
    canonical: '/jobs',
  },
};

export default function JobsPage() {
  return <JobBoard />;
}
