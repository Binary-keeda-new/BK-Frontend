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
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(241,90,34,0.5)';
          (e.currentTarget as HTMLElement).style.boxShadow  = '0 12px 40px rgba(0,0,0,0.1), 0 0 20px rgba(241,90,34,0.08)';
          (e.currentTarget as HTMLElement).style.transform  = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow  = 'none';
          (e.currentTarget as HTMLElement).style.transform  = 'translateY(0)';
        }}
      >
        {blog.coverImage ? (
          <img
            src={blog.coverImage.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || ''}${blog.coverImage}` : blog.coverImage}
            alt={blog.title}
            style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: 200, background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-0.02em', fontFamily: "'Inter', sans-serif" }}>
            {initials}
          </div>
        )}

        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {blog.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {blog.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'var(--orange-dim)', color: 'var(--orange)', border: '1px solid rgba(241,90,34,0.15)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 800, color: 'var(--text)', lineHeight: 1.4, fontFamily: "'Inter', sans-serif", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {blog.title}
          </h3>

          <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', flex: 1 }}>
            {preview}
          </p>

          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}