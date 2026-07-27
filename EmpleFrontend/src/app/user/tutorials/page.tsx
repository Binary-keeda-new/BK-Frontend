"use client";

import { useRouter } from "next/navigation";
import TutorialsLandingPage from "@/features/user/tutorials/pages/TutorialsLandingPage";

export default function TutorialsRoute() {
  const router = useRouter();
  return (
    <TutorialsLandingPage 
      onSelect={(mode) => router.push(`/user/tutorials/${mode}`)} 
    />
  );
}