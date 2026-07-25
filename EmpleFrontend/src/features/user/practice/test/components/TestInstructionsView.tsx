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
  const rules: string[] = [];

  rules.push('Read all instructions carefully before starting.');
  rules.push('Do not refresh or close the tab during the test.');

  if (test.settings?.duration) {
    rules.push(`Total test duration is ${test.settings.duration} minutes.`);
  }

  if (test.settings?.navigationMode === 'sequential') {
    rules.push('Sections must be completed in sequence.');
  }

  if (test.settings?.navigationMode === 'free') {
    rules.push('Available sections may be attempted in any order.');
  }

  if (test.settings?.minTimeBeforeSubmit) {
    rules.push(
      `Submit button will be enabled after ${test.settings.minTimeBeforeSubmit} minute(s).`
    );
  }

  if (test.settings?.passwordProtected) {
    rules.push('This test is password protected.');
  }

  if (test.settings?.noExitScreen) {
    rules.push('Fullscreen mode is required during this test.');
  }

  if (test.settings?.noCopyPaste) {
    rules.push('Copy, paste, and cut actions are not allowed.');
  }

  if (test.settings?.blockKeyboard) {
    rules.push('Restricted keyboard shortcuts may be blocked.');
  }

  if (test.settings?.noLostFocus) {
    rules.push('Switching away from the test window may be recorded.');
  }

  if (test.settings?.noMinimize) {
    rules.push('Minimizing, hiding, or switching tabs may be recorded.');
  }

  if (test.settings?.noDevTools) {
    rules.push('Developer tools are not allowed during this test.');
  }

  if (test.settings?.allowCalculator) {
    rules.push('Calculator is allowed for this test.');
  }

  if (test.settings?.allowVirtualKeyboard) {
    rules.push('Virtual keyboard is allowed for supported input questions.');
  }

  if (test.settings?.ipBinding) {
    rules.push('This attempt may be restricted to the current IP address.');
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
    <div className="mx-auto w-full max-w-[760px] p-6">
      <button
        onClick={onBack}
        className="mb-5 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted2)]"
      >
        Back to Tests
      </button>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[var(--text)]">
            {test.title}
          </h1>

          {test.description && (
            <p className="mt-2 text-sm leading-6 text-[var(--muted2)]">
              {test.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted2)]">
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {test.totalSections} Sections
            </span>

            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {test.totalDuration} Minutes
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2,#1e2028)] p-5">
          <p className="mb-3 text-xs font-semibold tracking-[0.06em] text-[var(--orange)]">
            TEST RULES
          </p>

          <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
            {rules.map((rule) => (
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