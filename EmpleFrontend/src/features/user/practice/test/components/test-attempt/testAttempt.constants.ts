import type { Status } from './testAttempt.types';

export const SC: Record<Status, { bg: string; color: string; border: string }> = {
  'not-visited': {
    bg: 'transparent',
    color: 'var(--text)',
    border: 'var(--border, rgba(255,255,255,0.07))',
  },
  'not-attempted': {
    bg: '#1e3a5f',
    color: '#60a5fa',
    border: '#3b82f6',
  },
  answered: {
    bg: '#14532d',
    color: '#4ade80',
    border: '#22c55e',
  },
  flagged: {
    bg: '#450a0a',
    color: '#f87171',
    border: '#ef4444',
  },
};

export const LEGEND: { label: string; status: Status }[] = [
  { label: 'Answered', status: 'answered' },
  { label: 'Not Attempted', status: 'not-attempted' },
  { label: 'Not Visited', status: 'not-visited' },
  { label: 'Flagged', status: 'flagged' },
];
