import type { Question, QuestionMode } from './testAttempt.types';

type Props = {
  question: Question;
  current: number;
  selected: string[];
  mode: QuestionMode;
  isFlagged: boolean;
  error: string | null;
  onToggleFlag: () => void;
  onOption: (option: string) => void;
  onNatChange: (value: string) => void;
};

export default function QuestionCard({
  question,
  current,
  selected,
  mode,
  isFlagged,
  error,
  onToggleFlag,
  onOption,
  onNatChange,
}: Props) {
  return (
    <div className="h-full w-full flex flex-col rounded-2xl border border-[var(--border,#262936)] bg-[var(--surface,#161820)] p-5 md:p-6 shadow-md overflow-hidden">
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border,#262936)] pb-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-3 py-1 text-xs font-bold text-[var(--orange,#f15a22)]">
            Question {current + 1}
          </span>

          <span className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-[11px] font-semibold text-[var(--muted2,#8a8a9a)] uppercase">
            {mode === 'mcq' ? 'Single Choice (MCQ)' : mode === 'multi' ? 'Multiple Choice (MSQ)' : 'Numerical (NAT)'}
          </span>

          <span className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
            +{question.positiveMarks}
          </span>
          {question.negativeMarks > 0 && (
            <span className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-[11px] font-semibold text-rose-400">
              -{question.negativeMarks}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleFlag}
          className={`rounded-lg px-3 py-1 text-xs font-semibold transition border ${
            isFlagged
              ? 'border-amber-500/50 bg-amber-500/15 text-amber-400'
              : 'border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] text-[var(--muted2,#8a8a9a)] hover:text-white'
          }`}
        >
          {isFlagged ? '🚩 Flagged' : '🏳 Flag Question'}
        </button>
      </div>

      {/* Main Scrollable Question Content (scrolls internally if unusually long) */}
      <div className="flex-1 min-h-0 overflow-y-auto py-3 flex flex-col gap-4 pr-1">
        <div>
          <div className="text-[15px] md:text-base lg:text-[17px] font-medium leading-relaxed text-[var(--text,#f0f0f4)] select-text">
            {question.question}
          </div>

          {question.imageUrl && (
            <img
              src={question.imageUrl}
              alt="Question"
              className="mt-3 max-w-full rounded-xl border border-[var(--border,#262936)] max-h-60 object-contain"
            />
          )}
        </div>

        <div className="mt-1">
          {mode === 'nat' ? (
            <div>
              <label className="block text-xs font-medium text-[var(--muted2,#8a8a9a)] mb-2">
                Type your numerical answer below:
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={selected[0] ?? ''}
                onChange={(e) => onNatChange(e.target.value)}
                placeholder="e.g. 42 or 3.14"
                className="w-full max-w-md rounded-xl border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-4 py-2.5 text-base text-[var(--text,#f0f0f4)] outline-none transition focus:border-[var(--orange,#f15a22)] focus:ring-2 focus:ring-[var(--orange,#f15a22)]/20"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {question.options.map((opt: string, i: number) => {
                const sel = selected.includes(opt);
                const optionLetter = String.fromCharCode(65 + i);

                return (
                  <button
                    key={`${opt}-${i}`}
                    type="button"
                    onClick={() => onOption(opt)}
                    className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3 text-left transition ${
                      sel
                        ? 'border-[var(--orange,#f15a22)] bg-[rgba(241,90,34,0.12)] text-white shadow-sm ring-1 ring-[var(--orange,#f15a22)]'
                        : 'border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)]/70 text-[var(--muted2,#8a8a9a)] hover:border-white/25 hover:text-[var(--text,#f0f0f4)]'
                    }`}
                    aria-pressed={sel}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                        sel
                          ? 'bg-[var(--orange,#f15a22)] text-white shadow-sm'
                          : 'border border-[var(--border,#262936)] bg-[var(--surface,#161820)] text-[var(--muted2,#8a8a9a)]'
                      }`}
                    >
                      {optionLetter}
                    </div>

                    <span className="text-sm md:text-[15px] leading-relaxed flex-1">
                      {opt}
                    </span>

                    {mode === 'mcq' ? (
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                          sel ? 'border-[var(--orange,#f15a22)]' : 'border-[var(--muted,#666)]'
                        }`}
                      >
                        {sel && <div className="h-2 w-2 rounded-full bg-[var(--orange,#f15a22)]" />}
                      </div>
                    ) : (
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition ${
                          sel ? 'border-[var(--orange,#f15a22)] bg-[var(--orange,#f15a22)]' : 'border-[var(--muted,#666)]'
                        }`}
                      >
                        {sel && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M1.5 5L4 7.5L8.5 2.5"
                              stroke="#fff"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {error && <div className="shrink-0 pt-2 text-xs font-semibold text-rose-400">{error}</div>}
    </div>
  );
}
