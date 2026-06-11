'use client'

import { useState, useEffect } from 'react'
import { Job, JobFormData } from '../types/jobs.types'
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
}

export default function JobFormModal({ isOpen, editTarget, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<JobFormData>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editTarget) {
      const { _id, createdAt, updatedAt, ...rest } = editTarget
      setFormData({ ...EMPTY_FORM, ...rest })
    } else {
      setFormData(EMPTY_FORM)
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
    onClose()
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.company.trim() || !formData.description.trim()) return

    try {
      setLoading(true)
      const result = editTarget
        ? await updateJob(editTarget._id, formData)
        : await createJob(formData)
      onSuccess(result)
      handleClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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
