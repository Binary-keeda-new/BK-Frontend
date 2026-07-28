'use client';

import { UserTest } from '../types/test.types';

type Props = {
  test: UserTest;
  agreed: boolean;
  onAgreeChange: (value: boolean) => void;
  onBack: () => void;
  onPreview: () => void;
};

const buildRules = (test: UserTest) => {
  const rules: { title: string; desc: string }[] = [];

  rules.push({
    title: 'General Conduct & Preparation',
    desc: 'Read all instructions carefully before starting the assessment. Ensure you have a stable internet connection and a quiet environment. Do not refresh or close the tab during the test, as it may result in an automatic submission.',
  });

  if (test.settings?.duration) {
    rules.push({
      title: 'Time Management',
      desc: `The total allocated duration for this assessment is ${test.settings.duration} minutes. Keep an eye on the countdown timer visible at the top of your screen, as the test will automatically submit when the time expires.`,
    });
  }

  if (test.settings?.navigationMode === 'sequential') {
    rules.push({
      title: 'Sequential Navigation',
      desc: 'You are required to complete the sections strictly in the order they are presented. You will not be able to skip ahead to future sections or return to previous sections once submitted.',
    });
  }

  if (test.settings?.navigationMode === 'free') {
    rules.push({
      title: 'Free Navigation',
      desc: 'You have the freedom to attempt the available sections in any order. You can easily switch back and forth between different sections and review your answers before final submission.',
    });
  }

  if (test.settings?.minTimeBeforeSubmit) {
    rules.push({
      title: 'Early Submission Restriction',
      desc: `To ensure adequate time is spent, the final submit button will remain locked for the first ${test.settings.minTimeBeforeSubmit} minute(s) of the assessment.`,
    });
  }

  if (test.settings?.passwordProtected) {
    rules.push({
      title: 'Password Authorization',
      desc: 'This assessment is securely password-protected. Ensure you have the correct access credentials provided by your instructor before attempting to proceed.',
    });
  }

  if (test.settings?.noExitScreen) {
    rules.push({
      title: 'Fullscreen Enforcement',
      desc: 'You are required to remain in fullscreen mode for the entire duration of the test. Any attempt to exit fullscreen may be flagged as a violation by the proctoring system.',
    });
  }

  if (test.settings?.noCopyPaste) {
    rules.push({
      title: 'Clipboard Restrictions',
      desc: 'Copying, pasting, and cutting text are strictly disabled within the assessment window to maintain the integrity of the test. All answers must be typed manually.',
    });
  }

  if (test.settings?.blockKeyboard) {
    rules.push({
      title: 'Keyboard Shortcuts Blocked',
      desc: 'Certain restricted keyboard shortcuts (like Alt+Tab, Ctrl+C, etc.) have been disabled. Please rely solely on the provided on-screen navigation buttons.',
    });
  }

  if (test.settings?.noLostFocus) {
    rules.push({
      title: 'Window Focus Tracking',
      desc: 'The system actively monitors your window activity. Switching away from the active test window to other applications or browsers will be recorded and flagged for review.',
    });
  }

  if (test.settings?.noMinimize) {
    rules.push({
      title: 'Tab & Application Monitoring',
      desc: 'Minimizing the browser window, opening new tabs, or hiding the assessment screen is strictly prohibited and will be recorded as suspicious activity.',
    });
  }

  if (test.settings?.noDevTools) {
    rules.push({
      title: 'Developer Tools Blocked',
      desc: 'Accessing browser developer tools (Inspect Element, Console, etc.) is not allowed. Attempting to open these tools may result in immediate termination of the test.',
    });
  }

  if (test.settings?.allowCalculator) {
    rules.push({
      title: 'Calculator Permitted',
      desc: 'An on-screen calculator is enabled for this assessment. You may use it for complex calculations where necessary.',
    });
  }

  if (test.settings?.allowVirtualKeyboard) {
    rules.push({
      title: 'Virtual Keyboard Available',
      desc: 'A virtual keyboard is provided for supported input fields to assist with typing complex characters or symbols.',
    });
  }

  if (test.settings?.ipBinding) {
    rules.push({
      title: 'IP Address Binding',
      desc: 'Your current IP address is being recorded. This attempt is securely bound to your current network to prevent unauthorized access from other locations.',
    });
  }

  return rules;
};

export default function TestInstructionsView({
  test,
  agreed,
  onAgreeChange,
  onBack,
  onPreview,
}: Props) {
  const rules = buildRules(test);

  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
      <button
        onClick={onBack}
        className="mb-4 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted2)] transition hover:bg-white/5 hover:text-white"
      >
        Back to Tests
      </button>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[var(--text)] md:text-3xl">
            {test.title}
          </h1>

          {test.description && (
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--muted2)]">
              {test.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold text-[var(--muted2)]">
            <span className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2,#1e2028)] px-4 py-2 shadow-sm">
              <svg className="h-4 w-4 text-[var(--orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {test.totalSections} Sections
            </span>

            <span className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2,#1e2028)] px-4 py-2 shadow-sm">
              <svg className="h-4 w-4 text-[var(--orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {test.totalDuration} Minutes
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2,#1e2028)] p-5 md:p-8 shadow-inner">
          <p className="mb-6 text-sm font-bold tracking-[0.08em] text-[var(--orange)] uppercase">
            Official Guidelines & Instructions
          </p>

          <ul className="m-0 flex flex-col gap-4 md:gap-5">
            {rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 md:gap-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--orange)] text-xs font-bold text-white shadow-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-[var(--text)]">
                    {rule.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted2)]">
                    {rule.desc}
                  </p>
                </div>
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

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onBack}
            className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted2)]"
          >
            Cancel
          </button>

          <button
            disabled={!agreed}
            onClick={onPreview}
            className="rounded-xl px-5 py-3 text-sm font-bold"
            style={{
              background: agreed ? 'var(--orange)' : 'transparent',
              border: `1px solid ${agreed ? 'var(--orange)' : 'var(--border)'}`,
              color: agreed ? '#fff' : 'var(--muted)',
              cursor: agreed ? 'pointer' : 'not-allowed',
              opacity: agreed ? 1 : 0.5,
            }}
          >
            Preview Test
          </button>
        </div>
      </div>
    </div>
  );
}