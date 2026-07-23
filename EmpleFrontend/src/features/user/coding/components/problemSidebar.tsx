'use client';

interface Props {
  problem: any;
}

export default function ProblemSidebar({ problem }: Props) {
  return (
    <aside className="h-full overflow-y-auto bg-[var(--clr-background)] p-4">
      <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
          Coding Problem
        </p>

        <h1 className="mt-2 text-2xl font-extrabold text-[var(--clr-text)]">
          {problem.title}
        </h1>
      </div>

      <div className="mt-4 space-y-4">
        <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
            Description
          </h2>

          <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--clr-text2)]">
            {problem.statement}
          </p>
        </section>

        {problem.examples?.length ? (
          <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
              Examples
            </h2>

            <div className="space-y-3">
              {problem.examples.map((example: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm"
                >
                  <p className="mb-2 font-bold text-[var(--clr-text)]">
                    Example {index + 1}
                  </p>

                  <div className="space-y-2 text-xs text-[var(--clr-text2)]">
                    <p>
                      <span className="font-semibold text-[var(--clr-text)]">
                        Input:
                      </span>{' '}
                      {example.input || '-'}
                    </p>

                    <p>
                      <span className="font-semibold text-[var(--clr-text)]">
                        Output:
                      </span>{' '}
                      {example.output || '-'}
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
        ) : null}

        {problem.constraints?.length ? (
          <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
              Constraints
            </h2>

            <ul className="space-y-2">
              {problem.constraints.map((constraint: string) => (
                <li
                  key={constraint}
                  className="rounded-lg bg-[var(--clr-surface2)] px-3 py-2 font-mono text-xs text-[var(--clr-text2)]"
                >
                  {constraint}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/*
          Editorial and hints are intentionally hidden for now.

          {problem.editorial && (...)}
          {problem.hints?.length && (...)}
        */}
      </div>
    </aside>
  );
}