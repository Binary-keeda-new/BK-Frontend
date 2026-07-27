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
    <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-[clamp(16px,4vw,28px)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-1 text-[11px] font-semibold text-[var(--orange,#f15a22)]">
            Q{current + 1}
          </span>

          <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-1 text-[11px] font-medium text-[var(--muted2,#8a8a9a)]">
            {mode === 'mcq' ? 'MCQ' : mode === 'multi' ? 'MSQ' : 'NAT'}
          </span>

          <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-1 text-[11px] font-medium text-[var(--muted2,#8a8a9a)]">
            +{question.positiveMarks} / -{question.negativeMarks}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleFlag}
          className="rounded-lg px-3 py-[5px] text-xs font-semibold transition"
          style={{
            background: isFlagged ? 'rgba(239,68,68,0.1)' : 'transparent',
            border: `1px solid ${
              isFlagged ? '#ef4444' : 'var(--border, rgba(255,255,255,0.07))'
            }`,
            color: isFlagged ? '#ef4444' : 'var(--muted2, #8a8a9a)',
          }}
        >
          {isFlagged ? '🚩 Flagged' : '🏳 Flag'}
        </button>
      </div>

      <p className="mt-5 text-[clamp(15px,2.5vw,17px)] font-medium leading-[1.7] text-[var(--text,#f0f0f4)]">
        {question.question}
      </p>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="mt-5 max-w-full rounded-xl border border-[var(--border,rgba(255,255,255,0.07))]"
        />
      )}

      <div className="mt-6">
        {mode === 'nat' ? (
          <input
            type="text"
            inputMode="decimal"
            value={selected[0] ?? ''}
            onChange={(e) => onNatChange(e.target.value)}
            placeholder="Enter your answer"
            className="w-full rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-4 py-[14px] text-[15px] text-[var(--text,#f0f0f4)] outline-none transition focus:border-[var(--orange,#f15a22)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
          />
        ) : (
          <div className="flex flex-col gap-2.5">
            {question.options.map((opt: string, i: number) => {
              const sel = selected.includes(opt);

              return (
                <button
                  key={`${opt}-${i}`}
                  type="button"
                  onClick={() => onOption(opt)}
                  className="flex w-full items-center gap-[14px] rounded-xl border px-[18px] py-[14px] text-left transition hover:border-[var(--orange,#f15a22)] hover:bg-[rgba(241,90,34,0.07)]"
                  style={{
                    borderColor: sel
                      ? 'var(--orange, #f15a22)'
                      : 'var(--border, rgba(255,255,255,0.07))',
                    background: sel
                      ? 'rgba(241,90,34,0.08)'
                      : 'var(--surface2, #1e2028)',
                  }}
                  aria-pressed={sel}
                >
                  {mode === 'mcq' ? (
                    <div
                      className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition"
                      style={{
                        border: `2px solid ${
                          sel ? 'var(--orange, #f15a22)' : 'var(--muted, #666)'
                        }`,
                        background: sel ? 'var(--orange, #f15a22)' : 'transparent',
                      }}
                    >
                      {sel && <div className="h-[6px] w-[6px] rounded-full bg-white" />}
                    </div>
                  ) : (
                    <div
                      className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] transition"
                      style={{
                        border: `2px solid ${
                          sel ? 'var(--orange, #f15a22)' : 'var(--muted, #666)'
                        }`,
                        background: sel ? 'var(--orange, #f15a22)' : 'transparent',
                      }}
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

                  <span
                    className="text-sm leading-[1.4]"
                    style={{
                      color: sel
                        ? 'var(--text, #f0f0f4)'
                        : 'var(--muted2, #8a8a9a)',
                    }}
                  >
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <div className="mt-4 text-[13px] text-[#f87171]">{error}</div>}
    </div>
  );
}
