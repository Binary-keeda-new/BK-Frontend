import SharedQuizRedirectPage from '@/features/user/practice/quiz/pages/SharedQuizRedirectPage';

export default async function Page({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  return <SharedQuizRedirectPage quizId={quizId} />;
}