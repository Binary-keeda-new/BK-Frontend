'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Calendar, Gift, ExternalLink, Lock, Trophy, Stars, Rocket,
  Users, Github, Video, CheckCircle2, AlertCircle, ChevronDown
} from 'lucide-react'
import {
  fetchEventById, fetchRegistrationStatus, registerForEvent,
  fetchSubmissionStatus, submitSolution
} from '../api/events.api'
import { useWallet } from "@/providers/WalletProvider";
import { useNotification } from "@/providers/NotificationProvider";

const TYPE_CONFIG = {
  hackathon: { label: 'Hackathon', color: 'text-[#f26522]', bg: 'bg-[#2a1a10]', Icon: Trophy },
  techfest: { label: 'Techfest', color: 'text-[#9575cd]', bg: 'bg-[#1a1030]', Icon: Stars },
  'our-hackathon': { label: 'By Emple', color: 'text-[#2ecc71]', bg: 'bg-[#0d2018]', Icon: Rocket },
}

function fmt(d?: string) {
  if (!d) return 'TBA'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function daysLeft(d?: string) {
  if (!d) return null
  return Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export default function EventDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [descExpanded, setDescExpanded] = useState(false)
  const { config: walletConfig, refreshWallet } = useWallet()
  const { notifyReward } = useNotification()
  const submissionReward = walletConfig?.HACKATHON?.SUBMISSION_REWARD || 50

  const [isRegistered, setIsRegistered] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' })
  const [showRegForm, setShowRegForm] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)
  const [regError, setRegError] = useState('')

  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [subForm, setSubForm] = useState({ githubLink: '', videoLink: '' })
  const [subLoading, setSubLoading] = useState(false)
  const [subSuccess, setSubSuccess] = useState(false)
  const [subError, setSubError] = useState('')

  const [activeSection, setActiveSection] = useState('details')

  const detailsRef = useRef<HTMLDivElement>(null)
  const datesRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const submitRef = useRef<HTMLDivElement>(null)

  const isEmple = event?.type === 'our-hackathon'
  const config = event ? TYPE_CONFIG[event.type as keyof typeof TYPE_CONFIG] : null
  const isTeamEvent = event?.teamSizeMax > 1

  useEffect(() => {
    const load = async () => {
      try {
        const eventData = await fetchEventById(id)
        setEvent(eventData)

        try {
          const regStatus = await fetchRegistrationStatus(id)
          setIsRegistered(regStatus.isRegistered)
        } catch {}

        try {
          const subStatus = await fetchSubmissionStatus(id)
          setHasSubmitted(subStatus.hasSubmitted)
          if (subStatus.submission) {
            setSubForm({
              githubLink: subStatus.submission.githubLink || '',
              videoLink: subStatus.submission.videoLink || '',
            })
          }
        } catch {}
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  useEffect(() => {
    const sections = [
      { id: 'details', ref: detailsRef },
      { id: 'dates', ref: datesRef },
      { id: 'problem', ref: problemRef },
      { id: 'submit', ref: submitRef },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find(s => s.ref.current === entry.target)
            if (match) setActiveSection(match.id)
          }
        })
      },
      { rootMargin: '-120px 0px -60% 0px' }
    )

    sections.forEach(s => { if (s.ref.current) observer.observe(s.ref.current) })
    return () => observer.disconnect()
  }, [event, isRegistered])

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, sectionId: string, locked: boolean) => {
    if (locked) return
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(sectionId)
  }

  const handleRegister = async () => {
    if (!regForm.name || !regForm.email) { setRegError('Name and email are required'); return }
    setRegLoading(true)
    setRegError('')
    try {
      await registerForEvent(id, regForm)
      setIsRegistered(true)
      setRegSuccess(true)
      setShowRegForm(false)
    } catch (err: any) {
      setRegError(err.message || 'Registration not available yet')
    } finally {
      setRegLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!subForm.githubLink || !subForm.videoLink) {
      setSubError('GitHub link and video link are required')
      return
    }
    setSubLoading(true)
    setSubError('')
    try {
      await submitSolution(id, subForm)
      setHasSubmitted(true)
      setSubSuccess(true)
      notifyReward("Hackathon Submission Reward", "Great work!", submissionReward)
      refreshWallet()
    } catch (err: any) {
      setSubError(err.message || 'Submission not available yet')
    } finally {
      setSubLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-32 rounded-2xl bg-[#1a1a1a] animate-pulse mb-6" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-64 bg-[#1a1a1a] rounded-xl animate-pulse" />
          <div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (!event) return <div className="p-6 text-[#555] text-sm">Event not found.</div>

  const regDaysLeft = daysLeft(event.endDate)

  const NAV_ITEMS = [
    { id: 'details', label: 'Details', ref: detailsRef, locked: false },
    { id: 'dates', label: 'Dates & Deadlines', ref: datesRef, locked: false },
    ...(isEmple ? [{ id: 'problem', label: 'Problem Statement', ref: problemRef, locked: !isRegistered }] : []),
    ...(isEmple ? [{ id: 'submit', label: 'Submit', ref: submitRef, locked: !isRegistered }] : []),
  ]

  return (
    <div className="min-h-screen">
      {/* Sticky top nav — jumps to sections, doesn't swap content */}
      <div className="sticky top-0 z-20 bg-[#0d0d0d]/95 backdrop-blur border-b border-[#1f1f1f] px-6">
        <div className="flex items-center gap-1">
          <button onClick={() => router.push('/user/events')} className="flex items-center gap-1.5 text-[#777] hover:text-white text-sm py-3 pr-4 transition">
            <ArrowLeft size={14} /> Back
          </button>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.ref, item.id, item.locked)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-1.5 ${
                activeSection === item.id
                  ? 'border-[#f26522] text-[#f26522]'
                  : item.locked
                  ? 'border-transparent text-[#444] cursor-not-allowed'
                  : 'border-transparent text-[#777] hover:text-white'
              }`}
            >
              {item.locked && <Lock size={11} />}
              {item.id === 'submit' && isRegistered && hasSubmitted && <CheckCircle2 size={11} className="text-[#2ecc71]" />}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column — everything scrolls in one flow */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Header card */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 flex items-start gap-4">
              <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden ${config?.bg}`}>
                {event.banner ? (
                  <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  config && <config.Icon size={28} className={config.color} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-white">{event.title}</h1>
                    <p className="text-sm text-[#777] mt-0.5">{event.organiser}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${
                    event.registrationOpen
                      ? 'bg-[#0d2a14] text-[#2ecc71] border border-[#1a4a24]'
                      : 'bg-[#2a1010] text-[#e74c3c] border border-[#4a1a1a]'
                  }`}>
                    {event.registrationOpen ? '● Open' : '● Closed'}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#888]">
                  <span className="flex items-center gap-1.5">
                    <Users size={13} /> {isTeamEvent ? `${event.teamSizeMin} – ${event.teamSizeMax} members` : 'Individual'}
                  </span>
                  <span className={`flex items-center gap-1.5 ${config?.color}`}>{config?.label}</span>
                </div>
              </div>
            </div>

            {/* Details section */}
            <div ref={detailsRef} id="details" className="scroll-mt-20 flex flex-col gap-6">

              {event.eligibility && (
                <div>
                  <h2 className="text-white font-semibold text-sm mb-2 border-l-2 border-[#f26522] pl-3">Eligibility</h2>
                  <p className="text-[#aaa] text-sm leading-relaxed pl-3">{event.eligibility}</p>
                </div>
              )}

              <div>
                <h2 className="text-white font-semibold text-sm mb-2 border-l-2 border-[#f26522] pl-3">
                  All that you need to know about {event.title}
                </h2>
                <div className="pl-3">
                  <p className={`text-[#aaa] text-sm leading-relaxed whitespace-pre-line ${!descExpanded ? 'line-clamp-6' : ''}`}>
                    {event.description}
                  </p>
                  {event.description?.length > 300 && (
                    <button onClick={() => setDescExpanded(!descExpanded)} className="flex items-center gap-1 text-xs text-[#f26522] mt-2 hover:underline">
                      {descExpanded ? 'Show less' : 'Read More'} <ChevronDown size={12} className={descExpanded ? 'rotate-180' : ''} />
                    </button>
                  )}
                </div>
              </div>

              {isEmple && event.rewards && (
                <div>
                  <h2 className="text-white font-semibold text-sm mb-2 border-l-2 border-[#f26522] pl-3">Prizes</h2>
                  <div className="ml-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
                    <Gift size={18} className="text-[#2ecc71]" />
                    <span className="text-[#2ecc71] font-medium text-sm">{event.rewards}</span>
                  </div>
                </div>
              )}

              {event.rulesAndGuidelines && (
                <div>
                  <h2 className="text-white font-semibold text-sm mb-2 border-l-2 border-[#f26522] pl-3">Rules & Guidelines</h2>
                  <p className="text-[#aaa] text-sm leading-relaxed whitespace-pre-line pl-3">{event.rulesAndGuidelines}</p>
                </div>
              )}

              {!isEmple && event.registrationLink && (
                <div className="pl-3">
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#f26522] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#d4561e] transition">
                    <ExternalLink size={14} /> Apply on {event.organiser || 'official site'}
                  </a>
                </div>
              )}
            </div>

            {/* Dates section */}
            <div ref={datesRef} id="dates" className="scroll-mt-20">
              <h2 className="text-white font-semibold text-sm mb-4 border-l-2 border-[#f26522] pl-3">Important dates & deadlines</h2>
              <div className="flex flex-col gap-3 pl-3">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2a1a10] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-[#f26522] uppercase">{event.endDate ? new Date(event.endDate).toLocaleDateString('en-IN', { month: 'short' }) : '—'}</span>
                    <span className="text-sm text-white font-bold">{event.endDate ? new Date(event.endDate).getDate() : '—'}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Registration Deadline</p>
                    <p className="text-[#777] text-xs">{fmt(event.endDate)}</p>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0d2018] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-[#2ecc71] uppercase">{event.startDate ? new Date(event.startDate).toLocaleDateString('en-IN', { month: 'short' }) : '—'}</span>
                    <span className="text-sm text-white font-bold">{event.startDate ? new Date(event.startDate).getDate() : '—'}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Event Start</p>
                    <p className="text-[#777] text-xs">{fmt(event.startDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Statement section */}
            {isEmple && (
              <div ref={problemRef} id="problem" className="scroll-mt-20 flex flex-col gap-4">
                <h2 className="text-white font-semibold text-sm border-l-2 border-[#f26522] pl-3">Problem Statement</h2>
                {!isRegistered ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Lock size={40} className="text-[#333] mb-3" />
                    <p className="text-[#555] text-sm">Register to unlock the problem statement</p>
                  </div>
                ) : (
                  <>
                    <div className="ml-3 bg-[#0d2018] border border-[#1a4a24] rounded-xl px-4 py-3 text-xs text-[#2ecc71] flex items-center gap-2">
                      <CheckCircle2 size={12} /> You are registered — problem statement unlocked
                    </div>
                    {event.problemStatement ? (
                      <div className="ml-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
                        <p className="text-[#aaa] text-sm leading-relaxed whitespace-pre-line">{event.problemStatement}</p>
                      </div>
                    ) : (
                      <p className="ml-3 text-[#555] text-sm italic">Problem statement not yet published by the organiser.</p>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Submit section */}
            {isEmple && (
              <div ref={submitRef} id="submit" className="scroll-mt-20 flex flex-col gap-4 pb-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold text-sm border-l-2 border-[#f26522] pl-3">Submit Solution</h2>
                  {!hasSubmitted && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md text-xs font-medium">
                      <span>🪙</span> Earn {submissionReward} Coins on Submission
                    </div>
                  )}
                </div>
                {!isRegistered ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Lock size={40} className="text-[#333] mb-3" />
                    <p className="text-[#555] text-sm">Register to submit your solution</p>
                  </div>
                ) : (
                  <div className="ml-3 flex flex-col gap-4">
                    {hasSubmitted && (
  <div className="bg-[#0d2018] border border-[#1a4a24] rounded-xl px-4 py-3 text-xs text-[#2ecc71] flex items-center gap-2">
    <CheckCircle2 size={12} /> Solution submitted
  </div>
)}

{hasSubmitted && (event.solutionReveal || event.solutionRevealLink) && (
  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 flex flex-col gap-3">
    <h3 className="text-white font-semibold text-sm">Official Solution</h3>
    {event.solutionReveal && (
      <p className="text-[#aaa] text-sm leading-relaxed whitespace-pre-line">{event.solutionReveal}</p>
    )}
    {event.solutionRevealLink && (
      <a href={event.solutionRevealLink} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-[#f26522] hover:underline w-fit">
        <ExternalLink size={12} /> {event.solutionRevealLink}
      </a>
    )}
  </div>
)}

                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#777] mb-1.5 flex items-center gap-1"><Github size={11} /> GitHub Link *</label>
                          <input value={subForm.githubLink} onChange={e => setSubForm(p => ({ ...p, githubLink: e.target.value }))}
                            placeholder="https://github.com/..."
                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f26522] transition placeholder:text-[#444]" />
                        </div>
                        <div>
                          <label className="block text-xs text-[#777] mb-1.5 flex items-center gap-1"><Video size={11} /> Video Link *</label>
                          <input value={subForm.videoLink} onChange={e => setSubForm(p => ({ ...p, videoLink: e.target.value }))}
                            placeholder="https://youtube.com/..."
                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#f26522] transition placeholder:text-[#444]" />
                        </div>
                      </div>
                      {subError && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} /> {subError}</p>}
                      <button onClick={handleSubmit} disabled={subLoading}
                        className="w-full py-2.5 bg-[#f26522] text-white text-sm font-medium rounded-xl hover:bg-[#d4561e] transition disabled:opacity-50">
                        {subLoading ? 'Submitting...' : hasSubmitted ? 'Update Submission' : 'Submit Solution'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right sticky card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 flex flex-col gap-3">
              <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 overflow-hidden">
                {regDaysLeft !== null && regDaysLeft >= 0 && (
                  <div className="absolute top-0 left-0 bg-[#2a1a10] text-[#f26522] text-[11px] font-medium px-3 py-1.5 rounded-br-xl">
                    {regDaysLeft} {regDaysLeft === 1 ? 'Day' : 'Days'} Left
                  </div>
                )}
                <div className="pt-6 flex flex-col gap-3">
                  <p className="text-white text-sm font-medium">Hi! Ready to participate?</p>

                  {isEmple ? (
                    isRegistered || regSuccess ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0d2018] border border-[#1a4a24] text-[#2ecc71] text-sm font-medium">
                          <CheckCircle2 size={15} /> Registered
                        </div>
                        <button onClick={() => scrollTo(submitRef, 'submit', false)}
                          className="w-full py-2.5 border border-[#333] text-[#ccc] text-sm rounded-xl hover:border-[#555] transition">
                          {hasSubmitted ? 'Update Submission' : 'Submit Solution'}
                        </button>
                      </div>
                    ) : showRegForm ? (
                      <div className="flex flex-col gap-3">
                        <input placeholder="Full Name *" value={regForm.name} onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#f26522] transition" />
                        <input placeholder="Email *" type="email" value={regForm.email} onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#f26522] transition" />
                        <input placeholder="Phone (optional)" value={regForm.phone} onChange={e => setRegForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#f26522] transition" />
                        {regError && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} /> {regError}</p>}
                        <button onClick={handleRegister} disabled={regLoading}
                          className="w-full py-2.5 bg-[#f26522] text-white text-sm font-medium rounded-xl hover:bg-[#d4561e] transition disabled:opacity-50">
                          {regLoading ? 'Registering...' : 'Confirm Registration'}
                        </button>
                        <button onClick={() => { setShowRegForm(false); setRegError('') }} className="w-full py-2 text-[#777] text-xs hover:text-white transition">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => event.registrationOpen && setShowRegForm(true)} disabled={!event.registrationOpen}
                        className="w-full py-2.5 bg-[#f26522] text-white text-sm font-medium rounded-xl hover:bg-[#d4561e] transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {event.registrationOpen ? 'Register' : 'Registration Closed'}
                      </button>
                    )
                  ) : (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer"
                      className={`w-full py-2.5 text-center text-sm font-medium rounded-xl transition flex items-center justify-center gap-2 ${
                        event.registrationOpen ? 'bg-[#f26522] text-white hover:bg-[#d4561e]' : 'bg-[#111] text-[#555] border border-[#2a2a2a] pointer-events-none'
                      }`}>
                      <ExternalLink size={13} /> {event.registrationOpen ? 'Apply Now' : 'Closed'}
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#777]">Registration deadline</span>
                  <span className="text-white">{fmt(event.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Event start</span>
                  <span className="text-white">{fmt(event.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Team size</span>
                  <span className="text-white">{isTeamEvent ? `${event.teamSizeMin}–${event.teamSizeMax}` : 'Individual'}</span>
                </div>
                {isEmple && event.rewards && (
                  <div className="flex justify-between pt-2.5 border-t border-[#222]">
                    <span className="text-[#777]">Prize pool</span>
                    <span className="text-[#2ecc71] font-medium">{event.rewards}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}