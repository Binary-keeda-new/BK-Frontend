'use client';

export default function ConsolePanel() {
  return (
    <div className="h-full overflow-y-auto bg-[var(--clr-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--clr-text)]">
          Console
        </h2>
      </div>

      <div className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm text-[var(--clr-text2)]">
        Run your code to see output here.
      </div>
    </div>
  );
}