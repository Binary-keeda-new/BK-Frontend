'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useUser } from '@descope/nextjs-sdk/client';
import { Blog } from '../types/blogs.types';
import { likeBlog } from '../services/blogs.service';
import BlogContentRenderer from '../components/BlogContentRenderer';

const getClientId = () => {
  if (typeof window === 'undefined') return '';
  let cid = localStorage.getItem('emple_client_id');
  if (!cid) {
    cid = 'client_' + Math.random().toString(36).substring(2, 12);
    localStorage.setItem('emple_client_id', cid);
  }
  return cid;
};

export default function BlogDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const { user }  = useUser();
  const [blog, setBlog]       = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [likes, setLikes]     = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getImageUrl = (image: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    if (image.startsWith('/uploads')) return `${baseUrl}${image}`;
    if (image.startsWith('uploads/')) return `${baseUrl}/${image}`;
    if (image.startsWith('/')) return `${baseUrl}${image}`;
    return `${baseUrl}/uploads/${image}`;
  };

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const blogData: Blog = data.data ?? data;
        setBlog(blogData);
        setLikes(blogData.likes || 0);

        const effectiveUserId = user?.userId || user?.email || (typeof window !== 'undefined' ? localStorage.getItem('emple_client_id') : '');
        if (effectiveUserId && blogData.likedBy?.includes(effectiveUserId)) {
          setIsLiked(true);
        } else {
          try {
            const localLiked = JSON.parse(localStorage.getItem('liked_blogs') || '[]');
            if (Array.isArray(localLiked) && localLiked.includes(blogData._id)) {
              setIsLiked(true);
            }
          } catch {}
        }
      })
      .catch(err => setError(err.message || 'Failed to load blog.'))
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleLike = async () => {
    if (!blog || isSubmitting) return;

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
      // Revert on error
      setIsLiked(!nextLiked);
      setLikes(likes);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Meta Data & Like Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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

            <button
              type="button"
              onClick={handleLike}
              title={isLiked ? "Unlike article" : "Like article"}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 24,
                background: isLiked ? 'rgba(244, 63, 94, 0.12)' : 'var(--surface)',
                border: `1px solid ${isLiked ? 'rgba(244, 63, 94, 0.4)' : 'var(--border)'}`,
                color: isLiked ? '#f43f5e' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (!isLiked) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244, 63, 94, 0.3)';
                  (e.currentTarget as HTMLElement).style.color = '#f43f5e';
                }
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                if (!isLiked) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                }
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <Heart
                size={18}
                fill={isLiked ? "#f43f5e" : "transparent"}
                color={isLiked ? "#f43f5e" : "currentColor"}
              />
              <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </button>
          </div>

          {/* Advertisement Banner Placeholder */}
          <div style={{ width: '100%', height: 120, background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Advertisement Space</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Banner Ad (728x90 or responsive)</span>
          </div>

          {blog.coverImage && (
            <figure style={{ margin: '0 0 40px' }}>
              <img src={getImageUrl(blog.coverImage)} alt={blog.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '16px', display: 'block' }} />
            </figure>
          )}

          {/* Content Renderer */}
          <article className="blog-article-body" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '60px', marginBottom: '40px' }}>
            <BlogContentRenderer rawContent={blog.content} blocks={blog.blocks} />
          </article>

          {/* Bottom Article Feedback / Like Callout */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 20px',
            marginBottom: 40,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            textAlign: 'center',
            gap: 14
          }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
              Enjoyed this article?
            </p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted2)' }}>
              Give it a like to show your appreciation!
            </p>
            <button
              type="button"
              onClick={handleLike}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                borderRadius: 30,
                background: isLiked ? 'rgba(244, 63, 94, 0.14)' : 'var(--surface2)',
                border: `1.5px solid ${isLiked ? '#f43f5e' : 'var(--border)'}`,
                color: isLiked ? '#f43f5e' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 15,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isLiked ? '0 4px 18px rgba(244, 63, 94, 0.25)' : 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <Heart
                size={20}
                fill={isLiked ? "#f43f5e" : "transparent"}
                color={isLiked ? "#f43f5e" : "currentColor"}
              />
              <span>{isLiked ? 'Liked' : 'Like'} ({likes})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}