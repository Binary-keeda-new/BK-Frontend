import CodingProblemEditorPage from "@/features/admin/coding-problems/pages/codingProblemEditorPage";
'use client';

import CodingProblemEditorPage from "@/features/admin/coding-problems/pages/codingProblemEditorPage";
import { useParams } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CodingProblemEditorPage problemId={id} />;
export default function Page() {
  const params = useParams();
  const id = params.id as string;
  return <CodingProblemEditorPage problemId={id} />;
} 