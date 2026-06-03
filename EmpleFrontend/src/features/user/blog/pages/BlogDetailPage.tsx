'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Blog } from '../types/blogs.types';

export default function BlogDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const [blog, setBlog]       = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then(data => setBlog(data.data ?? data))
      .catch(err => setError(err.message || 'Failed to load blog.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } } @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading…</p>
        </div>
      )}

      {!loading && error && (
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ padding: '14px 18px', borderRadius: 12, marginBottom: 20, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 13 }}>
            {error}
          </div>
          <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            ← Back
          </button>
        </div>
      )}

      {!loading && !error && blog && (
        <div style={{ maxWidth: 720, margin: '0 auto', animation: 'fadeUp 0.22s ease' }}>

          {/* Back */}
          <button
            onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, padding: '8px 14px', borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--orange)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8 11L3.5 6.5 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          {/* Cover */}
          {blog.coverImage ? (
            <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 16, display: 'block', marginBottom: 24 }} />
          ) : (
            <div style={{ width: '100%', height: 200, borderRadius: 16, background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800, color: 'var(--orange)', marginBottom: 24 }}>
              {blog.title.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {blog.tags.map(tag => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--orange-dim)', color: 'var(--orange)', border: '1px solid rgba(241,90,34,0.2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            {blog.title}
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{blog.author}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)', display: 'inline-block' }} />
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Content */}
          <div style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--muted)', whiteSpace: 'pre-wrap' }}>
            {blog.content}
          </div>
        </div>
      )}
    </div>
  );
}