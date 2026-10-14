'use client';

import { UserTest } from '../types/test.types';

type Props = {
  test: UserTest;
  agreed: boolean;
  onAgreeChange: (value: boolean) => void;
  onBack: () => void;
  onPreview: () => void;
};

export default function TestInstructionsView({
  test,
  agreed,
  onAgreeChange,
  onBack,
  onPreview,
}: Props) {
  const warningLimit = test.settings?.maxSecurityViolations ?? 5;
  const duration = test.settings?.duration || test.totalDuration || 60;

  const handleStart = async () => {
    if (!agreed) return;
    try {
      const elem = document.documentElement as any;
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
      }
    } catch (err) {
      console.warn('Initial fullscreen request:', err);
    }
    onPreview();
  };

  return (
    <div className="flex h-full w-full min-h-[calc(100dvh-6rem)] items-center justify-center p-3 md:p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--border,#262936)] bg-[var(--surface,#161820)] p-5 md:p-6 shadow-2xl flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border,#262936)] pb-3">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[var(--orange,#f15a22)] uppercase">
              Assessment Instructions
            </p>
            <h1 className="mt-0.5 text-lg md:text-xl font-bold text-[var(--text,#f0f0f4)]">
              {test.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-xs font-semibold text-[var(--muted2,#8a8a9a)]">
              {test.totalSections || (test.sections?.length ?? 1)} Sec
            </span>
            <span className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-xs font-semibold text-[var(--muted2,#8a8a9a)]">
              {duration} Mins
            </span>
            <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400">
              {warningLimit} Warnings
            </span>
          </div>
        </div>

        {/* Instructions Body */}
        <div className="my-3 space-y-2.5">
          <p className="text-xs font-bold tracking-wide text-[var(--text,#f0f0f4)] uppercase">
            Before you begin
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs leading-relaxed text-[var(--muted2,#8a8a9a)]">
            <div className="flex items-start gap-2 rounded-xl border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)]/60 p-2.5">
              <span className="text-[var(--orange,#f15a22)] font-bold">1.</span>
              <span><strong>Full Screen:</strong> Stay in full screen during test. Exiting deducts a warning.</span>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)]/60 p-2.5">
              <span className="text-[var(--orange,#f15a22)] font-bold">2.</span>
              <span><strong>No Tab Switching:</strong> Do not switch tabs, minimize, or leave window.</span>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)]/60 p-2.5">
              <span className="text-[var(--orange,#f15a22)] font-bold">3.</span>
              <span><strong>Clipboard:</strong> Copy, cut, and paste are strictly blocked.</span>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)]/60 p-2.5">
              <span className="text-[var(--orange,#f15a22)] font-bold">4.</span>
              <span><strong>Autosave & Resume:</strong> Progress is saved. Network drops can be resumed.</span>
            </div>
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            <strong>Warning Policy:</strong> You have <strong>{warningLimit} Warnings Allowed</strong>. The test will automatically submit when <strong>Warnings Left reaches 0</strong>.
          </div>
        </div>

        {/* Agreement and Buttons */}
        <div className="border-t border-[var(--border,#262936)] pt-3">
          <label
            className="flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 transition"
            style={{
              borderColor: agreed ? 'var(--orange,#f15a22)' : 'var(--border,#262936)',
              background: agreed ? 'rgba(241,90,34,0.08)' : 'transparent',
            }}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => onAgreeChange(e.target.checked)}
              className="h-4 w-4 shrink-0 rounded accent-[var(--orange,#f15a22)]"
            />
            <span className="text-xs md:text-sm font-medium text-[var(--text,#f0f0f4)] select-none">
              I have read and understood the instructions and agree to follow the test rules.
            </span>
          </label>

          <div className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-[var(--border,#262936)] px-4 py-2 text-xs md:text-sm font-semibold text-[var(--muted2,#8a8a9a)] hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!agreed}
              onClick={handleStart}
              className="rounded-xl bg-[var(--orange,#f15a22)] px-6 py-2 text-xs md:text-sm font-bold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40 hover:opacity-95"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}