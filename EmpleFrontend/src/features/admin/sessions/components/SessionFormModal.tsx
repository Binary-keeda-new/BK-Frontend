'use client'

import { useState, useEffect } from 'react'
import { Session, SessionFormData } from '../types/sessions.types'
import { createSession, updateSession } from '../services/sessions.service'

type Props = {
  isOpen: boolean
  editTarget: Session | null
  onClose: () => void
  onSuccess: (session: Session) => void
}

const EMPTY_FORM: SessionFormData = {
  title: '',
  description: '',
  category: 'workshop',
  videoLink: '',
  thumbnail: '',
  meetingLink: '',
  scheduledAt: '',
}

export default function SessionFormModal({ isOpen, editTarget, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<SessionFormData>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [thumbMode, setThumbMode] = useState<'url' | 'upload'>('url')

  useEffect(() => {
    if (editTarget) {
      const { _id, createdAt, updatedAt, ...rest } = editTarget
      setFormData({
        ...EMPTY_FORM,
        ...rest,
        meetingLink: rest.meetingLink ?? '',
        scheduledAt: rest.scheduledAt ? rest.scheduledAt.slice(0, 16) : '',
      })
    } else {
      setFormData(EMPTY_FORM)
    }
  }, [editTarget, isOpen])

  if (!isOpen) return null

  const isBK = formData.category === 'bk-session'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    setFormData(EMPTY_FORM)
    setThumbMode('url')
    onClose()
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) return
    if (isBK && !formData.meetingLink.trim()) return
    if (!isBK && !formData.videoLink.trim()) return

    try {
      setLoading(true)
      const result = editTarget
        ? await updateSession(editTarget._id, formData)
        : await createSession(formData)
      onSuccess(result)
      handleClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isEdit = !!editTarget

  const handleThumbUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setFormData(prev => ({ ...prev, thumbnail: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">

        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEdit ? 'Edit Session' : 'Create Session'}
            </h2>
            <p className="mt-1 text-sm text-white/55">
              {isEdit ? 'Update the session details below.' : 'Fill in the details to add a new session.'}
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
              placeholder="Enter session title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Description</label>
            <textarea
              name="description"
              placeholder="Enter session description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            >
              <option value="workshop">Workshop</option>
              <option value="yt-session">YT Session</option>
              <option value="bk-session">BK Session</option>
            </select>
          </div>

          {/* BK Session Fields */}
          {isBK ? (
            <>
              {/* Meeting Link */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Meeting Link</label>
                <input
                  name="meetingLink"
                  placeholder="https://meet.google.com/... or https://zoom.us/..."
                  value={formData.meetingLink}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Date & Time</label>
                <input
                  name="scheduledAt"
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              {/* Thumbnail — upload only for BK Session */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Thumbnail</label>
                <div
                  onClick={() => document.getElementById('bk-thumb-upload')?.click()}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-6 ring-1 ring-white/10 cursor-pointer flex flex-col items-center justify-center gap-2"
                  style={{ minHeight: 100 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-xs text-white/40">Click to upload image</span>
                  <input
                    id="bk-thumb-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbUpload}
                  />
                </div>

                {formData.thumbnail && (
                  <div className="mt-2 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: 160 }}>
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Video Link */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Video Link</label>
                <input
                  name="videoLink"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.videoLink}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/75">Thumbnail</label>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setThumbMode('url')}
                    className="px-3 py-1 rounded-lg text-xs"
                    style={{
                      background: thumbMode === 'url' ? 'rgb(241,90,34)' : 'rgb(10,11,14)',
                      color: thumbMode === 'url' ? '#fff' : 'rgba(255,255,255,0.5)',
                      border: thumbMode === 'url' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setThumbMode('upload')}
                    className="px-3 py-1 rounded-lg text-xs"
                    style={{
                      background: thumbMode === 'upload' ? 'rgb(241,90,34)' : 'rgb(10,11,14)',
                      color: thumbMode === 'upload' ? '#fff' : 'rgba(255,255,255,0.5)',
                      border: thumbMode === 'upload' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    Upload Image
                  </button>
                </div>

                {thumbMode === 'url' && (
                  <input
                    name="thumbnail"
                    placeholder="https://img.youtube.com/vi/.../maxresdefault.jpg"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
                  />
                )}

                {thumbMode === 'upload' && (
                  <div
                    onClick={() => document.getElementById('thumb-upload')?.click()}
                    className="w-full rounded-2xl bg-[rgb(10,11,14)] p-6 ring-1 ring-white/10 cursor-pointer flex flex-col items-center justify-center gap-2"
                    style={{ minHeight: 100 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-xs text-white/40">Click to upload image</span>
                    <input
                      id="thumb-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbUpload}
                    />
                  </div>
                )}

                {formData.thumbnail && (
                  <div className="mt-2 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: 160 }}>
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Buttons */}
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
