import { EventsSection } from '@/features/admin/Events'

export default function AdminEventsPage() {
  return (
    <div className="p-7">
      <h1 className="text-white text-2xl font-bold mb-1">
        Admin <span className="text-[rgb(241,90,34)]">Events</span>
      </h1>
      <p className="text-white/40 text-sm mb-2">
        Manage all events visible to users on the platform.
      </p>
      <EventsSection />
    </div>
  )
}