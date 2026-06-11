import type { Metadata } from 'next';
import StandardATSPage from '@/features/user/ats/pages/StandardATSPage';

export const metadata: Metadata = {
  title: 'Standard ATS Analysis | Emple',
  description:
    'Run fast keyword-based ATS analysis on your resume. Get skill match scores, experience alignment, and detailed skill breakdown.',
};

export default function StandardATS() {
  return <StandardATSPage />;
}
