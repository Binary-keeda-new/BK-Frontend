'use client';

import React, { useState } from 'react';
import { Blog, BlogPayload, ContentBlock } from '../types/blogs.types';

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
  const [blocks, setBlocks]         = useState<ContentBlock[]>(blog?.blocks ?? []);
  const [author, setAuthor]         = useState(blog?.author ?? '');
  const [tags, setTags]             = useState((blog?.tags ?? []).join(', '));
  const [coverImage, setCoverImage] = useState(blog?.coverImage ?? '');
  const [published, setPublished]   = useState(blog?.published ?? true);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim() || (!content.trim() && blocks.length === 0)) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        blocks,
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

  const moveBlock = (index: number, dir: -1 | 1) => {
    if (index + dir < 0 || index + dir >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + dir];
    newBlocks[index + dir] = temp;
    setBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, field: string, value: string) => {
    const newBlocks = [...blocks];
    if (field === 'content') {
      newBlocks[index].content = value;
    } else {
      newBlocks[index].metadata = { ...newBlocks[index].metadata, [field]: value };
    }
    setBlocks(newBlocks);
  };

  const addBlock = (type: ContentBlock['type']) => {
    setBlocks([...blocks, { type, content: '' }]);
  };

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
        .block-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; margin-bottom: 12px; }
        .btn-action { background: none; border: 1px solid var(--border); border-radius: 6px; padding: 4px 8px; color: var(--muted); cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; }
        .btn-action:hover { background: var(--border); color: var(--text); }
        .btn-add { flex: 1; padding: 8px 0; border: 1px dashed var(--border); border-radius: 8px; background: transparent; color: var(--muted); cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.15s; }
        .btn-add:hover { border-color: var(--orange); color: var(--orange); background: var(--orange-dim); }
      `}</style>

      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', zIndex: 9998 }} />

      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 'min(700px, calc(100vw - 32px))', maxHeight: 'calc(100vh - 48px)',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18,
        zIndex: 9999, display: 'flex', flexDirection: 'column',
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

          {/* Render legacy content field only if it has content and there are no blocks yet, OR if it's explicitly edited */}
          {(content || blocks.length === 0) && (
            <Field label="Legacy Content (Optional if using blocks)">
              <textarea className="bf-input" style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} value={content} onChange={e => setContent(e.target.value)} placeholder="Write plain text content..." />
            </Field>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Content Blocks</label>
            
            {blocks.map((block, i) => (
              <div key={i} className="block-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase' }}>{block.type} BLOCK</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button type="button" className="btn-action" onClick={() => moveBlock(i, -1)} disabled={i === 0}>↑ Up</button>
                    <button type="button" className="btn-action" onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1}>↓ Down</button>
                    <button type="button" className="btn-action" onClick={() => removeBlock(i)} style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>Delete</button>
                  </div>
                </div>

                {block.type === 'text' && (
                  <textarea className="bf-input" style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={block.content} onChange={e => updateBlock(i, 'content', e.target.value)} placeholder="Write text content..." />
                )}
                
                {block.type === 'heading' && (
                  <input className="bf-input" style={inputStyle} value={block.content} onChange={e => updateBlock(i, 'content', e.target.value)} placeholder="Heading text..." />
                )}

                {block.type === 'quote' && (
                  <textarea className="bf-input" style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} value={block.content} onChange={e => updateBlock(i, 'content', e.target.value)} placeholder="Quote text..." />
                )}

                {block.type === 'image' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input className="bf-input" style={inputStyle} value={block.content} onChange={e => updateBlock(i, 'content', e.target.value)} placeholder="Image URL (https://...)" />
                    <input className="bf-input" style={inputStyle} value={block.metadata?.caption || ''} onChange={e => updateBlock(i, 'caption', e.target.value)} placeholder="Optional caption..." />
                  </div>
                )}

                {block.type === 'divider' && (
                  <div style={{ height: 2, background: 'var(--border)', borderRadius: 2, margin: '8px 0' }} />
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button type="button" className="btn-add" onClick={() => addBlock('text')}>+ Text</button>
              <button type="button" className="btn-add" onClick={() => addBlock('heading')}>+ Heading</button>
              <button type="button" className="btn-add" onClick={() => addBlock('image')}>+ Image</button>
              <button type="button" className="btn-add" onClick={() => addBlock('quote')}>+ Quote</button>
              <button type="button" className="btn-add" onClick={() => addBlock('divider')}>+ Divider</button>
            </div>
          </div>

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
