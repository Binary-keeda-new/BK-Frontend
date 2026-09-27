import QuestionBankDetailPage from '@/features/admin/question-bank/pages/QuestionBankDetail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuestionBankDetailPage id={id} />;
}
