'use client'

import { useState, useEffect } from 'react'
import { Notification, NotificationFormData } from '../types/notifications.types'
import { createNotification, updateNotification } from '../services/notifications.service'

type Props = {
  isOpen: boolean
  editTarget: Notification | null
  onClose: () => void
  onSuccess: (notification: Notification) => void
}

const EMPTY_FORM: NotificationFormData = {
  title: '',
  message: '',
  type: 'info',
  isLive: false,
}

export default function NotificationFormModal({ isOpen, editTarget, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<NotificationFormData>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editTarget) {
      const { _id, createdAt, ...rest } = editTarget
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
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    setFormData(EMPTY_FORM)
    onClose()
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.message.trim()) return
    try {
      setLoading(true)
      const result = editTarget
        ? await updateNotification(editTarget._id, formData)
        : await createNotification(formData)
      onSuccess(result)
      handleClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isEdit = !!editTarget

  const typeColors: Record<string, string> = {
    info: '#3b82f6',
    warning: '#f59e0b',
    success: '#22c55e',
    alert: '#ef4444',
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">

        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEdit ? 'Edit Notification' : 'Create Notification'}
            </h2>
            <p className="mt-1 text-sm text-white/55">
              {isEdit ? 'Update the notification details below.' : 'Fill in the details to create a notification.'}
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
            <label className="mb-2 block text-sm font-medium text-white/75">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter notification title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Enter notification message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="alert">Alert</option>
            </select>
          </div>

          {/* Is Live toggle */}
          <div className="flex items-center justify-between rounded-2xl bg-[rgb(10,11,14)] p-4 ring-1 ring-white/10">
            <div>
              <p className="text-sm font-medium text-white">Make Live</p>
              <p className="text-xs text-white/40 mt-0.5">Users will see this notification immediately</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isLive: !prev.isLive }))}
              className="relative w-11 h-6 rounded-full transition-colors duration-200"
              style={{ background: formData.isLive ? 'rgb(241,90,34)' : 'rgba(255,255,255,0.1)' }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                style={{ transform: formData.isLive ? 'translateX(20px)' : 'translateX(0)' }}
              />
            </button>
          </div>

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