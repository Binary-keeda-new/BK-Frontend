'use client';

type Props = {
  violationType: string | null;
  warningCount: number;
  onContinue: () => void;
};

const messages: Record<string, string> = {
  keyboard_c: 'Copying content is not allowed during this test.',
  keyboard_v: 'Pasting content is not allowed during this test.',
  keyboard_x: 'Cutting content is not allowed during this test.',
  clipboard_copy: 'Copying content is not allowed during this test.',
  clipboard_paste: 'Pasting content is not allowed during this test.',
  clipboard_cut: 'Cutting content is not allowed during this test.',
  lost_focus: 'You moved away from the test window.',
  tab_hidden_or_minimized: 'You switched tabs, minimized, or hid the test window.',
  devtools_open: 'Developer tools are not allowed during this test.',
  exit_fullscreen: 'Fullscreen mode is required for this test.',
};

export default function TestViolationModal({
  violationType,
  warningCount,
  onContinue,
}: Props) {
  if (!violationType) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[var(--surface)] p-6 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
          ⚠️
        </div>

        <h2 className="mt-5 text-center text-2xl font-extrabold text-[var(--text)]">
          Test Rule Violation
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-[var(--muted2)]">
          {messages[violationType] || 'A test security rule was violated.'}
        </p>

        <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-400">
          Warning Count: {warningCount}
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-[var(--muted2)]">
          Please continue carefully. Repeated violations may be reviewed by the evaluator.
        </p>

        <button
          onClick={onContinue}
          className="mt-6 w-full rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
        >
          I Understand, Continue Test
        </button>
      </div>
    </div>
  );
}