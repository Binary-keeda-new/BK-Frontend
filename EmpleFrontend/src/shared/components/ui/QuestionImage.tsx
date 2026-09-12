'use client';

import { useState, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface QuestionImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function QuestionImage({
  src,
  alt = 'Question Image',
  className = '',
}: QuestionImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 0.5));
  const handleReset = () => setScale(1);
  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setScale(1), 0); // Reset scale on close
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-8">
      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10 bg-[var(--surface,#161820)] border border-[var(--border,rgba(255,255,255,0.07))] rounded-xl p-1 shadow-2xl">
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-lg text-white hover:bg-[var(--surface2,#1e2028)] transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-lg text-white hover:bg-[var(--surface2,#1e2028)] transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-2.5 rounded-lg text-white hover:bg-[var(--surface2,#1e2028)] transition-colors"
          title="Reset Zoom"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="w-[1px] h-6 bg-[var(--border,rgba(255,255,255,0.1))] mx-1" />
        <button
          onClick={handleClose}
          className="p-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image Container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-auto scrollbar-hide"
        onClick={handleClose} // Close if background clicked
      >
        <div 
          className="flex items-center justify-center min-w-full min-h-full"
        >
          <img
            src={src}
            alt={alt}
            className="transition-transform duration-200 ease-out cursor-zoom-in"
            style={{ 
              transform: `scale(${scale})`, 
              cursor: scale >= 4 ? 'default' : 'zoom-in',
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain'
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (scale < 4) handleZoomIn();
            }}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className={`flex w-full justify-center my-4 ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full max-w-[420px] max-h-[240px] object-contain rounded-lg border border-[var(--border,rgba(255,255,255,0.07))] cursor-pointer hover:border-[var(--orange,#f15a22)] hover:opacity-90 transition-all"
          onClick={() => setIsOpen(true)}
        />
      </div>
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
