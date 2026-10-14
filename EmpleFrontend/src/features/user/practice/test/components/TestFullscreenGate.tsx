'use client';

import { useState } from 'react';

type Props = {
  testTitle: string;
  onEntered: () => void;
  onBack: () => void;
  warningCount?: number;
};

const checkIsFullscreen = () =>
  Boolean(
    document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
  );

export default function TestFullscreenGate({
  testTitle,
  onEntered,
  onBack,
  warningCount,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleEnterFullscreen = async () => {
    setError(null);
    try {
      const elem = document.documentElement as any;
      if (!checkIsFullscreen()) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      }

      if (checkIsFullscreen()) {
        onEntered();
      } else {
        setError('Fullscreen mode could not be activated. Please try again.');
      }
    } catch (err) {
      console.error('Fullscreen request failed:', err);
      setError('Fullscreen mode was blocked or denied by the browser. Click Retry to enter fullscreen.');
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-[720px] items-center justify-center p-6">
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-xl">
        <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)] uppercase">
          FULLSCREEN REQUIRED
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-[var(--text)]">
          {testTitle}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--muted2)]">
          This assessment must be conducted in full-screen mode. Exiting full-screen mode during the test will be logged as a security violation.
        </p>

        {typeof warningCount === 'number' && (
          <div className="mt-4 inline-block rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400">
            Warnings Left: {warningCount}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={onBack}
            className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted2)] hover:bg-white/5 transition"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleEnterFullscreen}
            className="rounded-xl bg-[var(--orange)] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
          >
            {error ? 'Retry Fullscreen' : 'Enter Fullscreen'}
          </button>
        </div>
      </div>
    </div>
  );
}