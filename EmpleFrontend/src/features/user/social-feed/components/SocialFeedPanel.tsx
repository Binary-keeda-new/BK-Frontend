import React from 'react';
import { useSocialFeed } from '../hooks/useSocialFeed';
import SocialPostCard from './SocialPostCard';
import { AlertCircle, Instagram } from 'lucide-react';

export default function SocialFeedPanel() {
  const { posts, isLoading, error } = useSocialFeed();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-[var(--text)] font-medium">Failed to load feed</p>
        <p className="text-[var(--muted2)] text-sm mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Decorative Header */}
      <a 
        href="https://www.instagram.com/emple.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-3 mb-6 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 p-4 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-colors cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <Instagram className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text)] group-hover:text-pink-400 transition-colors">@emple.in</h3>
          <p className="text-xs text-[var(--muted2)]">Latest Updates</p>
        </div>
      </a>

      {isLoading ? (
        // Loading Skeleton
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div className="aspect-square bg-[var(--surface2)] animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-[var(--surface2)] rounded animate-pulse" />
                <div className="h-4 bg-[var(--surface2)] rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Posts Feed
        <div className="space-y-6">
          {posts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--muted2)]">No updates available right now.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
