import { Trophy, Sparkles, Rocket } from 'lucide-react'
import { Event } from '../types'
import { CATEGORY_STYLES } from '../constants'

const ICONS = {
  hackathon: <Trophy size={15} />,
  techfest: <Sparkles size={15} />,
  'our-hackathon': <Rocket size={15} />,
}

const TYPE_LABELS = {
  hackathon: 'Hackathon',
  techfest: 'Techfest',
  'our-hackathon': 'By Emple',
}

export default function UpcomingEventRow({ event }: { event: Event }) {
  const styles = CATEGORY_STYLES[event.type]

  return (
    <div className="bg-[rgb(19,20,27)] ring-1 ring-white/10 hover:ring-white/15 transition rounded-2xl px-4 py-3 flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}
        style={{ color: styles.accentColor }}
      >
        {ICONS[event.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{event.title}</p>
        <p className="text-white/35 text-xs">
          {TYPE_LABELS[event.type]} · {event.registrationOpen ? 'Registrations open' : 'Upcoming'}
        </p>
      </div>
      <span className={`text-[11px] px-2 py-1 rounded-full flex-shrink-0 ${styles.badgeClass}`}>
        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
      </span>
    </div>
  )
}