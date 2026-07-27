'use client'

import { useState } from 'react'
import { Trophy, Sparkles, Rocket, BookOpen } from 'lucide-react'
import EventListPage from './EventListPage'
import AdminEventPreviewContent from './AdminEventPreviewContent'
import AdminEventFormPage from './AdminEventFormPage'
import { Event } from '../types'

type EventSubPage = 'hackathon' | 'techfest' | 'our-hackathon' | 'research-conference'

interface Props {
  subPage: EventSubPage | null
  onSelectSubPage: (sub: EventSubPage | null) => void
}

const CARDS = [
  {
    id: 'hackathon' as const,
    title: 'Hackathons',
    description: 'Manage and post external hackathon events for students to discover.',
    badge: 'External',
    icon: <Trophy size={18} />,
    accentColor: '#ff5722',
    badgeClass: 'text-orange-400 bg-orange-500/10',
    iconBg: 'bg-orange-500/10',
    topBar: 'from-orange-500 to-orange-300',
  },
  {
    id: 'techfest' as const,
    title: 'Techfest',
    description: 'Add and manage tech festival events including workshops and competitions.',
    badge: 'Festival',
    icon: <Sparkles size={18} />,
    accentColor: '#a855f7',
    badgeClass: 'text-purple-400 bg-purple-500/10',
    iconBg: 'bg-purple-500/10',
    topBar: 'from-purple-600 to-purple-400',
  },
  {
    id: 'our-hackathon' as const,
    title: 'Emple Events',
    description: 'Create and manage hackathons hosted directly on the Emple platform.',
    badge: 'Emple Events',
    icon: <Rocket size={18} />,
    accentColor: '#10b981',
    badgeClass: 'text-emerald-400 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/10',
    topBar: 'from-emerald-600 to-emerald-400',
  },
  {
  id: 'research-conference' as const,
  title: 'Research Conferences',
  description:
    'Manage research conferences available for students and researchers.',
  badge: 'Research',
  icon: <BookOpen size={18} />,
  accentColor: '#3b82f6',
  badgeClass: 'text-blue-400 bg-blue-500/10',
  iconBg: 'bg-blue-500/10',
  topBar: 'from-blue-600 to-blue-400',
},
]

export default function AdminEventsPage({ subPage, onSelectSubPage }: Props) {
  const [previewEventId, setPreviewEventId] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<'create' | Event | null>(null)
  const [listRefreshKey, setListRefreshKey] = useState(0)

  if (subPage) {
    if (previewEventId) {
      return <AdminEventPreviewContent eventId={previewEventId} onBack={() => setPreviewEventId(null)} />
    }

    if (formMode) {
      return (
        <AdminEventFormPage
          editTarget={formMode === 'create' ? null : formMode}
          defaultType={subPage}
          onCancel={() => setFormMode(null)}
          onSuccess={() => {
            setFormMode(null)
            setListRefreshKey((k) => k + 1)
          }}
        />
      )
    }

    return (
      <div>
        <div className="px-7 pt-6">
          <button
            onClick={() => onSelectSubPage(null)}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition mb-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Events
          </button>
        </div>
        <EventListPage
          key={listRefreshKey}
          type={subPage}
          onPreview={setPreviewEventId}
          onEdit={(event) => setFormMode(event)}
          onAddNew={() => setFormMode('create')}
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mb-8">
        <h1 className="text-[22px] font-extrabold leading-tight text-[var(--clr-text)] sm:text-3xl">
          <span className="text-[var(--clr-accent)]">Events</span>
        </h1>
        <p className="mt-1 text-sm text-[var(--clr-text2)]">
          Manage all events visible to users on the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="relative bg-[rgb(19,20,27)] rounded-3xl p-5 flex flex-col gap-7 overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer"
            onClick={() => onSelectSubPage(card.id)}
          >
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.topBar}`} />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center`} style={{ color: card.accentColor }}>
                  {card.icon}
                </div>
                <h3 className="text-white text-sm font-semibold">{card.title}</h3>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">{card.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] px-2 py-1 rounded-full ${card.badgeClass}`}>{card.badge}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onSelectSubPage(card.id) }}
                className="w-7 h-7 rounded-full bg-[rgb(241,90,34)] hover:bg-[rgb(241,90,34)]/85 flex items-center justify-center transition-colors"
              >
                <span className="text-white text-base leading-none">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}