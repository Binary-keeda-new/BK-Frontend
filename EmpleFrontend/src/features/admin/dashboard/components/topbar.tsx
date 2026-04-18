'use client';

import type { TopbarProps } from '../types';
import { HamburgerIcon, UserCircleIcon } from  './icons';
import { useEffect, useRef, useState } from 'react';

export default function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setProfileOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleLogout() {
    setProfileOpen(false);
    
  }

  return (
    <header
      className="
        sticky top-0 z-[100]
        flex items-center gap-3
        h-16
        px-4 sm:px-5
        bg-[var(--clr-surface)]
        border-b border-[var(--clr-border)]
        transition-all
      "
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuOpen}
        aria-label="Open navigation menu"
        type="button"
        className="
          md:hidden
          w-9 h-9
          flex items-center justify-center
          rounded-full
          border border-[var(--clr-border2)]
          bg-[var(--clr-surface2)]
          text-[var(--clr-text2)]
          transition-all
          hover:scale-110 hover:text-[var(--clr-accent)] hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)]
        "
      >
        <HamburgerIcon />
      </button>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2.5">

        {/* Profile Button + Popover */}
        <div className="relative">
          <button
            ref={buttonRef}
            aria-label="User profile"
            aria-expanded={profileOpen}
            aria-haspopup="true"
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="
              w-9 h-9
              flex items-center justify-center
              rounded-full
              border border-[var(--clr-border2)]
              bg-[var(--clr-surface2)]
              text-[var(--clr-text2)]
              transition-all
              hover:scale-110 hover:text-[var(--clr-accent)] hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)]
            "
          >
            <UserCircleIcon />
          </button>

          {/* Popover */}
          {profileOpen && (
            <div
              ref={popoverRef}
              role="menu"
              className="
                absolute right-0 mt-2
                w-44
                rounded-xl
                border border-[var(--clr-border)]
                bg-[var(--clr-surface)]
                shadow-lg shadow-black/10
                overflow-hidden
                animate-in fade-in slide-in-from-top-2 duration-150
              "
            >
              <button
                role="menuitem"
                type="button"
                onClick={handleLogout}
                className="
                  w-full
                  flex items-center gap-2.5
                  px-4 py-2.5
                  text-sm text-left
                  text-[var(--clr-text2)]
                  hover:bg-[var(--clr-surface2)]
                  hover:text-[var(--clr-accent)]
                  transition-colors
                "
              >
                {/* Logout icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}