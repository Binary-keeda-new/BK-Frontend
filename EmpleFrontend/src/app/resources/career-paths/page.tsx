import type { Metadata } from "next";
import CareerPathsHome from "@/features/user/resources/pages/CareerPathsHome";
export const metadata: Metadata = {
  title: "BK SDE Sheet | Emple",
  description: "Complete SDE interview prep — coding practice, core CS subjects and aptitude.",
};


export default function CareerPathsPage() {
  return <CareerPathsHome />;
}