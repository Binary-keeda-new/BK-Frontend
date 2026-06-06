'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Blog } from '../types/blogs.types';
import BlogContentRenderer from '../components/BlogContentRenderer';

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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 24px' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } } @keyframes fadeUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {loading && (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--muted)' }}>
          <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading article…</p>
        </div>
      )}

      {!loading && error && (
        <div style={{ maxWidth: 850, margin: '0 auto' }}>
          <div style={{ padding: '14px 18px', borderRadius: 12, marginBottom: 20, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 13 }}>
            {error}
          </div>
          <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            ← Back to Articles
          </button>
        </div>
      )}

      {!loading && !error && blog && (
        <div style={{ maxWidth: 1200, margin: '0 auto', animation: 'fadeUp 0.3s ease-out' }}>
          
          {/* Breadcrumb / Back */}
          <button
            onClick={() => router.back()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, padding: 0, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'; }}
          >
            ← Back
          </button>

          {/* Title */}
          <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.15, letterSpacing: '-0.03em', fontFamily: "'Inter', sans-serif" }}>
            {blog.title}
          </h1>

          {/* Meta Data */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <span style={{ fontSize: 14, color: 'var(--muted2)', fontWeight: 500 }}>
              {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {blog.tags.length > 0 && (
              <>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border)', display: 'inline-block' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {blog.tags[0]}
                </span>
              </>
            )}
          </div>

          {/* Advertisement Banner Placeholder */}
          <div style={{ width: '100%', height: 120, background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Advertisement Space</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Banner Ad (728x90 or responsive)</span>
          </div>

          {/* Optional: We can still show the cover image as the first block of the article if it exists */}
          {blog.coverImage && (
            <figure style={{ margin: '0 0 40px' }}>
              <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: 16, display: 'block' }} />
            </figure>
          )}

          {/* Content Renderer */}
          <article className="blog-article-body" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '60px', marginBottom: '40px' }}>
            <BlogContentRenderer rawContent={blog.content} blocks={blog.blocks} />
          </article>
        </div>
      )}
    </div>
  );
}