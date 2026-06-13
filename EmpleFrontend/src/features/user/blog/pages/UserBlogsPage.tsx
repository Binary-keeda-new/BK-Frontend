'use client';

import React, { useState, useEffect } from 'react';
import { Blog } from '../types/blogs.types';
import { fetchBlogs } from '../services/blogs.service';
import BlogCard from '../components/BlogCard';

export default function UserBlogsPage() {
  const [blogs, setBlogs]     = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    fetchBlogs()
      .then(setBlogs)
      .catch(err => setError(err.message || 'Failed to load blogs.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Blogs
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>
          Insights, guides and updates
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{
            width: 32, height: 32, border: '3px solid var(--border)',
            borderTopColor: 'var(--orange)', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite', margin: '0 auto 12px',
          }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading blogs…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div style={{
          padding: '14px 18px', borderRadius: 12,
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          color: '#f87171', fontSize: 13,
        }}>
          {error}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        blogs.length === 0 ? (
          <div style={{
            padding: '48px 20px', textAlign: 'center',
            border: '1px dashed var(--border)', borderRadius: 16,
            color: 'var(--muted)', fontSize: 14,
          }}>
            No blogs published yet.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'stretch',
            maxWidth: '100%',
          }}>
            {blogs.map((blog, i) => (
              <BlogCard key={blog._id ?? `blog-${i}`} blog={blog} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
