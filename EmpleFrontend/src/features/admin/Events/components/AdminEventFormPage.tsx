'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ImageIcon } from 'lucide-react'
import { Event, EventFormData, EventType } from '../types'
import { createEvent, updateEvent } from '../services/events.service'

const EMPTY_FORM: EventFormData = {
  title: '',
  description: '',
  type: 'hackathon',
  date: '',
  startDate: '',
  endDate: '',
  registrationLink: '',
  registrationOpen: true,
  organiser: '',
  banner: '',
  eligibility: '',
  rulesAndGuidelines: '',
  teamSizeMin: 1,
  teamSizeMax: 1,
  problemStatement: '',
  rewards: '',
  solutionReveal: '',
  solutionRevealLink: '',
}

const TYPE_LABELS: Record<EventType, string> = {
  hackathon: 'Hackathon',
  techfest: 'Techfest',
  'our-hackathon': 'Emple Events',
  'research-conference': 'Research Conference',
}

interface Props {
  editTarget: Event | null
  defaultType: EventType
  onCancel: () => void
  onSuccess: (event: Event) => void
}

export default function AdminEventFormPage({ editTarget, defaultType, onCancel, onSuccess }: Props) {
  const [formData, setFormData] = useState<EventFormData>({ ...EMPTY_FORM, type: defaultType })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editTarget) {
      const { _id, createdAt, updatedAt, isActive, ...rest } = editTarget
      setFormData({
        ...EMPTY_FORM,
        ...rest,
        startDate: rest.startDate ?? '',
        endDate: rest.endDate ?? '',
        eligibility: rest.eligibility ?? '',
        rulesAndGuidelines: rest.rulesAndGuidelines ?? '',
        teamSizeMin: rest.teamSizeMin ?? 1,
        teamSizeMax: rest.teamSizeMax ?? 1,
        problemStatement: rest.problemStatement ?? '',
        rewards: rest.rewards ?? '',
        solutionReveal: rest.solutionReveal ?? '',
        solutionRevealLink: rest.solutionRevealLink ?? '',
      })
    } else {
      setFormData({ ...EMPTY_FORM, type: defaultType })
    }
  }, [editTarget, defaultType])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.date) return
    try {
      setLoading(true)
      const result = editTarget ? await updateEvent(editTarget._id, formData) : await createEvent(formData)
      onSuccess(result)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isEdit = !!editTarget
  const isOurHackathon = formData.type === 'our-hackathon'

  return (
    <div className="p-7 max-w-3xl mx-auto">
      {/* Header */}
      <button onClick={onCancel} className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition mb-4">
        <ArrowLeft size={14} /> Back to Events
      </button>

      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">{isEdit ? 'Edit Event' : 'Create Event'}</h1>
        <p className="text-white/40 text-sm mt-1">
          {isEdit ? 'Update the event details below.' : `Fill in the details to post a new ${TYPE_LABELS[formData.type]}.`}
        </p>
      </div>

      <div className="space-y-4">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">Title</label>
          <input
            name="title"
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
          />
        </div>

        {/* Organiser + Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Organiser</label>
            <input
              name="organiser"
              placeholder="e.g. Devfolio"
              value={formData.organiser}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Event Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={!!editTarget}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 disabled:opacity-50"
            >
              <option value="hackathon">Hackathon</option>
              <option value="techfest">Techfest</option>
              <option value="our-hackathon">Emple Events</option>
              <option value="research-conference">Research Conference</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">Description</label>
          <textarea
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
          />
        </div>

        {/* Event Date + Registration Link */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Event Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Registration Link</label>
            <input
              name="registrationLink"
              placeholder="https://..."
              value={formData.registrationLink}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>
        </div>

        {/* Start + End Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Start Date</label>
            <input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">End Date</label>
            <input
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* Banner with fixed-size guidance + live preview */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Banner Image URL <span className="text-xs text-white/30">— recommended size 1200×400px (3:1 ratio)</span>
          </label>
          <input
            name="banner"
            placeholder="https://... (optional)"
            value={formData.banner}
            onChange={handleChange}
            className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
          />
          <div className="mt-2 w-full h-32 rounded-xl bg-[rgb(10,11,14)] ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
            {formData.banner ? (
              <img src={formData.banner} alt="Banner preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-white/20">
                <ImageIcon size={20} />
                <span className="text-xs">Banner preview (1200×400px)</span>
              </div>
            )}
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">Eligibility</label>
          <textarea
            name="eligibility"
            placeholder="e.g. Undergraduate, Postgraduate, Engineering Students, School Students..."
            value={formData.eligibility}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
          />
        </div>

        {/* Rules & Guidelines */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">Rules & Guidelines</label>
          <textarea
            name="rulesAndGuidelines"
            placeholder="List the rules, judging criteria, code of conduct..."
            value={formData.rulesAndGuidelines}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
          />
        </div>

        {/* Team Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Team Size Min</label>
            <input
              name="teamSizeMin"
              type="number"
              min={1}
              value={formData.teamSizeMin}
              onChange={(e) => setFormData((prev) => ({ ...prev, teamSizeMin: Number(e.target.value) }))}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Team Size Max <span className="text-xs text-white/30">(set to 1 for solo)</span>
            </label>
            <input
              name="teamSizeMax"
              type="number"
              min={1}
              value={formData.teamSizeMax}
              onChange={(e) => setFormData((prev) => ({ ...prev, teamSizeMax: Number(e.target.value) }))}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* Our Hackathon only fields */}
        {isOurHackathon && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">Rewards / Prize Pool</label>
              <input
                name="rewards"
                placeholder="e.g. ₹1,00,000 total prize pool"
                value={formData.rewards}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">
                Problem Statement <span className="text-xs text-white/30">(visible only after registration)</span>
              </label>
              <textarea
                name="problemStatement"
                placeholder="Describe the problem participants need to solve..."
                value={formData.problemStatement}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
              />
            </div>

            <div className="rounded-2xl bg-[rgb(10,11,14)] p-4 ring-1 ring-white/10 space-y-4">
              <p className="text-sm font-medium text-white/75">
                Solution Reveal <span className="text-xs text-white/30">(shown to a user only after they submit their solution)</span>
              </p>
              <div>
                <label className="mb-2 block text-xs text-white/60">Write-up</label>
                <textarea
                  name="solutionReveal"
                  placeholder="Explain the official solution / approach..."
                  value={formData.solutionReveal}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl bg-[rgb(19,20,27)] p-3 text-white outline-none ring-1 ring-white/8 placeholder:text-white/25"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">Reference Link</label>
                <input
                  name="solutionRevealLink"
                  placeholder="https://github.com/... (winning solution repo, etc.)"
                  value={formData.solutionRevealLink}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(19,20,27)] p-3 text-white outline-none ring-1 ring-white/8 placeholder:text-white/25"
                />
              </div>
            </div>
          </>
        )}

        {/* Registration Open Toggle */}
        <div className="flex items-center justify-between rounded-2xl bg-[rgb(10,11,14)] px-4 py-3 ring-1 ring-white/10">
          <div>
            <p className="text-sm font-medium text-white/75">Registration Open</p>
            <p className="text-xs text-white/35">Toggle whether users can register now</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, registrationOpen: !prev.registrationOpen }))}
            className={`relative h-6 w-11 rounded-full transition-colors ${formData.registrationOpen ? 'bg-[rgb(241,90,34)]' : 'bg-white/15'}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${formData.registrationOpen ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 pb-10">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-2xl bg-gray-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-2xl bg-[rgb(241,90,34)] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (isEdit ? 'Saving...' : 'Creating...') : isEdit ? 'Save Changes' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}