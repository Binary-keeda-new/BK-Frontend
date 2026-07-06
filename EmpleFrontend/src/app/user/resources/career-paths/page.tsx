import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Paths | Emple",
  description: "Explore tech career paths — salary, skills, roadmap and company prep.",
};

import CareerPathsHome from "@/features/user/resources/pages/CareerPathsHome";

export default function Page() {
  return <CareerPathsHome />;
}