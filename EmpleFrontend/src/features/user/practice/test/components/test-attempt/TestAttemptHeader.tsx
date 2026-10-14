'use client';

type Props = {
  sectionIndex: number;
  current: number;
  totalQuestions: number;
  answeredCount: number;
  formattedTimeLeft: string | null;
  timeLeftMs: number | null;
  warningsLeft?: number;
  securityWarnings?: number;
  submitting: boolean;
  loading: boolean;
  canSubmit: boolean;
  onBackToSections: () => void;
  onOpenQuestions: () => void;
  onSubmit: () => void;
  allowCalculator?: boolean;
  onOpenCalculator?: () => void;
  allowVirtualKeyboard?: boolean;
  onOpenVirtualKeyboard?: () => void;
};

export default function TestAttemptHeader({
  sectionIndex,
  current,
  totalQuestions,
  answeredCount,
  formattedTimeLeft,
  timeLeftMs,
  warningsLeft,
  securityWarnings = 0,
  submitting,
  loading,
  canSubmit,
  onBackToSections,
  onOpenQuestions,
  onSubmit,
  allowCalculator = false,
  onOpenCalculator,
  allowVirtualKeyboard = false,
  onOpenVirtualKeyboard,
}: Props) {
  const effectiveWarningsLeft = typeof warningsLeft === 'number' ? warningsLeft : undefined;

  return (
    <header className="h-14 shrink-0 border-b border-[var(--border,#262936)] bg-[var(--surface,#161820)] px-4 md:px-6 flex items-center justify-between z-20">
      {/* Left: Section & Question Progress */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onBackToSections}
          className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-xs font-semibold text-[var(--muted2,#8a8a9a)] hover:text-white transition"
        >
          ← Sections
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-bold text-[var(--orange,#f15a22)] uppercase tracking-wider">
            Sec {sectionIndex + 1}
          </span>
          <span className="text-xs text-[var(--muted2,#8a8a9a)]">|</span>
          <span className="text-sm font-semibold text-[var(--text,#f0f0f4)] truncate">
            Question {current + 1} of {totalQuestions}
          </span>
        </div>

        <span className="hidden lg:inline-block text-xs text-[var(--muted2,#8a8a9a)]">
          ({answeredCount} answered · {totalQuestions - answeredCount} left)
        </span>
      </div>

      {/* Right: Timer, Warnings, Tools, Submit */}
      <div className="flex items-center gap-2.5">
        {/* Active Timer */}
        {formattedTimeLeft && (
          <div
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs md:text-sm font-bold tracking-wider ${
              timeLeftMs !== null && timeLeftMs < 60000
                ? 'border-red-500/50 bg-red-500/15 text-red-400 animate-pulse'
                : 'border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] text-[var(--text,#f0f0f4)]'
            }`}
          >
            <span>⏱</span>
            <span>{formattedTimeLeft}</span>
          </div>
        )}

        {/* Warnings Left Badge */}
        {typeof effectiveWarningsLeft === 'number' ? (
          <div
            className={`rounded-lg border px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${
              effectiveWarningsLeft <= 1
                ? 'border-red-500/50 bg-red-500/20 text-red-400'
                : effectiveWarningsLeft <= 2
                ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                : 'border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] text-[var(--text,#f0f0f4)]'
            }`}
          >
            Warnings Left: {effectiveWarningsLeft}
          </div>
        ) : securityWarnings ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-400">
            Warnings: {securityWarnings}
          </div>
        ) : null}

        {/* Optional Tools */}
        {allowCalculator && (
          <button
            type="button"
            onClick={onOpenCalculator}
            className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-xs font-medium text-[var(--text,#f0f0f4)] hover:bg-white/5 transition"
          >
            🧮 Calc
          </button>
        )}

        {allowVirtualKeyboard && (
          <button
            type="button"
            onClick={onOpenVirtualKeyboard}
            className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-xs font-medium text-[var(--text,#f0f0f4)] hover:bg-white/5 transition"
          >
            ⌨ Keyboard
          </button>
        )}

        {/* Mobile Questions Palette Toggle */}
        <button
          type="button"
          onClick={onOpenQuestions}
          className="rounded-lg border border-[var(--border,#262936)] bg-[var(--surface2,#1e2028)] px-2.5 py-1 text-xs font-semibold text-[var(--text,#f0f0f4)] md:hidden"
        >
          Questions ({answeredCount}/{totalQuestions})
        </button>
      </div>
    </header>
  );
}
