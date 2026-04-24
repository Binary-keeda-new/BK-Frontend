import AppShell from '@/features/admin/dashboard/components/appShell';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPreviewPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <AppShell 
      initialSection="quiz-preview" 
      quizId={Number(id)} 
    />
  );
}