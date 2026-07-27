'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareProfileButtonProps {
  url?: string;
  title?: string;
  text?: string;
  variant?: 'outline' | 'solid' | 'ghost' | 'floating';
  className?: string;
}

export function ShareProfileButton({ 
  url, 
  title = 'Check out this portfolio', 
  text = 'View my professional portfolio on Emple.',
  variant = 'outline',
  className = ''
}: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setToast(true);
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setToast(false), 3000);
      })
      .catch((err) => console.error('Failed to copy', err));
  };

  const baseStyles = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm";
  let variantStyles = "";
  
  if (variant === 'outline') {
    variantStyles = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
  } else if (variant === 'solid') {
    variantStyles = "border-none bg-indigo-600 text-white hover:bg-indigo-700";
  } else if (variant === 'ghost') {
    variantStyles = "border-none bg-transparent text-gray-600 hover:bg-gray-100 shadow-none";
  } else if (variant === 'floating') {
    variantStyles = "border border-white/20 bg-black/80 backdrop-blur-md text-white hover:bg-black hover:scale-105 rounded-full px-6 py-3 shadow-xl";
  }

  return (
    <>
      <button 
        onClick={handleShare}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Share'}
      </button>

      {/* Sleek Toast for Fallback */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transform transition-all duration-300 z-[100] ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-green-400" />
        </div>
        <p className="text-sm font-medium">Link copied to clipboard!</p>
      </div>
    </>
  );
}
