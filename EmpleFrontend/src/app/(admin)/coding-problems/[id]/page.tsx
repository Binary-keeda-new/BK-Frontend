'use client';

import CodingProblemEditorPage from "@/features/admin/coding-problems/pages/codingProblemEditorPage";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  return <CodingProblemEditorPage problemId={id} />;
} 