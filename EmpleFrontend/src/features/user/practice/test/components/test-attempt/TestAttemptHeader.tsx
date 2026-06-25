type Props = {
  sectionIndex: number;
  current: number;
  totalQuestions: number;
  answeredCount: number;
  formattedTimeLeft: string | null;
  timeLeftMs: number | null;
  securityWarnings: number;
  submitting: boolean;
  loading: boolean;
  canSubmit: boolean;
  onBackToSections: () => void;
  onOpenQuestions: () => void;
  onSubmit: () => void;
  allowCalculator?: boolean;
  onOpenCalculator?: () => void;
};

export default function TestAttemptHeader({
  sectionIndex,
  current,
  totalQuestions,
  answeredCount,
  formattedTimeLeft,
  timeLeftMs,
  securityWarnings,
  submitting,
  loading,
  canSubmit,
  onBackToSections,
  onOpenQuestions,
  onSubmit,
  allowCalculator = false,
onOpenCalculator,
}: Props) {
  return (
    <div className="mb-4 rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-4 py-4 md:px-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
            SECTION {sectionIndex + 1} · MCQ ATTEMPT
          </p>

          <h1 className="mt-1 truncate text-lg font-bold text-[var(--text,#f0f0f4)]">
            Question {current + 1} of {totalQuestions}
          </h1>

          <p className="mt-1 text-sm text-[var(--muted2,#8a8a9a)]">
            {answeredCount} answered · {totalQuestions - answeredCount} remaining
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackToSections}
            className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-2 text-sm font-semibold text-[var(--text,#f0f0f4)]"
          >
            Sections
          </button>

          {formattedTimeLeft && (
            <span
              className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm font-bold"
              style={{
                color:
                  timeLeftMs !== null && timeLeftMs < 60_000
                    ? '#f87171'
                    : 'var(--text)',
              }}
            >
              ⏱ {formattedTimeLeft}
            </span>
          )}

          {securityWarnings ? (
            <span className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400">
              Warnings: {securityWarnings}
            </span>
          ) : null}

          <button
            type="button"
            onClick={onOpenQuestions}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm font-semibold text-[var(--text)] md:hidden"
          >
            Questions
          </button>

          {allowCalculator && (
          <button
            type="button"
            onClick={onOpenCalculator}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm font-semibold text-[var(--text)]"
          >
            🧮 Calculator
          </button>
          )}

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting || loading || !canSubmit}
            className="rounded-xl bg-[var(--orange,#f15a22)] px-4 py-2 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : canSubmit ? 'Submit' : 'Locked'}
          </button>
        </div>
      </div>
    </div>
  );
}
