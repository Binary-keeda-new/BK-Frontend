"use client";

import { useRouter } from "next/navigation";
import VideosPlaceholderPage from "@/features/user/tutorials/pages/VideosPlaceholderPage";

export default function TutorialsVideosRoute() {
  const router = useRouter();
  return <VideosPlaceholderPage onBack={() => router.push("/tutorials")} />;
}
