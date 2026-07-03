import CodingProblemEditorPage from "@/features/admin/coding-problems/pages/codingProblemEditorPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CodingProblemEditorPage problemId={id} />;
} 