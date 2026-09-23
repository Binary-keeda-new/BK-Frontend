'use client';

interface Props {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  title,
  message,
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-[var(--clr-text)]">
          {title}
        </h2>

        <p className="mt-3 leading-7 text-[var(--clr-text2)]">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-[var(--clr-border)] px-5 py-2.5 transition hover:bg-[var(--clr-surface2)]"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}