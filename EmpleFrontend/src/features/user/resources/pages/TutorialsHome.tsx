import EmptyState from "@/shared/components/ui/EmptyState";
import { BookOpen } from "lucide-react";

export default function TutorialsHome() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px] h-full">
      <EmptyState
        title="Tutorials Coming Soon"
        description="We are preparing structured tutorials and learning content to help students improve their technical skills and career readiness."
        icon={<BookOpen size={28} />}
        primaryAction={{ label: "Explore Resources", href: "/resources" }}
        secondaryAction={{ label: "Return to Dashboard", href: "/user/dashboard" }}
      />
    </div>
  );
}