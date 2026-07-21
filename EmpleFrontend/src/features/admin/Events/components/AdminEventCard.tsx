'use client'

import { useRouter } from 'next/navigation'
import { Trophy, Sparkles, Rocket, BookOpen } from 'lucide-react'

type EventType =
  | 'hackathon'
  | 'techfest'
  | 'our-hackathon'
  | 'research-conference'

interface AdminEventCard {
  id: EventType
  title: string
  description: string
  badge: string
  route: string
}

const ICONS = {
  hackathon: <Trophy size={18} />,
  techfest: <Sparkles size={18} />,
  'our-hackathon': <Rocket size={18} />,
  'research-conference': <BookOpen size={18} />,
}

const STYLES = {
  hackathon: {
    accentColor: '#ff5722',
    badgeClass: 'text-orange-400 bg-orange-500/10',
    iconBg: 'bg-orange-500/10',
    topBar: 'from-orange-500 to-orange-300',
  },
  techfest: {
    accentColor: '#a855f7',
    badgeClass: 'text-purple-400 bg-purple-500/10',
    iconBg: 'bg-purple-500/10',
    topBar: 'from-purple-600 to-purple-400',
  },
  'our-hackathon': {
    accentColor: '#10b981',
    badgeClass: 'text-emerald-400 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/10',
    topBar: 'from-emerald-600 to-emerald-400',
  },
  'research-conference': {
  accentColor: '#3b82f6',
  badgeClass: 'text-blue-400 bg-blue-500/10',
  iconBg: 'bg-blue-500/10',
  topBar: 'from-blue-600 to-blue-400',
  },
}

export default function AdminEventCard({ card }: { card: AdminEventCard }) {
  const router = useRouter()
  const styles = STYLES[card.id]

  return (
    <div className="relative bg-[rgb(19,20,27)] rounded-3xl p-5 flex flex-col gap-7 overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition-all">
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${styles.topBar}`} />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`w-8 h-8 rounded-xl ${styles.iconBg} flex items-center justify-center`}
            style={{ color: styles.accentColor }}
          >
            {ICONS[card.id]}
          </div>
          <h3 className="text-white text-sm font-semibold">{card.title}</h3>
        </div>
        <p className="text-white/40 text-xs leading-relaxed">{card.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-[11px] px-2 py-1 rounded-full ${styles.badgeClass}`}>
          {card.badge}
        </span>
        <button
          onClick={() => router.push(card.route)}
          className="w-7 h-7 rounded-full bg-[rgb(241,90,34)] hover:bg-[rgb(241,90,34)]/85 flex items-center justify-center transition-colors"
        >
          <span className="text-white text-base leading-none">+</span>
        </button>
      </div>
    </div>
  )
}