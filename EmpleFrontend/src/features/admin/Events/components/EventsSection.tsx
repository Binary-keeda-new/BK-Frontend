import { CalendarDays } from 'lucide-react'
import AdminEventCard from './AdminEventCard'

const ADMIN_EVENT_CARDS = [
  {
    id: 'hackathon' as const,
    title: 'Hackathons',
    description: 'Manage and post external hackathon events for students to discover.',
    badge: 'External',
    route: '/events/hackathons',
  },
  {
    id: 'techfest' as const,
    title: 'Techfest',
    description: 'Add and manage tech festival events including workshops and competitions.',
    badge: 'Festival',
    route: '/events/techfest',
  },
  {
    id: 'our-hackathon' as const,
    title: 'Emple Events',
    description: 'Create and manage events hosted directly on the Emple platform.',
    badge: 'Emple Events',
    route: '/events/our-hackathons',
  },
  {
    id: 'research-conference' as const,
    title: 'Research Conferences',
    description: 'Manage research conferences for students and researchers.',
    badge: 'Research',
    route: '/events/research-conferences',
  },
]

export default function EventsSection() {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays size={18} className="text-[rgb(241,90,34)]" />
        <h2 className="text-white text-base font-semibold">Events</h2>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ADMIN_EVENT_CARDS.map((card) => (
          <AdminEventCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}