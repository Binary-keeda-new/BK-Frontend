'use client'

import { useState, useEffect } from 'react'
import { Job, JobFormData, JobLink } from '../types/jobs.types'
import { createJob, updateJob } from '../services/jobs.service'

type Props = {
  isOpen: boolean
  editTarget: Job | null
  onClose: () => void
  onSuccess: (job: Job) => void
}

const EMPTY_FORM: JobFormData = {
  title: '',
  company: '',
  location: '',
  description: '',
  type: 'private',
  salary: '',
  applyLink: '',
  tags: [],
  department: '',
  lastDate: '',
  links: [],
}

export default function JobFormModal({ isOpen, editTarget, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<JobFormData>(EMPTY_FORM)
  const [links, setLinks] = useState<JobLink[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editTarget) {
      const { _id, createdAt, updatedAt, ...rest } = editTarget
      setFormData({ ...EMPTY_FORM, ...rest })
      setLinks(editTarget.links ?? [])
    } else {
      setFormData(EMPTY_FORM)
      setLinks([])
    }
  }, [editTarget, isOpen])

  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    setFormData(EMPTY_FORM)
    setLinks([])
    onClose()
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.company.trim() || !formData.description.trim()) return

    try {
      setLoading(true)
      const payload: JobFormData = {
        ...formData,
        links: formData.type === 'government' ? links.filter(l => l.label.trim() && l.url.trim()) : [],
      }
      const result = editTarget
        ? await updateJob(editTarget._id, payload)
        : await createJob(payload)
      onSuccess(result)
      handleClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ── Government Links helpers ──────────────────────────────────────────────
  const addLink = () => setLinks(prev => [...prev, { label: '', url: '' }])

  const removeLink = (idx: number) => setLinks(prev => prev.filter((_, i) => i !== idx))

  const updateLink = (idx: number, field: keyof JobLink, value: string) =>
    setLinks(prev => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l))

  const isEdit = !!editTarget

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEdit ? 'Edit Job' : 'Create Job'}
            </h2>
            <p className="mt-1 text-sm text-white/55">
              {isEdit ? 'Update the job details below.' : 'Fill in the details to post a new job.'}
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
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Title</label>
            <input
              name="title"
              placeholder="Enter job title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Company</label>
            <input
              name="company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">Location</label>
              <input
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
              >
                <option value="private">Private</option>
                <option value="government">Government</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Description</label>
            <textarea
              name="description"
              placeholder="Enter job description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">Salary</label>
              <input
                name="salary"
                placeholder="e.g. ₹8–12 LPA"
                value={formData.salary}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/75">Apply Link</label>
              <input
                name="applyLink"
                placeholder="https://..."
                value={formData.applyLink}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
              />
            </div>
          </div>

          {formData.type === 'government' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Department</label>
                <input
                  name="department"
                  placeholder="e.g. Ministry of Finance"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Last Date</label>
                <input
                  name="lastDate"
                  type="date"
                  value={formData.lastDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
                />
              </div>
            </div>
          )}

          {/* ── Government Links ──────────────────────────────── */}
          {formData.type === 'government' && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-white/75">Government Links</label>
                <button
                  type="button"
                  onClick={addLink}
                  className="flex items-center gap-1.5 rounded-xl bg-[rgb(241,90,34)]/15 px-3 py-1.5 text-xs font-semibold text-[rgb(241,90,34)] ring-1 ring-[rgb(241,90,34)]/25 transition hover:bg-[rgb(241,90,34)]/25"
                >
                  <span className="text-base leading-none">+</span> Add Link
                </button>
              </div>

              {links.length === 0 && (
                <p className="rounded-xl bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white/30 ring-1 ring-white/8">
                  No links added yet. Click <span className="text-[rgb(241,90,34)]">+ Add Link</span> to add official notification, apply link, admit card, etc.
                </p>
              )}

              <div className="space-y-3">
                {links.map((link, idx) => (
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
                        placeholder="Label (e.g. Apply Online)"
                        value={link.label}
                        onChange={e => updateLink(idx, 'label', e.target.value)}
                        className="w-full rounded-xl bg-[rgb(19,20,27)] p-2.5 text-sm text-white outline-none ring-1 ring-white/8 placeholder:text-white/25"
                      />
                      <input
                        placeholder="URL (https://...)"
                        value={link.url}
                        onChange={e => updateLink(idx, 'url', e.target.value)}
                        className="w-full rounded-xl bg-[rgb(19,20,27)] p-2.5 text-sm text-white outline-none ring-1 ring-white/8 placeholder:text-white/25"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              {loading ? (isEdit ? 'Saving...' : 'Creating...') : isEdit ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
