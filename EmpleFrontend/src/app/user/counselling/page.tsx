import EmptyState from "@/shared/components/ui/EmptyState";
import { Users } from "lucide-react";

export default function CounsellingPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px] h-full">
      <EmptyState
        title="Career Counselling Coming Soon"
        description="Personalized career guidance, mentorship, placement support, and expert counselling will be available soon."
        icon={<Users size={28} />}
        primaryAction={{ label: "Explore Resources", href: "/resources" }}
        secondaryAction={{ label: "Return to Dashboard", href: "/user/dashboard" }}
      />
    </div>
  );
}
