import type { CodingProblemOption } from './testEdit.types';

type CodingProblemSelectorProps = {
  codingProblems: CodingProblemOption[];
  loading: boolean;
  selectedIds: string[];
  numberOfQuestions: string;
  onToggle: (problemId: string) => void;
};

export default function CodingProblemSelector({
  codingProblems,
  loading,
  selectedIds,
  numberOfQuestions,
  onToggle,
}: CodingProblemSelectorProps) {
  const requiredCount = Number(numberOfQuestions || 0);
  const selectedCount = selectedIds.length;
  const hasMismatch = requiredCount > 0 && selectedCount !== requiredCount;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-[var(--clr-text)]">
          Published Coding Problems
        </label>

        <span
          className={`text-xs ${
            hasMismatch ? 'text-orange-500' : 'text-[var(--clr-text2)]'
          }`}
        >
          {selectedCount} / {requiredCount} selected
        </span>
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-3">
        {loading ? (
          <p className="text-sm text-[var(--clr-text2)]">
            Loading coding problems...
          </p>
        ) : codingProblems.length === 0 ? (
          <p className="text-sm text-[var(--clr-text2)]">
            No published coding problems available.
          </p>
        ) : (
          codingProblems.map((problem) => {
            const selected = selectedIds.includes(problem._id);

            return (
              <button
                key={problem._id}
                type="button"
                onClick={() => onToggle(problem._id)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                  selected
                    ? 'border-[var(--clr-accent)] bg-[var(--clr-accent)]/10'
                    : 'border-[var(--clr-border)] bg-[var(--clr-surface)]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--clr-text)]">
                      {problem.title}
                    </p>

                    <p className="mt-1 text-xs text-[var(--clr-text2)]">
                      {problem.difficulty || 'Easy'} ·{' '}
                      {problem.recommendedTime || 0} min
                    </p>

                    {problem.topics?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {problem.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-[var(--clr-surface2)] px-2 py-0.5 text-[11px] text-[var(--clr-text2)]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${
                      selected
                        ? 'bg-[var(--clr-accent)] text-white'
                        : 'bg-[var(--clr-surface2)] text-[var(--clr-text2)]'
                    }`}
                  >
                    {selected ? 'Selected' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {hasMismatch ? (
        <p className="mt-2 text-xs text-orange-500">
          Select exactly {requiredCount} coding problem
          {requiredCount === 1 ? '' : 's'} for this section.
        </p>
      ) : null}
    </div>
  );
}