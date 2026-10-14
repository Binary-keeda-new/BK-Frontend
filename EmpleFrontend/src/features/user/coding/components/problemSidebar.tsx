'use client';

interface Props {
  problem: any;
}

export default function ProblemSidebar({ problem }: Props) {
  const examples = Array.isArray(problem?.examples) && problem.examples.length > 0
    ? problem.examples
    : Array.isArray(problem?.sampleTestCases) && problem.sampleTestCases.length > 0
    ? problem.sampleTestCases
    : Array.isArray(problem?.visibleTestCases)
    ? problem.visibleTestCases.filter((tc: any) => !tc.isHidden)
    : [];

  const constraints = Array.isArray(problem?.constraints) ? problem.constraints : [];

  return (
    <aside className="h-full overflow-y-auto bg-[var(--clr-background)] p-4">
      <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
          Coding Problem
        </p>

        <h1 className="mt-2 text-xl font-extrabold text-[var(--clr-text)]">
          {problem.title || 'Untitled Problem'}
        </h1>
      </div>

      <div className="mt-4 space-y-4">
        <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
            Description
          </h2>

          <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--clr-text2)]">
            {problem.statement || 'No description provided.'}
          </p>
        </section>

        {examples.length > 0 && (
          <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
              Sample Examples
            </h2>

            <div className="space-y-3">
              {examples.map((example: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm"
                >
                  <p className="mb-2 text-xs font-bold text-[var(--clr-text)]">
                    Example {index + 1}
                  </p>

                  <div className="space-y-2 text-xs text-[var(--clr-text2)]">
                    <p>
                      <span className="font-semibold text-[var(--clr-text)]">
                        Input:
                      </span>{' '}
                      <code className="font-mono">{example.input || example.sampleInput || '(empty)'}</code>
                    </p>

                    <p>
                      <span className="font-semibold text-[var(--clr-text)]">
                        Output:
                      </span>{' '}
                      <code className="font-mono">{example.output || example.expectedOutput || example.expected_output || '-'}</code>
                    </p>

                    {example.explanation ? (
                      <p>
                        <span className="font-semibold text-[var(--clr-text)]">
                          Explanation:
                        </span>{' '}
                        {example.explanation}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {constraints.length > 0 && (
          <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
              Constraints
            </h2>

            <ul className="space-y-2">
              {constraints.map((constraint: string, idx: number) => (
                <li
                  key={`${constraint}-${idx}`}
                  className="rounded-lg bg-[var(--clr-surface2)] px-3 py-2 font-mono text-xs text-[var(--clr-text2)]"
                >
                  {constraint}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </aside>
  );
}