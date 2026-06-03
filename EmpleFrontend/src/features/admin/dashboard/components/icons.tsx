import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = "inline-block shrink-0";

export function DashboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={base} {...props}>
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
    </svg>
  );
}

export function QuizIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={base} {...props}>
      <path
        d="M9.5 2L4 9h4.5L6.5 14 13 7H8.5L9.5 2z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function TestIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={base} {...props}>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HamburgerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className={base} {...props}>
      <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function UserCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={base} {...props}>
      <circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 13.5c0-2.485 2.686-4.5 6-4.5s6 2.015 6 4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={base} {...props}>
      <path d="M6 9V3M3 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ===================== */
/* 👁 Eye (Preview) */
/* ===================== */
export function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ===================== */
/* ✏️ Edit */
/* ===================== */
export function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14.06 4.19l3.75 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ===================== */
/* 🗑 Trash */
/* ===================== */
export function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 6h18"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 6V4h8v2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 6l1 14h10l1-14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}