'use client';

import { useState, useEffect } from 'react';

type Props = {
  violationType: string | null;
  warningsLeft: number;
  warningCount?: number;
  maxViolations?: number;
  onContinue: () => void;
  isForceSubmitted?: boolean;
  onForceSubmitAcknowledge?: () => void;
};

const messages: Record<string, { title: string; desc: string }> = {
  fullscreen_exit: {
    title: 'You exited Full Screen.',
    desc: 'The test must remain in Full Screen while you are attempting it.',
  },
  focus_lost: {
    title: 'Focus lost / Window switched.',
    desc: 'You moved away from the active test window. The test must remain active.',
  },
  tab_hidden: {
    title: 'Tab hidden or minimized.',
    desc: 'You switched tabs or minimized the test window.',
  },
  copy_attempt: {
    title: 'Copy action detected.',
    desc: 'Copying content is strictly not allowed during this assessment.',
  },
  paste_attempt: {
    title: 'Paste action detected.',
    desc: 'Pasting content is strictly not allowed during this assessment.',
  },
  cut_attempt: {
    title: 'Cut action detected.',
    desc: 'Cutting content is strictly not allowed during this assessment.',
  },
  devtools_detected: {
    title: 'Developer tools detected.',
    desc: 'Developer tools are not permitted during this assessment.',
  },
  blocked_keyboard_shortcut: {
    title: 'Restricted shortcut used.',
    desc: 'Blocked keyboard shortcuts are not allowed during this test.',
  },
  navigation_attempt: {
    title: 'Navigation attempt detected.',
    desc: 'Leaving the active test page is restricted.',
  },
  right_click_attempt: {
    title: 'Right click detected.',
    desc: 'Right-click is disabled for this assessment.',
  },
};

const checkIsFullscreen = () =>
  typeof document !== 'undefined' &&
  Boolean(
    document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
  );

export default function TestViolationModal({
  violationType,
  warningsLeft,
  onContinue,
  isForceSubmitted = false,
  onForceSubmitAcknowledge,
}: Props) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [fullscreenError, setFullscreenError] = useState<string | null>(null);
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    setAcknowledged(false);
    setFullscreenError(null);
    setSubmittingAction(false);
  }, [violationType]);

  if (!violationType && !isForceSubmitted) return null;

  const isFullscreenMissing = !checkIsFullscreen();
  const requiresFullscreenReturn = isFullscreenMissing || violationType === 'fullscreen_exit';

  const violationInfo = violationType
    ? messages[violationType] || {
        title: 'A test rule was violated.',
        desc: 'Please follow the examination rules.',
      }
    : { title: '', desc: '' };

  const handleAction = async () => {
    if (!acknowledged || submittingAction) return;
    setFullscreenError(null);
    setSubmittingAction(true);

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

      // Check if fullscreen successfully activated
      if (checkIsFullscreen() || !requiresFullscreenReturn) {
        setAcknowledged(false);
        onContinue();
      } else {
        setFullscreenError('Fullscreen mode was not granted by the browser. Please click again.');
      }
    } catch (err) {
      console.error('Fullscreen request failed:', err);
      setFullscreenError('Fullscreen mode was blocked by the browser. Click below to try again.');
    } finally {
      setSubmittingAction(false);
    }
  };

  if (isForceSubmitted || warningsLeft <= 0) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
        <div className="w-full max-w-md rounded-2xl border border-red-500/50 bg-[#161820] p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-3xl">
            🛑
          </div>

          <h2 className="mt-4 text-xl font-bold text-red-500">
            Test Automatically Submitted
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[var(--muted2,#8a8a9a)]">
            You have used all allowed warnings.
          </p>

          <div className="my-4 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-center text-sm font-bold text-red-400">
            Warnings Left: 0
          </div>

          <p className="text-xs text-[var(--muted2,#8a8a9a)]">
            Your saved answers have been preserved and the attempt is now closed.
          </p>

          <button
            type="button"
            onClick={onForceSubmitAcknowledge || onContinue}
            className="mt-5 w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 shadow-lg shadow-red-600/30"
          >
            Acknowledge & Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-500/40 bg-[#161820] p-6 shadow-2xl">
        {/* Title */}
        <div className="flex items-center gap-2.5 text-red-400">
          <span className="text-2xl">⚠</span>
          <h2 className="text-lg font-bold text-white tracking-wide">
            Test Rule Violation
          </h2>
        </div>

        {/* Reason Box */}
        <div className="mt-3.5 rounded-xl border border-red-500/25 bg-red-500/10 p-3.5">
          <p className="text-sm font-bold text-red-300">
            {violationInfo.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-red-200/80">
            {violationInfo.desc}
          </p>
        </div>

        {/* Warnings Left Badge */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl border border-[var(--border,#262936)] bg-[#1e2028] px-4 py-2.5">
          <span className="text-xs font-semibold text-[var(--muted2,#8a8a9a)]">
            Status
          </span>
          <span className="text-xs font-bold text-red-400">
            Warnings Left: {warningsLeft}
          </span>
        </div>

        {/* Separated Acknowledgement Area */}
        <div className="mt-5 border-t border-[var(--border,#262936)] pt-4">
          <label
            className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition"
            style={{
              borderColor: acknowledged ? 'var(--orange,#f15a22)' : 'var(--border,#262936)',
              background: acknowledged ? 'rgba(241,90,34,0.08)' : 'transparent',
            }}
          >
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[var(--orange,#f15a22)] cursor-pointer"
            />
            <span className="text-xs font-medium text-[var(--text,#f0f0f4)] select-none leading-relaxed">
              {requiresFullscreenReturn
                ? 'I understand this violation and agree to return to Full Screen.'
                : 'I understand this violation and agree to continue following the test rules.'}
            </span>
          </label>

          {fullscreenError && (
            <p className="mt-2 text-center text-xs font-semibold text-red-400">
              {fullscreenError}
            </p>
          )}

          {/* Action Button */}
          <button
            type="button"
            disabled={!acknowledged || submittingAction}
            onClick={handleAction}
            className="mt-4 w-full rounded-xl bg-[var(--orange,#f15a22)] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submittingAction
              ? 'Entering Full Screen...'
              : requiresFullscreenReturn
              ? 'I Understand & Return to Full Screen'
              : 'I Understand & Continue Test'}
          </button>
        </div>
      </div>
    </div>
  );
}