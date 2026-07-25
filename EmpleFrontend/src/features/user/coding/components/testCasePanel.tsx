'use client';

export default function TestCasePanel() {
  return (
    <div className="h-full border-t border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">

      <h2 className="mb-4 text-lg font-semibold">
        Test Cases
      </h2>

      <div className="rounded-xl border border-[var(--clr-border)] p-4">

        <p className="text-sm text-[var(--clr-text2)]">
          Input
        </p>

        <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-black/10 p-3">
nums = [2,7,11,15]
target = 9
        </pre>

      </div>

    </div>
  );
}