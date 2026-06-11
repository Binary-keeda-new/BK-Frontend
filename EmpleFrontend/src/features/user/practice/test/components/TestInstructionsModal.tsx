'use client';

type Props = {
  open: boolean;
  testTitle: string;
  agreed: boolean;
  onAgreeChange: (value: boolean) => void;
  onClose: () => void;
  onPreview: () => void;
};

const RULES = [
  'Read all instructions carefully before starting.',
  'Each section has its own timer and question set.',
  'Only the enabled section can be attempted.',
  'Do not refresh or close the tab during the test.',
  'After completing one section, you can move to the next section.',
];

export default function TestInstructionsModal({
  open,
  testTitle,
  agreed,
  onAgreeChange,
  onClose,
  onPreview,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 backdrop-blur"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[500px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">
              {testTitle}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted2)]">
              Please read the instructions before previewing the test.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl leading-none text-[var(--muted2)]"
          >
            ×
          </button>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2,#1e2028)] p-5">
          <p className="mb-3 text-xs font-semibold tracking-[0.06em] text-[var(--orange)]">
            TEST RULES
          </p>

          <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
            {RULES.map((rule) => (
              <li key={rule} className="text-sm leading-6 text-[var(--muted2)]">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <label
          className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl px-4 py-3"
          style={{
            border: `1px solid ${agreed ? 'var(--orange)' : 'var(--border)'}`,
            background: agreed ? 'rgba(241,90,34,0.08)' : 'transparent',
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => onAgreeChange(e.target.checked)}
            className="mt-1 h-4 w-4"
            style={{ accentColor: 'var(--orange)' }}
          />
          <span className="text-sm text-[var(--text)]">
            I have read and understood all the test instructions.
          </span>
        </label>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--muted2)]"
          >
            Cancel
          </button>

          <button
            disabled={!agreed}
            onClick={onPreview}
            className="flex-[2] rounded-xl px-4 py-3 text-sm font-bold"
            style={{
              background: agreed ? 'var(--orange)' : 'transparent',
              border: `1px solid ${agreed ? 'var(--orange)' : 'var(--border)'}`,
              color: agreed ? '#fff' : 'var(--muted)',
              cursor: agreed ? 'pointer' : 'not-allowed',
              opacity: agreed ? 1 : 0.5,
            }}
          >
            Preview Test →
          </button>
        </div>
      </div>
    </div>
  );
}