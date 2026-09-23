'use client';
import TestInstructorDashboard from "./TestInstructorDashboard";

type TestReportPageProps = {
  testId: string;
  onBack: () => void;
  onReviewAttempt?: (attemptId: string) => void;
};

export default function TestReportPage({
  testId,
  onBack,
  onReviewAttempt,
}: TestReportPageProps) {
  return (
    <TestInstructorDashboard
      testId={testId}
      onBack={onBack}
      onReviewAttempt={onReviewAttempt}
    />
  );
}