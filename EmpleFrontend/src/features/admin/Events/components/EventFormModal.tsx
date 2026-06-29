'use client'

import { useState, useEffect } from 'react'
import { Event, EventFormData, EventType, EventLink } from '../types'
import { createEvent, updateEvent } from '../services/events.service'

type Props = {
  isOpen: boolean
  editTarget: Event | null
  defaultType: EventType
  onClose: () => void
  onSuccess: (event: Event) => void
}

const EMPTY_FORM: EventFormData = {
  title: '',
  description: '',
  type: 'hackathon',
  date: '',
  startDate: '',    // ← empty string not null
  endDate: '',      // ← empty string not null
  registrationLink: '',
  registrationOpen: true,
  organiser: '',
  banner: '',
  solutionLink: '',
  links: [],
  rewards: '',
}


const TYPE_LABELS: Record<EventType, string> = {
  hackathon: 'Hackathon',
  techfest: 'Techfest',
  'our-hackathon': 'Our Hackathon',
}

export default function EventFormModal({
  isOpen,
  editTarget,
  defaultType,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState<EventFormData>({
    ...EMPTY_FORM,
    type: defaultType,
  })
  const [loading, setLoading] = useState(false)

useEffect(() => {
  if (editTarget) {
    const { _id, createdAt, updatedAt, isActive, ...rest } = editTarget
    setFormData({
      ...EMPTY_FORM,
      ...rest,
      startDate: rest.startDate ?? '',   // ← null → ''
      endDate: rest.endDate ?? '',       // ← null → ''
      solutionLink: rest.solutionLink ?? '',
      rewards: rest.rewards ?? '',
      links: rest.links ?? [],
    })
  } else {
    setFormData({ ...EMPTY_FORM, type: defaultType })
  }
}, [editTarget, isOpen, defaultType])

  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    setFormData({ ...EMPTY_FORM, type: defaultType })
    onClose()
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.date) return
    try {
      setLoading(true)
      const result = editTarget
        ? await updateEvent(editTarget._id, formData)
        : await createEvent(formData)
      onSuccess(result)
      handleClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ── Links helpers (our-hackathon only) ──
  const addLink = () =>
    setFormData((prev) => ({ ...prev, links: [...prev.links, { label: '', url: '' }] }))

  const removeLink = (idx: number) =>
    setFormData((prev) => ({ ...prev, links: prev.links.filter((_, i) => i !== idx) }))

  const updateLink = (idx: number, field: keyof EventLink, value: string) =>
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((l, i) => (i === idx ? { ...l, [field]: value } : l)),
    }))

  const isEdit = !!editTarget
  const isOurHackathon = formData.type === 'our-hackathon'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">

        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEdit ? 'Edit Event' : 'Create Event'}
            </h2>
            <p className="mt-1 text-sm text-white/55">
              {isEdit
                ? 'Update the event details below.'
                : `Fill in the details to post a new ${TYPE_LABELS[formData.type]}.`}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full bg-[rgb(10,11,14)] px-3 py-1 text-sm text-white/70 ring-1 ring-white/10 transition hover:text-white"
          >
            ✕
          </button>
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
                <option value="our-hackathon">Our Hackathon</option>
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

          {/* Registration Start + End Date — ALL types */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">
                Registration Start
              </label>
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">
                Registration End
              </label>
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
              />
            </div>
          </div>

          {/* Banner */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Banner Image URL</label>
            <input
              name="banner"
              placeholder="https://... (optional)"
              value={formData.banner}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          {/* ── Our Hackathon only fields ── */}
          {isOurHackathon && (
            <>
              {/* Rewards */}
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

              {/* Solution Link */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Solution Submission Link</label>
                <input
                  name="solutionLink"
                  placeholder="https://... (where participants submit)"
                  value={formData.solutionLink}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
                />
              </div>

              {/* Links */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-white/75">Important Links</label>
                  <button
                    type="button"
                    onClick={addLink}
                    className="flex items-center gap-1.5 rounded-xl bg-[rgb(241,90,34)]/15 px-3 py-1.5 text-xs font-semibold text-[rgb(241,90,34)] ring-1 ring-[rgb(241,90,34)]/25 transition hover:bg-[rgb(241,90,34)]/25"
                  >
                    <span className="text-base leading-none">+</span> Add Link
                  </button>
                </div>

                {formData.links.length === 0 && (
                  <p className="rounded-xl bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white/30 ring-1 ring-white/8">
                    No links added yet. Click <span className="text-[rgb(241,90,34)]">+ Add Link</span> to add rules, guidelines, etc.
                  </p>
                )}

                <div className="space-y-3">
                  {formData.links.map((link, idx) => (
                    <div key={idx} className="rounded-2xl bg-[rgb(10,11,14)] p-3 ring-1 ring-white/10">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/40">Link {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeLink(idx)}
                          className="rounded-lg px-2 py-0.5 text-xs font-semibold text-red-400/70 ring-1 ring-red-400/20 transition hover:bg-red-400/10 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          placeholder="Label (e.g. Rules)"
                          value={link.label}
                          onChange={(e) => updateLink(idx, 'label', e.target.value)}
                          className="w-full rounded-xl bg-[rgb(19,20,27)] p-2.5 text-sm text-white outline-none ring-1 ring-white/8 placeholder:text-white/25"
                        />
                        <input
                          placeholder="URL (https://...)"
                          value={link.url}
                          onChange={(e) => updateLink(idx, 'url', e.target.value)}
                          className="w-full rounded-xl bg-[rgb(19,20,27)] p-2.5 text-sm text-white outline-none ring-1 ring-white/8 placeholder:text-white/25"
                        />
                      </div>
                    </div>
                  ))}
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
              onClick={() =>
                setFormData((prev) => ({ ...prev, registrationOpen: !prev.registrationOpen }))
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                formData.registrationOpen ? 'bg-[rgb(241,90,34)]' : 'bg-white/15'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  formData.registrationOpen ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleClose}
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
              {loading
                ? isEdit ? 'Saving...' : 'Creating...'
                : isEdit ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}