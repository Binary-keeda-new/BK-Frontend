"use client";

import { useRouter } from "next/navigation";
import { TutorialsNotesPage } from "@/features/user/tutorials/pages/TutorialsPage";

export default function TutorialsNotesRoute() {
  const router = useRouter();
  return <TutorialsNotesPage onBackToLanding={() => router.push("/user/tutorials")} />;
}
