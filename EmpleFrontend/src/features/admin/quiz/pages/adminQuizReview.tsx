'use client';

import QuizReviewPage from '@/features/user/practice/quiz/pages/QuizReviewPage';

type Props = {
  attemptId: string;
  onBack: () => void;
};

export default function AdminQuizReview({ attemptId, onBack }: Props) {
  return (
    <QuizReviewPage
      adminAttemptId={attemptId}
      adminOnBack={onBack}
    />
  );
}