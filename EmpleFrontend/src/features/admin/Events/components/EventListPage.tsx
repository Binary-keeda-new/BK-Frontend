'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trophy, Sparkles, Rocket, Pencil, Trash2, Plus, CalendarDays, Eye, BookOpen } from 'lucide-react'
import { Event, EventType } from '../types'
import { getEventsByType, deleteEvent } from '../services/events.service'

const CONFIG: Record<EventType, {
  label: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeClass: string;
  iconBg: string;
}> = {
  hackathon: {
    label: 'Hackathons',
    icon: <Trophy size={16} />,
    accentColor: '#ff5722',
    badgeClass: 'text-orange-400 bg-orange-500/10',
    iconBg: 'bg-orange-500/10',
  },
  techfest: {
    label: 'Techfest',
    icon: <Sparkles size={16} />,
    accentColor: '#a855f7',
    badgeClass: 'text-purple-400 bg-purple-500/10',
    iconBg: 'bg-purple-500/10',
  },
  'our-hackathon': {
    label: 'Emple Events',
    icon: <Rocket size={16} />,
    accentColor: '#10b981',
    badgeClass: 'text-emerald-400 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/10',
  },
  'research-conference': {
    label: 'Research Conferences',
    icon: <BookOpen size={16} />,
    accentColor: '#3b82f6',
    badgeClass: 'text-blue-400 bg-blue-500/10',
    iconBg: 'bg-blue-500/10',
  },
}

interface Props {
  type: EventType
  onPreview?: (id: string) => void
  onEdit?: (event: Event) => void
  onAddNew?: () => void
}

export default function EventListPage({ type, onPreview, onEdit, onAddNew }: Props) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const config = CONFIG[type]

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getEventsByType(type)
      setEvents(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    try {
      await deleteEvent(id)
      setEvents((prev) => prev.filter((e) => e._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-7">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-7 h-7 rounded-lg ${config.iconBg} flex items-center justify-center`} style={{ color: config.accentColor }}>
              {config.icon}
            </div>
            <h1 className="text-white text-2xl font-bold">{config.label}</h1>
          </div>
          <p className="text-white/40 text-sm">Manage all {config.label.toLowerCase()} visible to users.</p>
        </div>
        {onAddNew && (
        <button
          onClick={() => onAddNew()}
          className="flex items-center gap-2 rounded-2xl bg-[rgb(241,90,34)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[rgb(241,90,34)]/85"
        >
          <Plus size={16} /> Add Event
        </button>
      )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-[rgb(19,20,27)] animate-pulse ring-1 ring-white/5" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CalendarDays size={40} className="mb-3 text-white/15" />
          <p className="text-white/40 text-sm">No events yet.</p>
          <p className="text-white/25 text-xs mt-1">
            Click <span className="text-[rgb(241,90,34)]">Add Event</span> to create one.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div key={event._id} className="flex items-center justify-between gap-4 rounded-2xl bg-[rgb(19,20,27)] px-5 py-4 ring-1 ring-white/10 hover:ring-white/15 transition">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white text-sm font-semibold truncate">{event.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${config.badgeClass}`}>
                    {event.registrationOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-white/30">
                  {event.organiser && <span>By {event.organiser}</span>}
                  {event.date && (
                    <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => onPreview?.(event._id)} className="rounded-xl bg-[rgb(10,11,14)] p-2 text-white/50 ring-1 ring-white/10 transition hover:text-white" title="Preview">
                  <Eye size={14} />
                </button>
                <button onClick={() => onEdit?.(event)} className="rounded-xl bg-[rgb(10,11,14)] p-2 text-white/50 ring-1 ring-white/10 transition hover:text-white" title="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(event._id)} className="rounded-xl bg-[rgb(10,11,14)] p-2 text-red-400/50 ring-1 ring-white/10 transition hover:text-red-400" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}