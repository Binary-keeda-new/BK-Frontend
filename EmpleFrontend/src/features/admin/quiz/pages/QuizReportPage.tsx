'use client';

import InstructorDashboard from '../components/report/InstructorDashboard';

type QuizReportPageProps = {
  quizId: string;
  onBack: () => void;
};

export default function QuizReportPage({
  quizId,
  onBack,
}: QuizReportPageProps) {
  return <InstructorDashboard quizId={quizId} onBack={onBack} />;
}