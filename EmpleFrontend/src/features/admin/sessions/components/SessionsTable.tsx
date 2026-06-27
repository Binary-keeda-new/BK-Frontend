'use client'

import { useState, useEffect } from 'react'
import { Session } from '../types/sessions.types'
import { fetchSessions, deleteSession } from '../services/sessions.service'
import SessionFormModal from './SessionFormModal'

export default function SessionsTable() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Session | null>(null)

  useEffect(() => {
    load()
  }, [])

  const load = () => {
    setLoading(true)
    fetchSessions()
      .then((res: any) => {
        const data = Array.isArray(res) ? res : res?.data ?? res?.sessions ?? []
        setSessions(data)
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false))
  }

  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    if (!confirm('Delete this session?')) return
    try {
      await deleteSession(id)
      setSessions(prev => prev.filter(s => s._id !== id && s.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSuccess = (session: Session) => {
    setSessions(prev => {
      const exists = prev.find(s => s._id === session._id)
      return exists
        ? prev.map(s => s._id === session._id ? session : s)
        : [session, ...prev]
    })
  }

  const categoryColor = (cat: string) => cat === 'workshop' ? '#a855f7' : '#ef4444'
  const categoryLabel = (cat: string) => cat === 'workshop' ? 'Workshop' : 'YT Session'

  return (
    <div style={{ padding: '28px 24px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Sessions</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--muted)' }}>
            Manage workshops and YouTube sessions
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
          + Add Session
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          Loading sessions…
        </div>
      )}

      {/* Empty */}
      {!loading && sessions.length === 0 && (
        <div style={{
          padding: '60px 20px', textAlign: 'center',
          border: '1px dashed var(--border)', borderRadius: 16,
          color: 'var(--muted)', fontSize: 14,
        }}>
          No sessions yet. Click <strong>+ Add Session</strong> to create one.
        </div>
      )}

      {/* Table */}
      {!loading && sessions.length > 0 && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {['Thumbnail', 'Title', 'Category', 'Video Link', 'Actions'].map(h => (
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
              {sessions.map((session, i) => (
                <tr
                  key={session._id}
                  style={{
                    borderBottom: i < sessions.length - 1 ? '1px solid var(--border)' : 'none',
                    background: 'var(--surface)',
                  }}
                >
                  {/* Thumbnail */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{
                      width: 80, height: 45, borderRadius: 8,
                      overflow: 'hidden', background: 'var(--surface2)',
                      flexShrink: 0,
                    }}>
                      {session.thumbnail ? (
                        <img src={session.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Title + description */}
                  <td style={{ padding: '12px 16px', maxWidth: 260 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                      {session.title}
                    </p>
                    {session.description && (
                      <p style={{
                        margin: '3px 0 0', fontSize: 12, color: 'var(--muted)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {session.description}
                      </p>
                    )}
                  </td>

                  {/* Category */}
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px',
                      borderRadius: 20,
                      background: `${categoryColor(session.category)}15`,
                      color: categoryColor(session.category),
                      border: `1px solid ${categoryColor(session.category)}30`,
                    }}>
                      {categoryLabel(session.category)}
                    </span>
                  </td>

                  {/* Video Link */}
                  <td style={{ padding: '12px 16px' }}>
                    
                      <a
                        href={session.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12, color: 'rgb(241,90,34)',
                          textDecoration: 'none', fontWeight: 500,
                        maxWidth: 180, display: 'block',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}
                    >
                      {session.videoLink}
                    </a>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => { setEditTarget(session as any); setModalOpen(true); }}
                        style={{
                          padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          background: 'var(--surface2)', border: '1px solid var(--border)',
                          color: 'var(--text)', cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(session._id as string)}
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

      <SessionFormModal
        isOpen={modalOpen}
        editTarget={editTarget}
        onClose={() => { setModalOpen(false); setEditTarget(null); }}
        onSuccess={handleSuccess}
      />
    </div>
  )
}