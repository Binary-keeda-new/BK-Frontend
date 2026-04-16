'use client';

import React from 'react';
import { Blog } from '../types/blogs.types';

interface Props {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

export default function BlogsTable({ blogs, onEdit, onDelete }: Props) {
  if (blogs.length === 0) {
    return (
      <div style={{ padding: '48px 20px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 16, color: 'var(--muted)', fontSize: 14 }}>
        No blogs yet. Click "New Blog" to create one.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {blogs.map(blog => {
        const initials = blog.title.slice(0, 2).toUpperCase();
        return (
          <div
            key={blog._id}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(241,90,34,0.25)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
          >
            {/* Avatar */}
            {blog.coverImage ? (
              <img src={blog.coverImage} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: 'var(--orange-dim)', border: '1px solid rgba(241,90,34,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'var(--orange)' }}>
                {initials}
              </div>
            )}

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {blog.title}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 5,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  background: blog.published ? 'rgba(34,197,94,0.1)' : 'var(--surface2)',
                  color: blog.published ? '#22c55e' : 'var(--muted)',
                }}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>
                {blog.author}
                {blog.tags.length > 0 && <span style={{ marginLeft: 8 }}>{blog.tags.slice(0, 3).join(', ')}</span>}
              </p>
            </div>

            {/* Date */}
            <span style={{ fontSize: 12, color: 'var(--muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              <button onClick={() => onEdit(blog)} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--orange)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--orange)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}>
                Edit
              </button>
              <button onClick={() => onDelete(blog)} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.14)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.07)'; }}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
