import QuestionBankDetailPage from '@/features/admin/question-bank/pages/QuestionBankDetail';

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <QuestionBankDetailPage id={params.id} />;
}