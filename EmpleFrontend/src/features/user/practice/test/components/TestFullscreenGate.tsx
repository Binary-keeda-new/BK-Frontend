'use client';

type Props = {
  testTitle: string;
  onEntered: () => void;
  onBack: () => void;
};

export default function TestFullscreenGate({
  testTitle,
  onEntered,
  onBack,
}: Props) {
  const handleEnterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }

      onEntered();
    } catch (error) {
      console.error(error);
      alert('Please allow fullscreen mode to continue the test.');
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-[720px] items-center justify-center p-6">
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
          FULLSCREEN REQUIRED
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-[var(--text)]">
          {testTitle}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--muted2)]">
          This test must be attempted in fullscreen mode. Exiting fullscreen
          during the test may count as a warning.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={onBack}
            className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted2)]"
          >
            Back
          </button>

          <button
            onClick={handleEnterFullscreen}
            className="rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
          >
            Enter Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}