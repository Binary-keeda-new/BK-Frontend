'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Blog } from '../types/blogs.types';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogs.service';
import BlogFormModal from '../components/BlogFormModal';
import BlogsTable from '../components/BlogsTable';

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 26, fontWeight: 800, color, letterSpacing: '-0.03em' }}>{value}</span>
      <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs]       = useState<Blog[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editBlog, setEditBlog]     = useState<Blog | null>(null);
  const [deleteBlogItem, setDeleteBlogItem] = useState<Blog | null>(null);
  const [deleteLoading, setDeleteLoading]   = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      setBlogs(await fetchBlogs());
    } catch (err: any) {
      setError(err.message || 'Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
  }, [blogs, search]);

  async function handleCreate(data: any) {
    const created = await createBlog(data);
    setBlogs(prev => [created, ...prev]);
  }

  async function handleEdit(data: any) {
    if (!editBlog) return;
    const updated = await updateBlog(editBlog._id, data);
    setBlogs(prev => prev.map(b => b._id === editBlog._id ? updated : b));
  }

  async function handleDelete() {
    if (!deleteBlogItem) return;
    setDeleteLoading(true);
    try {
      await deleteBlog(deleteBlogItem._id);
      setBlogs(prev => prev.filter(b => b._id !== deleteBlogItem._id));
      setDeleteBlogItem(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete.');
    } finally {
      setDeleteLoading(false);
    }
  }

  const published = blogs.filter(b => b.published).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      {showCreate && <BlogFormModal onSave={handleCreate} onClose={() => setShowCreate(false)} />}
      {editBlog  && <BlogFormModal blog={editBlog} onSave={handleEdit} onClose={() => setEditBlog(null)} />}

      {/* Delete confirm */}
      {deleteBlogItem && (
        <>
          <div onClick={() => setDeleteBlogItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', zIndex: 40 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(420px, calc(100vw - 32px))', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '28px 24px 20px', zIndex: 50, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, margin: '0 auto 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 3h6M3 6h14M5 6l1 11h8l1-11" stroke="#f87171" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10v4M12 10v4" stroke="#f87171" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <h3 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Delete Blog?</h3>
            <p style={{ margin: '0 0 20px', textAlign: 'center', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>{deleteBlogItem.title}</strong> will be permanently removed.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteBlogItem(null)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleteLoading} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 700, background: deleteLoading ? 'rgba(239,68,68,0.5)' : '#ef4444', border: 'none', color: '#fff', cursor: deleteLoading ? 'default' : 'pointer' }}>
                {deleteLoading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Manage Blogs</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>Create, edit and delete blog posts</p>
        </div>
        <button onClick={() => setShowCreate(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 10, background: 'var(--orange)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          New Blog
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <StatCard label="Total Blogs"     value={blogs.length}  color="var(--text)" />
        <StatCard label="Published"       value={published}     color="#22c55e" />
        <StatCard label="Drafts"          value={blogs.length - published} color="var(--muted)" />
        <StatCard label="Filtered"        value={filtered.length} color="var(--orange)" />
      </div>

      {/* Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, author or tag…" style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{filtered.length} blogs</span>
      </div>

      {error && <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 20, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 13 }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading blogs…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      ) : (
        <BlogsTable blogs={filtered} onEdit={b => setEditBlog(b)} onDelete={b => setDeleteBlogItem(b)} />
      )}
    </div>
  );
}
