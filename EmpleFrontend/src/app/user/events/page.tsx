import EmptyState from "@/shared/components/ui/EmptyState";
import { CalendarDays } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px] h-full">
      <EmptyState
        title="Events Coming Soon"
        description="We are building a dedicated events platform for workshops, hackathons, webinars, industry sessions, and community meetups."
        icon={<CalendarDays size={28} />}
        primaryAction={{ label: "Explore Resources", href: "/resources" }}
        secondaryAction={{ label: "Return to Dashboard", href: "/user/dashboard" }}
      />
    </div>
  );
}
