'use client'

import { useState, useEffect } from 'react'
import { Notification } from '../types/notifications.types'
import { fetchNotifications, deleteNotification, toggleLive } from '../services/notifications.service'
import NotificationFormModal from './NotificationFormModal'

export default function NotificationsTable() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Notification | null>(null)

  useEffect(() => {
    load()
  }, [])

  const load = () => {
    setLoading(true)
    fetchNotifications()
      .then((data: Notification[]) => setNotifications(data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notification?')) return
    try {
      await deleteNotification(id)
      setNotifications(prev => prev.filter(n => n._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleLive = async (id: string) => {
    try {
      const updated = await toggleLive(id)
      setNotifications(prev => prev.map(n => n._id === id ? updated : n))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSuccess = (notification: Notification) => {
    setNotifications(prev => {
      const exists = prev.find(n => n._id === notification._id)
      return exists
        ? prev.map(n => n._id === notification._id ? notification : n)
        : [notification, ...prev]
    })
  }

  const typeColors: Record<string, string> = {
    info: '#3b82f6',
    warning: '#f59e0b',
    success: '#22c55e',
    alert: '#ef4444',
  }

  return (
    <div style={{ padding: '28px 24px', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>
            Notifications
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--muted)' }}>
            Manage and publish notifications to users
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setModalOpen(true); }}
          style={{
            padding: '9px 18px', borderRadius: 10,
            background: 'rgb(241,90,34)', color: '#fff',
            fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
          }}
        >
          + Add Notification
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          Loading notifications…
        </div>
      )}

      {/* Empty */}
      {!loading && notifications.length === 0 && (
        <div style={{
          padding: '60px 20px', textAlign: 'center',
          border: '1px dashed var(--border)', borderRadius: 16,
          color: 'var(--muted)', fontSize: 14,
        }}>
          No notifications yet. Click <strong>+ Add Notification</strong> to create one.
        </div>
      )}

      {/* Table */}
      {!loading && notifications.length > 0 && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {['Title', 'Message', 'Type', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: 12, fontWeight: 600, color: 'var(--muted)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, i) => (
                <tr
                  key={notification._id}
                  style={{
                    borderBottom: i < notifications.length - 1 ? '1px solid var(--border)' : 'none',
                    background: 'var(--surface)',
                  }}
                >
                  {/* Title */}
                  <td style={{ padding: '12px 16px', maxWidth: 200 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                      {notification.title}
                    </p>
                  </td>

                  {/* Message */}
                  <td style={{ padding: '12px 16px', maxWidth: 280 }}>
                    <p style={{
                      margin: 0, fontSize: 13, color: 'var(--muted)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {notification.message}
                    </p>
                  </td>

                  {/* Type */}
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px',
                      borderRadius: 20,
                      background: `${typeColors[notification.type]}15`,
                      color: typeColors[notification.type],
                      border: `1px solid ${typeColors[notification.type]}30`,
                      textTransform: 'capitalize',
                    }}>
                      {notification.type}
                    </span>
                  </td>

                  {/* Live toggle */}
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => handleToggleLive(notification._id)}
                      style={{
                        position: 'relative', width: 44, height: 24,
                        borderRadius: 999, border: 'none', cursor: 'pointer',
                        background: notification.isLive ? 'rgb(241,90,34)' : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.2s',
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 2, left: 2,
                        width: 20, height: 20, borderRadius: '50%',
                        background: '#fff',
                        transition: 'transform 0.2s',
                        transform: notification.isLive ? 'translateX(20px)' : 'translateX(0)',
                      }} />
                    </button>
                    <span style={{
                      marginLeft: 8, fontSize: 12,
                      color: notification.isLive ? 'rgb(241,90,34)' : 'var(--muted)',
                      fontWeight: 600,
                    }}>
                      {notification.isLive ? 'Live' : 'Draft'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => { setEditTarget(notification as any); setModalOpen(true); }}
                        style={{
                          padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          background: 'var(--surface2)', border: '1px solid var(--border)',
                          color: 'var(--text)', cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        style={{
                          padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                          color: '#ef4444', cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NotificationFormModal
        isOpen={modalOpen}
        editTarget={editTarget}
        onClose={() => { setModalOpen(false); setEditTarget(null); }}
        onSuccess={handleSuccess}
      />
    </div>
  )
}