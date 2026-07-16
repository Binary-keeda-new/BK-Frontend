'use client'

import { useState } from 'react'
import { X, Calendar, Gift, ExternalLink, Link, Lock, Users, FileText, Upload } from 'lucide-react'
import { Event } from '../types'

interface Props {
  event: Event | null
  onClose: () => void
}

type Tab = 'overview' | 'registration' | 'problem' | 'submissions'

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'registration', label: 'Registrations', icon: Users },
  { id: 'problem', label: 'Problem Statement', icon: Lock },
  { id: 'submissions', label: 'Submissions', icon: Upload },
]

function formatDate(d?: string) {
  if (!d) return 'TBA'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function EventPreviewModal({ event, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  if (!event) return null

  const isEmple = event.type === 'our-hackathon'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[rgb(14,15,20)] rounded-2xl ring-1 ring-white/10 flex flex-col overflow-hidden">

        {/* Banner */}
        <div className="relative w-full h-44 bg-[rgb(19,20,27)] flex-shrink-0">
          {event.banner ? (
            <img src={event.banner} alt={event.title} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/10 text-sm">No banner</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[rgb(14,15,20)] to-transparent" />
        </div>

        {/* Title row */}
        <div className="px-6 pt-2 pb-4 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-white text-lg font-bold">{event.title}</h2>
              <p className="text-white/40 text-xs mt-0.5">
                {event.organiser} · {formatDate(event.startDate)} {event.endDate ? `– ${formatDate(event.endDate)}` : ''}
              </p>
            </div>
            <span className={`text-[11px] px-3 py-1 rounded-full flex-shrink-0 mt-1 ${
              event.registrationOpen
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}>
              {event.registrationOpen ? '● Open' : '● Closed'}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-white/10">
            {TABS.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all -mb-px ${
                    activeTab === tab.id
                      ? 'border-[rgb(241,90,34)] text-[rgb(241,90,34)]'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                >
                  <Icon size={12} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">About</h3>
                <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
              </div>

              {isEmple && event.rewards && (
                <div>
                  <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Rewards</h3>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <Gift size={14} /> {event.rewards}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Dates</h3>
                <div className="flex flex-col gap-1.5 text-sm text-white/60">
                  <span className="flex items-center gap-2"><Calendar size={13} /> Start: {formatDate(event.startDate)}</span>
                  <span className="flex items-center gap-2"><Calendar size={13} /> End: {formatDate(event.endDate)}</span>
                </div>
              </div>
              {isEmple && event.solutionRevealLink && (
  <div>
    <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
      Solution Reveal Link
    </h3>

    <a
      href={event.solutionRevealLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs text-purple-400 hover:underline"
    >
      <ExternalLink size={12} /> {event.solutionRevealLink}
    </a>
  </div>
)}
              {event.registrationLink && (
                <div>
                  <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Registration Link</h3>
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[rgb(241,90,34)] hover:underline"
                  >
                    <ExternalLink size={12} /> {event.registrationLink}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Registrations */}
          {activeTab === 'registration' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users size={36} className="text-white/10 mb-3" />
              <p className="text-white/40 text-sm">Registrations not tracked yet.</p>
              <p className="text-white/25 text-xs mt-1 max-w-xs">
                To enable this, add a <span className="text-[rgb(241,90,34)]">registrations</span> collection
                on the backend and a <span className="text-[rgb(241,90,34)]">GET /api/v1/admin/events/:id/registrations</span> endpoint.
              </p>
            </div>
          )}

          {/* Problem Statement */}
          {activeTab === 'problem' && (
            <div className="flex flex-col gap-4">
              {isEmple ? (
                <>
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-xs text-amber-400 flex items-center gap-2">
                    <Lock size={12} /> Visible to users only after registration
                  </div>
                  <div>
                    <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Problem Statement</h3>
                    <p className="text-white/40 text-sm italic">
                      Add problem statement content to the event form to display it here.
                    </p>
                  </div>
                  {event.solutionRevealLink && (
                    <div>
                      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Solution Submission Link</h3>
                      <a
                        href={event.solutionRevealLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                      >
                        <ExternalLink size={12} /> {event.solutionRevealLink}
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Lock size={36} className="text-white/10 mb-3" />
                  <p className="text-white/40 text-sm">Problem statement not applicable</p>
                  <p className="text-white/25 text-xs mt-1">Only available for Emple-hosted hackathons.</p>
                </div>
              )}
            </div>
          )}

          {/* Submissions */}
          {activeTab === 'submissions' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Upload size={36} className="text-white/10 mb-3" />
              <p className="text-white/40 text-sm">Submissions not tracked yet.</p>
              <p className="text-white/25 text-xs mt-1 max-w-xs">
                To enable this, add a <span className="text-[rgb(241,90,34)]">submissions</span> collection
                on the backend and a <span className="text-[rgb(241,90,34)]">GET /api/v1/admin/events/:id/submissions</span> endpoint.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}