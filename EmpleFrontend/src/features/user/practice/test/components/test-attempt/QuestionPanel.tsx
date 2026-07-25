import { LEGEND, SC } from './testAttempt.constants';
import type { Status } from './testAttempt.types';

type Props = {
  current: number;
  totalQuestions: number;
  answeredCount: number;
  submitting: boolean;
  loading: boolean;
  canSubmit: boolean;
  getStatus: (idx: number) => Status;
  goTo: (idx: number) => void;
  onSubmit: () => void;
};

export default function QuestionPanel({
  current,
  totalQuestions,
  answeredCount,
  submitting,
  loading,
  canSubmit,
  getStatus,
  goTo,
  onSubmit,
}: Props) {
  return (
    <aside className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-5">
      <div>
        <p className="m-0 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted,#666)]">
          QUESTIONS
        </p>

        <p className="mt-2 text-xs text-[var(--muted2,#8a8a9a)]">
          Answered:{' '}
          <strong className="text-[var(--text,#f0f0f4)]">{answeredCount}</strong>{' '}
          / {totalQuestions}
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, idx) => {
          const status = getStatus(idx);
          const colors = SC[status];
          const active = idx === current;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to question ${idx + 1}`}
              aria-current={active ? 'true' : undefined}
              className="aspect-square rounded-lg text-[13px] font-medium transition"
              style={{
                fontWeight: active ? 700 : 500,
                background: active ? 'var(--orange, #f15a22)' : colors.bg,
                color: active ? '#fff' : colors.color,
                border: `1px solid ${
                  active ? 'var(--orange, #f15a22)' : colors.border
                }`,
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {LEGEND.map(({ label, status }) => {
          const colors = SC[status];

          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 shrink-0 rounded-[3px]"
                style={{
                  background: colors.bg || 'var(--surface2, #1e2028)',
                  border: `1px solid ${colors.border}`,
                }}
              />

              <span className="text-xs text-[var(--muted2,#8a8a9a)]">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || loading || !canSubmit}
          className="w-full rounded-[10px] bg-[var(--orange,#f15a22)] px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Submitting...' : canSubmit ? 'Submit Section' : 'Locked'}
        </button>
      </div>
    </aside>
  );
}
