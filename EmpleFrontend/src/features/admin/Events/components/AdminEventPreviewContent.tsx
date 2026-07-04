'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, Gift, ExternalLink, Lock, Users, FileText, Upload, Github, Video } from 'lucide-react'
import { Event, Registration, Submission } from '../types'
import { apiRequest } from '@/shared/utils/api'
import { getEventRegistrations, getEventSubmissions } from '../services/registrations.service'

type Tab = 'overview' | 'registration' | 'problem' | 'submissions'

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'registration', label: 'Registrations', icon: Users },
  { id: 'problem', label: 'Problem Statement', icon: Lock },
  { id: 'submissions', label: 'Submissions', icon: Upload },
]

function fmt(d?: string) {
  if (!d) return 'TBA'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface Props {
  eventId: string
  onBack: () => void
}

export default function AdminEventPreviewContent({ eventId, onBack }: Props) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loadingReg, setLoadingReg] = useState(false)
  const [loadingSub, setLoadingSub] = useState(false)

  const isEmple = event?.type === 'our-hackathon'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiRequest(`/api/v1/events/${eventId}`) as { data: Event }
        setEvent(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [eventId])

  useEffect(() => {
    if (!event || activeTab !== 'registration') return
    setLoadingReg(true)
    getEventRegistrations(event._id).then(setRegistrations).catch(console.error).finally(() => setLoadingReg(false))
  }, [event, activeTab])

  useEffect(() => {
    if (!event || activeTab !== 'submissions') return
    setLoadingSub(true)
    getEventSubmissions(event._id).then(setSubmissions).catch(console.error).finally(() => setLoadingSub(false))
  }, [event, activeTab])

  if (loading) {
    return (
      <div className="p-7">
        <div className="h-44 bg-[rgb(19,20,27)] rounded-2xl animate-pulse mb-6" />
        <div className="h-64 bg-[rgb(19,20,27)] rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!event) return <div className="p-7 text-white/40 text-sm">Event not found.</div>

  return (
    <div className="p-7">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition">
          <ArrowLeft size={14} /> Back to Events
        </button>
      </div>

      <div className="relative w-full h-44 bg-[rgb(19,20,27)] rounded-2xl overflow-hidden mb-5 ring-1 ring-white/10">
        {event.banner ? (
          <img src={event.banner} alt={event.title} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-sm">No banner</div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h1 className="text-white text-xl font-bold">{event.title}</h1>
          <p className="text-white/40 text-xs mt-1">
            {event.organiser} · {fmt(event.startDate)} {event.endDate ? `– ${fmt(event.endDate)}` : ''}
          </p>
        </div>
        <span className={`text-[11px] px-3 py-1 rounded-full flex-shrink-0 mt-1 ${event.registrationOpen ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {event.registrationOpen ? '● Open' : '● Closed'}
        </span>
      </div>

      <div className="flex gap-1 border-b border-white/10 mb-6">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
                activeTab === tab.id ? 'border-[rgb(241,90,34)] text-[rgb(241,90,34)]' : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <Icon size={13} />
              {tab.label}
              {tab.id === 'registration' && registrations.length > 0 && <span className="bg-white/10 text-white/60 text-[10px] px-1.5 rounded-full">{registrations.length}</span>}
              {tab.id === 'submissions' && submissions.length > 0 && <span className="bg-white/10 text-white/60 text-[10px] px-1.5 rounded-full">{submissions.length}</span>}
            </button>
          )
        })}
      </div>

      <div>
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div>
              <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">About</h3>
              <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
            </div>
            {event.eligibility && (
              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Eligibility</h3>
                <p className="text-white/70 text-sm leading-relaxed">{event.eligibility}</p>
              </div>
            )}
            <div>
              <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Team size</h3>
              <p className="text-white/70 text-sm">{event.teamSizeMax > 1 ? `${event.teamSizeMin}–${event.teamSizeMax} members` : 'Individual'}</p>
            </div>
            {isEmple && event.rewards && (
              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Rewards</h3>
                <div className="flex items-center gap-2 text-emerald-400 text-sm"><Gift size={14} /> {event.rewards}</div>
              </div>
            )}
            {event.rulesAndGuidelines && (
              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Rules & Guidelines</h3>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{event.rulesAndGuidelines}</p>
              </div>
            )}
            {!isEmple && event.registrationLink && (
              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Registration Link</h3>
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[rgb(241,90,34)] hover:underline">
                  <ExternalLink size={12} /> {event.registrationLink}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Registrations table */}
        {activeTab === 'registration' && (
          <div className="max-w-full">
            {loadingReg ? (
              <div className="flex flex-col gap-2">{[1, 2, 3].map(i => <div key={i} className="h-10 bg-[rgb(19,20,27)] rounded-xl animate-pulse" />)}</div>
            ) : registrations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Users size={36} className="text-white/10 mb-3" />
                <p className="text-white/40 text-sm">No registrations yet.</p>
              </div>
            ) : (
              <div className="rounded-xl ring-1 ring-white/10 overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr className="bg-[rgb(19,20,27)] text-white/40 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium w-1/4">Name</th>
                      <th className="text-left px-4 py-3 font-medium w-1/3">Email</th>
                      <th className="text-left px-4 py-3 font-medium w-1/5">Phone</th>
                      <th className="text-right px-4 py-3 font-medium">Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r, i) => (
                      <tr key={r._id} className={`${i % 2 === 0 ? 'bg-[rgb(14,15,20)]' : 'bg-[rgb(17,18,24)]'} hover:bg-white/5 transition`}>
                        <td className="px-4 py-3 text-white truncate">{r.name}</td>
                        <td className="px-4 py-3 text-white/60 truncate">{r.email}</td>
                        <td className="px-4 py-3 text-white/60">{r.phone || '—'}</td>
                        <td className="px-4 py-3 text-white/40 text-right">{fmt(r.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'problem' && (
          <div className="flex flex-col gap-4 max-w-2xl">
            {isEmple ? (
              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Problem Statement</h3>
                {event.problemStatement ? (
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{event.problemStatement}</p>
                ) : (
                  <p className="text-white/40 text-sm italic">No problem statement added yet. Click Edit to add one.</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Lock size={36} className="text-white/10 mb-3" />
                <p className="text-white/40 text-sm">Not applicable for this event type.</p>
              </div>
            )}
          </div>
        )}

        {/* Submissions table — same style as Registrations */}
        {activeTab === 'submissions' && (
          <div className="max-w-full">
            {loadingSub ? (
              <div className="flex flex-col gap-2">{[1, 2, 3].map(i => <div key={i} className="h-10 bg-[rgb(19,20,27)] rounded-xl animate-pulse" />)}</div>
            ) : submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Upload size={36} className="text-white/10 mb-3" />
                <p className="text-white/40 text-sm">No submissions yet.</p>
              </div>
            ) : (
              <div className="rounded-xl ring-1 ring-white/10 overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr className="bg-[rgb(19,20,27)] text-white/40 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium w-1/4">Name</th>
                      <th className="text-left px-4 py-3 font-medium w-1/4">Email</th>
                      <th className="text-left px-4 py-3 font-medium w-1/5">GitHub</th>
                      <th className="text-left px-4 py-3 font-medium w-1/5">Video</th>
                      <th className="text-right px-4 py-3 font-medium">Submitted On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, i) => (
                      <tr key={s._id} className={`${i % 2 === 0 ? 'bg-[rgb(14,15,20)]' : 'bg-[rgb(17,18,24)]'} hover:bg-white/5 transition`}>
                        <td className="px-4 py-3 text-white truncate">{s.name || '—'}</td>
                        <td className="px-4 py-3 text-white/60 truncate">{s.email}</td>
                        <td className="px-4 py-3">
                          <a href={s.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-400 hover:underline">
                            <Github size={12} /> Link
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <a href={s.videoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[rgb(241,90,34)] hover:underline">
                            <Video size={12} /> Link
                          </a>
                        </td>
                        <td className="px-4 py-3 text-white/40 text-right">{fmt(s.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}