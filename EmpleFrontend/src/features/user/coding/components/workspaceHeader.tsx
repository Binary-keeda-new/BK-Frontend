interface Props {
  problem: any;
  mode?: 'practice' | 'test';
  onBack?: () => void;
  formattedTimeLeft?: string | null;
  timeLeftMs?: number | null;
  currentProblemIndex?: number;
  totalProblems?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function WorkspaceHeader({
  problem,
  mode = 'practice',
  onBack,
  formattedTimeLeft,
  timeLeftMs,
  currentProblemIndex = 0,
  totalProblems = 1,
  onPrev,
  onNext,
}: Props) {
  return (
    <header className="border-b border-[var(--clr-border)] bg-[var(--clr-surface)] px-5 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-2 text-xs font-bold text-[var(--clr-text2)] transition hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
              >
                Back
              </button>
            )}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
                Emple Coding Workspace
              </p>

              <h1 className="mt-1 truncate text-lg font-extrabold text-[var(--clr-text)]">
                {problem.title}
              </h1>
            </div>
          </div>
        </div>

        {totalProblems > 1 && (
          <div className="flex items-center gap-4 border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-4 py-1.5 rounded-full shrink-0 shadow-sm">
            <button
              type="button"
              onClick={onPrev}
              disabled={currentProblemIndex === 0}
              className="text-sm font-bold text-[var(--clr-text2)] disabled:opacity-30 transition hover:text-[var(--clr-accent)]"
            >
              &lt; Previous
            </button>
            <span className="text-sm font-semibold text-[var(--clr-text)] min-w-[120px] text-center">
              Problem {currentProblemIndex + 1} of {totalProblems}
            </span>
            <button
              type="button"
              onClick={onNext}
              disabled={currentProblemIndex === totalProblems - 1}
              className="text-sm font-bold text-[var(--clr-text2)] disabled:opacity-30 transition hover:text-[var(--clr-accent)]"
            >
              Next &gt;
            </button>
          </div>
        )}

        <div className="flex items-center justify-end flex-1 shrink-0">
          {formattedTimeLeft && (
            <span
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400"
              style={{
                color:
                  timeLeftMs !== null && timeLeftMs !== undefined && timeLeftMs < 60_000
                    ? '#f87171'
                    : undefined,
              }}
            >
              ⏱ {formattedTimeLeft}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}