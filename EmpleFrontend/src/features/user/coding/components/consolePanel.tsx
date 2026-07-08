'use client';

import type { ExecutionResponseData } from '../services/executionService';

type Props = {
  running: boolean;
  submitting: boolean;
  result: ExecutionResponseData | null;
  error: string;
};

export default function ConsolePanel({
  running,
  submitting,
  result,
  error,
}: Props) {
  const isBusy = running || submitting;

  return (
    <div className="h-full overflow-y-auto bg-[var(--clr-background)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[var(--clr-text)]">
            Execution Console
          </h2>
          <p className="text-xs text-[var(--clr-text3)]">
            Run visible cases or submit against all cases.
          </p>
        </div>

        {isBusy && (
          <span className="rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-1 text-xs font-semibold text-[var(--clr-text2)]">
            {running ? 'Running...' : 'Submitting...'}
          </span>
        )}
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      ) : !result ? (
        <div className="flex h-[calc(100%-3rem)] items-center justify-center rounded-2xl border border-dashed border-[var(--clr-border)] bg-[var(--clr-surface)] p-6 text-center">
          <div>
            <p className="text-sm font-bold text-[var(--clr-text)]">
              No execution yet
            </p>
            <p className="mt-1 text-xs text-[var(--clr-text3)]">
              Click Run to test sample cases or Submit to evaluate your final solution.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
                Summary
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--clr-text)]">
                Passed {result.passedCount} of {result.totalCount} test cases
              </p>
            </div>

            {typeof result.accepted === 'boolean' && (
              <span
                className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
                  result.accepted
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}
              >
                {result.accepted ? 'Accepted' : 'Not Accepted'}
              </span>
            )}
          </div>

          <div className="grid gap-3">
            {result.results.map((item, index) => (
              <div
                key={`${item.input}-${index}`}
                className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-[var(--clr-text)]">
                    Test Case {index + 1}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.passed
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {item.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>

                <div className="grid gap-2 text-xs text-[var(--clr-text2)]">
                  <ConsoleRow label="Input" value={item.input || '-'} />
                  <ConsoleRow label="Expected" value={item.expectedOutput || '-'} />
                  <ConsoleRow label="Output" value={item.actualOutput || '-'} />

                  {item.status?.description && (
                    <ConsoleRow label="Status" value={item.status.description} />
                  )}

                  {item.time && <ConsoleRow label="Time" value={`${item.time}s`} />}

                  {item.memory ? (
                    <ConsoleRow label="Memory" value={`${item.memory} KB`} />
                  ) : null}

                  {item.stderr && (
                    <ConsoleRow label="Error" value={item.stderr} danger />
                  )}

                  {item.compileOutput && (
                    <ConsoleRow label="Compile" value={item.compileOutput} danger />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ConsoleRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl bg-[var(--clr-surface2)] px-3 py-2">
      <span className="font-semibold text-[var(--clr-text)]">{label}:</span>{' '}
      <span className={danger ? 'text-red-300' : ''}>{value}</span>
    </div>
  );
}