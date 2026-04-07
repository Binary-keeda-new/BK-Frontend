'use client';

import type { ActionCardProps } from "../types";

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function QuizSecondaryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function ActionCard({
  title,
  description,
  onPrimary,
  onSecondary,
  showDocIcon = false,
  variant,
}: ActionCardProps) {
  const SecondaryIcon =
    variant === 'bank'
      ? BankIcon
      : variant === 'code'
      ? CodeIcon
      : showDocIcon
      ? DocIcon
      : QuizSecondaryIcon;

  return (
    <div
      className="
        relative overflow-hidden
        flex flex-col justify-between
        gap-4 sm:gap-5
        p-4 sm:p-6 lg:p-7
        min-h-[120px] sm:min-h-[140px]
        rounded-2xl
        border border-[var(--clr-border)]
        bg-[var(--clr-surface)]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:border-[rgba(241,90,34,0.28)]
      "
    >
      {/* Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_100%_0%,rgba(241,90,34,0.05)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-[var(--clr-text)]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--clr-text2)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-2.5">
        {/* Secondary */}
        <button
          onClick={onSecondary}
          aria-label={`Secondary action for ${title}`}
          type="button"
          className="
            w-8 h-8 sm:w-9 sm:h-9
            flex items-center justify-center
            rounded-full
            border
            border-[var(--clr-border2)]
            bg-[var(--clr-surface2)]
            text-[var(--clr-text2)]
            transition-all duration-200
            hover:scale-110 hover:text-[var(--clr-accent)] hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)]
          "
        >
          <SecondaryIcon />
        </button>

        {/* Primary */}
        <button
          onClick={onPrimary}
          aria-label={`Create ${title}`}
          type="button"
          className="
            w-8 h-8 sm:w-9 sm:h-9
            flex items-center justify-center
            rounded-full
            bg-[var(--clr-accent)]
            text-white
            shadow-md
            transition-all duration-200
            hover:scale-110 hover:rotate-90 hover:bg-[#e04d18] hover:shadow-lg
          "
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}