import EmptyState from "@/shared/components/ui/EmptyState";
import { ShoppingCart } from "lucide-react";

export default function TechShopPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px] h-full">
      <EmptyState
        title="Tech Shop Coming Soon"
        description="We're preparing a marketplace featuring learning resources, templates, tools, certifications, and exclusive student offers."
        icon={<ShoppingCart size={28} />}
        primaryAction={{ label: "Explore Resources", href: "/resources" }}
        secondaryAction={{ label: "Return to Dashboard", href: "/user/dashboard" }}
      />
    </div>
  );
}
