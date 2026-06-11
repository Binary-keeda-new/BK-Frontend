'use client';

type Props = {
  open: boolean;
  rating: number;
  onRate: (rating: number) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function TestFeedbackModal({
  open,
  rating,
  onRate,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 backdrop-blur"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <h2 className="text-xl font-bold text-[var(--text)]">
          Thanks for attempting!
        </h2>

        <p className="mt-2 text-sm text-[var(--muted2)]">
          Please rate your experience.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRate(star)}
              className={`text-4xl transition ${
                star <= rating
                  ? 'text-yellow-400'
                  : 'text-[var(--muted2)]'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--muted2)]"
          >
            Later
          </button>

          <button
            onClick={onSubmit}
            className="flex-1 rounded-xl bg-[var(--orange)] px-4 py-3 text-sm font-bold text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}