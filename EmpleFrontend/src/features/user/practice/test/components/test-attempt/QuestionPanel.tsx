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
    <div className="h-full w-full flex flex-col rounded-2xl border border-[var(--border,#262936)] bg-[var(--surface,#161820)] p-4 lg:p-5 shadow-xl overflow-hidden">
      <div className="shrink-0 flex items-center justify-between border-b border-[var(--border,#262936)] pb-3">
        <p className="m-0 text-xs font-bold tracking-wider text-[var(--orange,#f15a22)] uppercase">
          QUESTIONS
        </p>

        <p className="text-xs text-[var(--muted2,#8a8a9a)]">
          Answered:{' '}
          <strong className="text-[var(--text,#f0f0f4)]">{answeredCount}</strong>{' '}
          / {totalQuestions}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto py-3 flex flex-col gap-4 pr-1">
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
                className="aspect-square rounded-lg text-xs md:text-[13px] font-bold transition flex items-center justify-center shadow-xs"
                style={{
                  fontWeight: active ? 700 : 600,
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

        <div className="flex flex-col gap-2 pt-3 border-t border-[var(--border,#262936)] mt-auto">
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

                <span className="text-[11px] text-[var(--muted2,#8a8a9a)]">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
