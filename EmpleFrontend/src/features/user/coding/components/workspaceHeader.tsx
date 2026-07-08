interface Props {
  problem: any;
  mode?: 'practice' | 'test';
  onBack?: () => void;
}

export default function WorkspaceHeader({
  problem,
  mode = 'practice',
  onBack,
}: Props) {
  return (
    <header className="border-b border-[var(--clr-border)] bg-[var(--clr-surface)] px-5 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
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

        <div className="hidden flex-wrap items-center justify-end gap-2 md:flex">
          <span className="rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-1 text-xs font-semibold text-[var(--clr-text2)]">
            {mode === 'test' ? 'Test Mode' : 'Practice Mode'}
          </span>

          {problem.recommendedTime ? (
            <span className="rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-1 text-xs font-semibold text-[var(--clr-text2)]">
              {problem.recommendedTime} min
            </span>
          ) : null}

          {problem.topics?.slice(0, 3).map((topic: string) => (
            <span
              key={topic}
              className="rounded-full bg-[var(--clr-accent3)] px-3 py-1 text-xs font-semibold text-[var(--clr-accent)]"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}