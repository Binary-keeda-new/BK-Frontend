'use client';

import React, { useState } from 'react';
import { Blog, BlogPayload } from '../types/blogs.types';

interface Props {
  blog?: Blog | null;
  onSave: (data: BlogPayload) => Promise<void>;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 9,
  border: '1px solid var(--border)', background: 'var(--surface2)',
  color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.06em',
  color: 'var(--muted)', marginBottom: 6,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function BlogFormModal({ blog, onSave, onClose }: Props) {
  const isEdit = !!blog;
  const [title, setTitle]           = useState(blog?.title ?? '');
  const [content, setContent]       = useState(blog?.content ?? '');
  const [author, setAuthor]         = useState(blog?.author ?? '');
  const [tags, setTags]             = useState((blog?.tags ?? []).join(', '));
  const [coverImage, setCoverImage] = useState(blog?.coverImage ?? '');
  const [published, setPublished]   = useState(blog?.published ?? true);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || 'Admin',
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        coverImage: coverImage.trim() || null,
        published,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save blog.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity:0; transform:translateY(14px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .bf-input:focus { border-color: var(--orange) !important; }
        .bf-scroll::-webkit-scrollbar { width: 4px; }
        .bf-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}</style>

      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', zIndex: 40 }} />

      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 'min(600px, calc(100vw - 32px))', maxHeight: 'calc(100vh - 48px)',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18,
        zIndex: 50, display: 'flex', flexDirection: 'column',
        animation: 'modalIn 0.22s ease', boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
            {isEdit ? 'Edit Blog' : 'New Blog'}
          </h2>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 2L2 10M2 2l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="bf-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
          <Field label="Title">
            <input className="bf-input" style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Blog title" />
          </Field>

          <Field label="Content">
            <textarea className="bf-input" style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }} value={content} onChange={e => setContent(e.target.value)} placeholder="Write your blog content…" />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Author">
              <input className="bf-input" style={inputStyle} value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author name" />
            </Field>
            <Field label="Tags (comma-separated)">
              <input className="bf-input" style={inputStyle} value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Next.js, Tips" />
            </Field>
          </div>

          <Field label="Cover Image URL (optional)">
            <input className="bf-input" style={inputStyle} value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://..." />
          </Field>

          <Field label="Status">
            <div style={{ display: 'flex', gap: 8 }}>
              {([true, false] as const).map(v => (
                <button key={String(v)} type="button" onClick={() => setPublished(v)} style={{
                  flex: 1, padding: '9px 0', borderRadius: 9, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s',
                  border: published === v ? '1.5px solid var(--orange)' : '1px solid var(--border)',
                  background: published === v ? 'var(--orange-dim)' : 'var(--surface2)',
                  color: published === v ? 'var(--orange)' : 'var(--muted)',
                }}>
                  {v ? 'Published' : 'Draft'}
                </button>
              ))}
            </div>
          </Field>

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 9, marginBottom: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 13 }}>
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 10, padding: '14px 22px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: '11px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSubmit as any} disabled={saving} style={{ flex: 2, padding: '11px 0', borderRadius: 10, fontSize: 13, fontWeight: 700, background: saving ? 'var(--orange-dim)' : 'var(--orange)', border: 'none', color: '#fff', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Blog'}
          </button>
        </div>
      </div>
    </>
  );
}
