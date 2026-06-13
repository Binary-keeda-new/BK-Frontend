import type { Metadata } from 'next';
import ATSHomePage from '@/features/user/ats/pages/ATSHomePage';

export const metadata: Metadata = {
  title: 'ATS Optimizer | Emple',
  description:
    'Optimize your resume with our ATS scanner. Get instant skill matching or AI-powered deep analysis to improve your job application success rate.',
};

export default function ATSPage() {
  return <ATSHomePage />;
}
