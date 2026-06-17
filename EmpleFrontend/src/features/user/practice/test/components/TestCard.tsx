'use client';

import { UserTest } from '../types/test.types';

type Props = {
  test: UserTest;
  onAttempt: (testId: string) => void;
  onResume?: (testId: string) => void;
  onPreview?: (testId: string) => void;
};

function formatDuration(minutes: number) {
  if (!minutes || minutes <= 0) return 'No time limit';

  if (minutes < 60) return `${minutes} mins`;

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins ? `${hrs}h ${mins}m` : `${hrs}h`;
}

export default function TestCard({
  test,
  onAttempt,
  onResume,
  onPreview,
}: Props) {
  const hasAttempted = test.attempted;
  const status = test.status;

  const buttonLabel =
    status === 'in_progress'
      ? 'Resume'
      : hasAttempted || status === 'completed'
      ? 'Preview'
      : 'Attempt';

  const handleAction = () => {
    if (status === 'in_progress') {
      onResume?.(test._id);
      return;
    }

    if (hasAttempted || status === 'completed') {
      onPreview?.(test._id);
      return;
    }

    onAttempt(test._id);
  };

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--orange)] hover:shadow-[0_8px_24px_rgba(241,90,34,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-extrabold text-[var(--text)]">
              {test.title}
            </h3>

            {status === 'in_progress' && (
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold text-sky-300">
                In Progress
              </span>
            )}

            {(hasAttempted || status === 'completed') && status !== 'in_progress' && (
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                Completed
              </span>
            )}
          </div>

          {test.description && (
            <p className="line-clamp-2 text-sm leading-6 text-[var(--muted2)]">
              {test.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted2)]">
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {test.totalSections} section{test.totalSections === 1 ? '' : 's'}
            </span>

            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {formatDuration(test.totalDuration)}
            </span>

            {test.sections?.some((section) => section.type === 'mcq') && (
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                MCQ
              </span>
            )}

            {test.sections?.some((section) => section.type === 'coding') && (
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                Coding
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAction}
          className={`shrink-0 rounded-2xl px-5 py-2.5 text-sm font-bold ${
            status === 'in_progress'
              ? 'border border-sky-500/30 bg-sky-500/10 text-sky-300'
              : hasAttempted || status === 'completed'
              ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'bg-[var(--orange)] text-white'
          }`}
        >
          {buttonLabel} →
        </button>
      </div>
    </div>
  );
}