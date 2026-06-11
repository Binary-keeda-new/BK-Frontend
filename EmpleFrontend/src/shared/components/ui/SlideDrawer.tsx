import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SlideDrawer({
  isOpen,
  onClose,
  title,
  width = 'md',
  children,
  icon
}: SlideDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const widthClass = {
    sm: 'max-w-[380px]',
    md: 'max-w-[440px]',
    lg: 'max-w-[500px]'
  }[width];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[60] flex justify-end pointer-events-none">
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`relative pointer-events-auto w-full ${widthClass} h-full shadow-2xl flex flex-col animated-border`}
        style={{ animation: 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <div className="animated-border-inner flex flex-col h-full bg-[var(--surface)] w-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--surface)]">
            <div className="flex items-center gap-2">
              {icon && <div className="text-[var(--orange)]">{icon}</div>}
              <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
