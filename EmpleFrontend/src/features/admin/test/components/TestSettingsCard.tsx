'use client';

export type TestSettings = {
  blockKeyboard: boolean;
  allowVirtualKeyboard: boolean;
  allowCalculator: boolean;
  noExitScreen: boolean;
  ipBinding: boolean;
  noCopyPaste: boolean;
  noMinimize: boolean;
  noDevTools: boolean;
  noLostFocus: boolean;
  navigationMode: 'free' | 'sequential';
  minTimeBeforeSubmit: number;
  deadline: string;
  duration: number;
  passwordProtected: boolean;
  password: string;
};

type Props = {
  settings: TestSettings;
  onChange: (settings: TestSettings) => void;
};

const toggleItems: { key: keyof TestSettings; label: string }[] = [
  { key: 'blockKeyboard', label: 'Block Keyboard' },
  { key: 'allowVirtualKeyboard', label: 'Virtual Keyboard' },
  { key: 'allowCalculator', label: 'Calculator' },
  { key: 'noExitScreen', label: 'No Exit Screen' },
  { key: 'ipBinding', label: 'IP Binding' },
  { key: 'noCopyPaste', label: 'No Copy Paste' },
  { key: 'noMinimize', label: 'No Minimize' },
  { key: 'noDevTools', label: 'No Dev Tools' },
  { key: 'noLostFocus', label: 'No Lost Focus' },
];

export default function TestSettingsCard({ settings, onChange }: Props) {
  const update = <K extends keyof TestSettings>(
    key: K,
    value: TestSettings[K]
  ) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="mt-6 rounded-3xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[var(--clr-text)]">
          Test Settings
        </h2>
        <p className="mt-1 text-sm text-[var(--clr-text2)]">
          Configure security, navigation, timing and access controls.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {toggleItems.map((item) => (
          <label
            key={item.key}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-4 py-3"
          >
            <span className="text-sm font-medium text-[var(--clr-text)]">
              {item.label}
            </span>

            <input
              type="checkbox"
              checked={Boolean(settings[item.key])}
              onChange={(e) =>
                update(item.key, e.target.checked as never)
              }
              className="h-4 w-4"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Navigation
          </label>
          <select
            value={settings.navigationMode}
            onChange={(e) =>
              update('navigationMode', e.target.value as 'free' | 'sequential')
            }
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          >
            <option value="free">Free Navigation</option>
            <option value="sequential">Sequential Navigation</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Duration of Test
          </label>
          <input
            type="number"
            value={settings.duration}
            onChange={(e) => update('duration', Number(e.target.value))}
            placeholder="Duration in minutes"
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Min Time Before Submit
          </label>
          <input
            type="number"
            value={settings.minTimeBeforeSubmit}
            onChange={(e) =>
              update('minTimeBeforeSubmit', Number(e.target.value))
            }
            placeholder="Minutes"
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Date and Time Deadline
          </label>
          <input
            type="datetime-local"
            value={settings.deadline}
            onChange={(e) => update('deadline', e.target.value)}
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={settings.passwordProtected}
            onChange={(e) => update('passwordProtected', e.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm font-semibold text-[var(--clr-text)]">
            Password Protect
          </span>
        </label>

        {settings.passwordProtected && (
          <input
            type="text"
            value={settings.password}
            onChange={(e) => update('password', e.target.value)}
            placeholder="Enter test password"
            className="mt-4 w-full rounded-2xl bg-[var(--clr-bg)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        )}
      </div>
    </div>
  );
}