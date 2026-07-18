import type { Metadata } from "next";
import BkSdeSheetHome from "@/features/user/resources/pages/BkSdeSheetHome";

export const metadata: Metadata = {
  title: "BK SDE Sheet | Emple",
  description: "Complete SDE interview prep — coding practice, core CS subjects and aptitude.",
};

export default function BkSdeSheetPage() {
  return <BkSdeSheetHome />;
}
