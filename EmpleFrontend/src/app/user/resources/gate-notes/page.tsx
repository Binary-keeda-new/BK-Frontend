import type { Metadata } from "next";
import GateNotesHome from "@/features/user/resources/pages/GateNotesHome";

export const metadata: Metadata = {
  title: "GATE Notes | Emple",
  description: "Handwritten GATE preparation notes — OS, DBMS, CN, COA and more.",
};

export default function Page() {
  return <GateNotesHome />;
}