'use client';

import InstructorDashboard from '../components/report/InstructorDashboard';

type QuizReportPageProps = {
  quizId: string;
  onBack: () => void;
  onReviewAttempt?: (attemptId: string) => void;
};

export default function QuizReportPage({
  quizId,
  onBack,
  onReviewAttempt,
}: QuizReportPageProps) {
  return (
    <InstructorDashboard
      quizId={quizId}
      onBack={onBack}
      onReviewAttempt={onReviewAttempt}
    />
  );
}