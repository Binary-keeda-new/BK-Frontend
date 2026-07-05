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
  return (
    <div className="h-full overflow-y-auto bg-[var(--clr-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--clr-text)]">Console</h2>

        {(running || submitting) && (
          <span className="text-xs text-[var(--clr-text2)]">
            {running ? 'Running...' : 'Submitting...'}
          </span>
        )}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      ) : !result ? (
        <div className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm text-[var(--clr-text2)]">
          Run your code to see output here.
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm text-[var(--clr-text)]">
            Passed {result.passedCount} / {result.totalCount}
            {typeof result.accepted === 'boolean' && (
              <span className="ml-2 font-bold">
                {result.accepted ? 'Accepted' : 'Not Accepted'}
              </span>
            )}
          </div>

          {result.results.map((item, index) => (
            <div
              key={`${item.input}-${index}`}
              className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm"
            >
              <p className={item.passed ? 'text-emerald-400' : 'text-red-400'}>
                Test Case {index + 1}: {item.passed ? 'Passed' : 'Failed'}
              </p>

              <div className="mt-3 grid gap-2 text-xs text-[var(--clr-text2)]">
                <p>
                  <span className="font-semibold text-[var(--clr-text)]">
                    Input:
                  </span>{' '}
                  {item.input || '-'}
                </p>

                <p>
                  <span className="font-semibold text-[var(--clr-text)]">
                    Expected:
                  </span>{' '}
                  {item.expectedOutput || '-'}
                </p>

                <p>
                  <span className="font-semibold text-[var(--clr-text)]">
                    Output:
                  </span>{' '}
                  {item.actualOutput || '-'}
                </p>

                {item.stderr && (
                  <p className="text-red-300">
                    <span className="font-semibold">Error:</span> {item.stderr}
                  </p>
                )}

                {item.compileOutput && (
                  <p className="text-red-300">
                    <span className="font-semibold">Compile:</span>{' '}
                    {item.compileOutput}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}