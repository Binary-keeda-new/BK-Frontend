'use client'

import { useRouter } from 'next/navigation'
import { Trophy, Sparkles, Rocket, ArrowRight } from 'lucide-react'
import { EventType } from '../types'
import { CATEGORY_STYLES } from '../constants'

const ICONS = {
  hackathon: <Trophy size={22} />,
  techfest: <Sparkles size={22} />,
  'our-hackathon': <Rocket size={22} />,
}

interface Props {
  id: EventType
  title: string
  description: string
  badge: string
  route: string
}

export default function EventCategoryCard({ id, title, description, badge, route }: Props) {
  const router = useRouter()
  const styles = CATEGORY_STYLES[id]

  return (
    <div
      onClick={() => router.push(route)}
      className="bg-[rgb(19,20,27)] rounded-3xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer group"
    >
      <div className={`h-20 bg-gradient-to-br ${styles.gradientClass} flex items-center justify-center relative`}>
        <div
          className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}
          style={{ color: styles.accentColor }}
        >
          {ICONS[id]}
        </div>
        <span className={`absolute top-2.5 right-2.5 text-[10px] px-2 py-0.5 rounded-full ${styles.badgeClass}`}>
          {badge}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-white text-sm font-semibold mb-1.5">{title}</h3>
        <p className="text-white/40 text-xs leading-relaxed mb-3">{description}</p>
        <div className="flex items-center justify-end">
          <span
            className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
            style={{ color: styles.accentColor }}
          >
            View all <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </div>
  )
}