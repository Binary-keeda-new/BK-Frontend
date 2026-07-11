import type { Metadata } from "next";
import ProjectIdeasHome from "@/features/user/resources/pages/project-ideas/ProjectIdeasHome";

export const metadata: Metadata = {
  title: "Project Ideas | Emple",
  description: "Explore curated project ideas to build your portfolio and ace technical interviews.",
};

export default function Page() {
  return <ProjectIdeasHome basePath="/resources/project-ideas" />;
}