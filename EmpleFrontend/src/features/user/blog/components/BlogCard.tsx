'use client';

import React from 'react';
import Link from 'next/link';
import { Blog } from '../types/blogs.types';

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  const initials = blog.title.slice(0, 2).toUpperCase();
  const preview  = blog.content.length > 120 ? blog.content.slice(0, 120) + '…' : blog.content;
  const date     = new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Link href={`/user/resources/blogs/${blog._id}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
    >
      <article
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          cursor: 'pointer',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(241,90,34,0.35)';
          (e.currentTarget as HTMLElement).style.boxShadow  = '0 4px 24px rgba(241,90,34,0.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow  = 'none';
        }}
      >
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: 160, background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-0.02em' }}>
            {initials}
          </div>
        )}

        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {blog.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
              {blog.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--orange-dim)', color: 'var(--orange)', border: '1px solid rgba(241,90,34,0.2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {blog.title}
          </h3>

          <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.65, color: 'var(--muted)', flex: 1 }}>
            {preview}
          </p>

          <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{blog.author}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}