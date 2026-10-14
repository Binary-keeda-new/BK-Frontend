'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useUser } from '@descope/nextjs-sdk/client';
import { Blog } from '../types/blogs.types';
import { likeBlog } from '../services/blogs.service';

interface Props {
  blog: Blog;
  basePath?: string;
}

const getClientId = () => {
  if (typeof window === 'undefined') return '';
  let cid = localStorage.getItem('emple_client_id');
  if (!cid) {
    cid = 'client_' + Math.random().toString(36).substring(2, 12);
    localStorage.setItem('emple_client_id', cid);
  }
  return cid;
};

export default function BlogCard({ blog, basePath = "/user/resources/blogs" }: Props) {
  const { user } = useUser();
  const [likes, setLikes] = useState(blog.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const effectiveUserId = user?.userId || user?.email || (typeof window !== 'undefined' ? localStorage.getItem('emple_client_id') : '');
    if (effectiveUserId && blog.likedBy?.includes(effectiveUserId)) {
      setIsLiked(true);
      return;
    }
    try {
      const localLiked = JSON.parse(localStorage.getItem('liked_blogs') || '[]');
      if (Array.isArray(localLiked) && localLiked.includes(blog._id)) {
        setIsLiked(true);
      }
    } catch {}
  }, [blog._id, blog.likedBy, user]);

  const initials = blog.title.slice(0, 2).toUpperCase();
  const preview  = blog.content.length > 120 ? blog.content.slice(0, 120) + '…' : blog.content;
  const date     = new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const getImageUrl = (image: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    if (image.startsWith('/uploads')) return `${baseUrl}${image}`;
    if (image.startsWith('uploads/')) return `${baseUrl}/${image}`;
    if (image.startsWith('/')) return `${baseUrl}${image}`;
    return `${baseUrl}/uploads/${image}`;
  };

  const finalHref = basePath === "/user/resources/blogs" ? `/user/resources/blogs/${blog._id}` : `${basePath}/${blog._id}`;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting) return;

    const effectiveUserId = user?.userId || user?.email || getClientId();
    const nextLiked = !isLiked;
    const nextCount = nextLiked ? likes + 1 : Math.max(0, likes - 1);

    // Optimistic update
    setIsLiked(nextLiked);
    setLikes(nextCount);
    setIsSubmitting(true);

    try {
      const localLiked = new Set(JSON.parse(localStorage.getItem('liked_blogs') || '[]'));
      if (nextLiked) localLiked.add(blog._id);
      else localLiked.delete(blog._id);
      localStorage.setItem('liked_blogs', JSON.stringify([...localLiked]));
    } catch {}

    try {
      const res = await likeBlog(blog._id, effectiveUserId);
      if (typeof res?.likes === 'number') {
        setLikes(res.likes);
      }
      if (typeof res?.isLiked === 'boolean') {
        setIsLiked(res.isLiked);
      }
    } catch (err) {
      console.error('Failed to like blog:', err);
      // Revert on failure
      setIsLiked(!nextLiked);
      setLikes(likes);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Link href={finalHref} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
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
            src={getImageUrl(blog.coverImage)}
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

          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{date}</span>

            <button
              type="button"
              onClick={handleLike}
              title={isLiked ? "Unlike blog" : "Like blog"}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 11px',
                borderRadius: 20,
                background: isLiked ? 'rgba(244, 63, 94, 0.12)' : 'var(--surface2)',
                border: `1px solid ${isLiked ? 'rgba(244, 63, 94, 0.35)' : 'var(--border)'}`,
                color: isLiked ? '#f43f5e' : 'var(--muted2)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (!isLiked) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244, 63, 94, 0.3)';
                  (e.currentTarget as HTMLElement).style.color = '#f43f5e';
                }
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
              }}
              onMouseLeave={e => {
                if (!isLiked) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--muted2)';
                }
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <Heart
                size={14}
                fill={isLiked ? "#f43f5e" : "transparent"}
                color={isLiked ? "#f43f5e" : "currentColor"}
              />
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}