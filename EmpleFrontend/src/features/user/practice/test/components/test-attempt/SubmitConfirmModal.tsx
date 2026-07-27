type Props = {
  answeredCount: number;
  totalQuestions: number;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function SubmitConfirmModal({
  answeredCount,
  totalQuestions,
  submitting,
  onCancel,
  onSubmit,
}: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
          CONFIRM SUBMISSION
        </p>

        <h2 className="mt-2 text-xl font-bold text-[var(--text,#f0f0f4)]">
          Submit this section?
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--muted2,#8a8a9a)]">
          You have answered {answeredCount} out of {totalQuestions} questions.
          Once submitted, this section will be locked.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-3">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Answered</p>
            <p className="mt-1 text-lg font-bold text-[var(--text,#f0f0f4)]">
              {answeredCount}
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-3">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Remaining</p>
            <p className="mt-1 text-lg font-bold text-[var(--text,#f0f0f4)]">
              {totalQuestions - answeredCount}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--muted2,#8a8a9a)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="flex-1 rounded-xl bg-[var(--orange,#f15a22)] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Yes, Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
