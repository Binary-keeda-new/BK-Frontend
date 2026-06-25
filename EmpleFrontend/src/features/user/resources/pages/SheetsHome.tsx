import EmptyState from "@/shared/components/ui/EmptyState";
import { FileText } from "lucide-react";

export default function SheetsHome() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px] h-full">
      <EmptyState
        title="Sheets Coming Soon"
        description="Curated preparation sheets and study resources will be available soon."
        icon={<FileText size={28} />}
        primaryAction={{ label: "Explore Resources", href: "/resources" }}
        secondaryAction={{ label: "Return to Dashboard", href: "/user/dashboard" }}
      />
    </div>
  );
}