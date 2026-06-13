import type { Metadata } from 'next';
import AIATSPage from '@/features/user/ats/pages/AIATSPage';

export const metadata: Metadata = {
  title: 'AI ATS Analysis | Emple',
  description:
    'Get comprehensive AI-powered resume analysis with Gemini. Receive detailed feedback on skill alignment, writing quality, and actionable recommendations.',
};

export default function AIATS() {
  return <AIATSPage />;
}
