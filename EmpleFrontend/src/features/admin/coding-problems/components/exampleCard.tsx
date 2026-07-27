'use client';

interface Props {
  index: number;
  input: string;
  output: string;
  explanation?: string;
}

export default function ExampleCard({
  index,
  input,
  output,
  explanation,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-[var(--clr-text)]">
        Example {index}
      </h3>

      <div className="space-y-5">
        <div>
          <p className="mb-2 font-medium">Input</p>

          <pre className="overflow-x-auto rounded-xl bg-[var(--clr-surface2)] p-4 text-sm">
            <code>{input}</code>
          </pre>
        </div>

        <div>
          <p className="mb-2 font-medium">Output</p>

          <pre className="overflow-x-auto rounded-xl bg-[var(--clr-surface2)] p-4 text-sm">
            <code>{output}</code>
          </pre>
        </div>

        {explanation && (
          <div>
            <p className="mb-2 font-medium">
              Explanation
            </p>

            <div className="rounded-xl bg-[var(--clr-surface2)] p-4 leading-7">
              {explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}