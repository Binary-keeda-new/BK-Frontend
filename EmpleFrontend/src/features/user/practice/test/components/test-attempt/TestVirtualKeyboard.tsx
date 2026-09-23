'use client';

type Props = {
  open: boolean;
  onClose: () => void;
  onKeyPress: (value: string) => void;
};

const rows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export default function TestVirtualKeyboard({
  open,
  onClose,
  onKeyPress,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[760] w-[94vw] max-w-3xl -translate-x-1/2 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-[var(--text)]">Virtual Keyboard</p>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted2)]"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => onKeyPress(key)}
                className="min-w-10 rounded-xl border border-[var(--border)] px-3 py-3 text-sm font-bold text-[var(--text)]"
              >
                {key}
              </button>
            ))}
          </div>
        ))}

        <div className="flex justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onKeyPress(' ')}
            className="w-64 rounded-xl border border-[var(--border)] px-3 py-3 text-sm font-bold text-[var(--text)]"
          >
            Space
          </button>

          <button
            type="button"
            onClick={() => onKeyPress('BACKSPACE')}
            className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-bold text-[var(--text)]"
          >
            Backspace
          </button>

          <button
            type="button"
            onClick={() => onKeyPress('ENTER')}
            className="rounded-xl bg-[var(--orange)] px-4 py-3 text-sm font-bold text-white"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}