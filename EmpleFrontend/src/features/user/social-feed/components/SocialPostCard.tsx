import React from 'react';
import { SocialPost } from '../types/socialFeed.types';
import { ExternalLink } from 'lucide-react';

interface SocialPostCardProps {
  post: SocialPost;
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function SocialPostCard({ post }: SocialPostCardProps) {
  return (
    <a 
      href={post.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--orange)] hover:-translate-y-1 hover:shadow-[0_8px_24px_-12px_rgba(241,90,34,0.3)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--surface2)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.thumbnail} 
          alt="Instagram post thumbnail" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
          <ExternalLink className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-[var(--text)] line-clamp-2 leading-relaxed">
          {post.caption}
        </p>
        <p className="text-xs text-[var(--muted2)] mt-3">
          {timeAgo(post.timestamp)}
        </p>
      </div>
    </a>
  );
}
