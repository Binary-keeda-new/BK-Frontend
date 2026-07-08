'use client';

import { useState } from 'react';

interface Props {
  problem: any;
}

export default function ProblemSidebar({ problem }: Props) {
  const [activeTab, setActiveTab] = useState<
    'description' | 'editorial' | 'hints'
  >('description');

  return (
    <aside className="h-full overflow-y-auto bg-[var(--clr-background)] p-4">
      <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {problem.recommendedTime ? (
           <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
  ⏱ {problem.recommendedTime} min
</span>
          ) : null}

          <span className="rounded-full border border-[var(--clr-border)] px-3 py-1 text-xs font-semibold text-[var(--clr-text2)]">
            Coding Problem
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-[var(--clr-text)]">
          {problem.title}
        </h1>

        {problem.topics?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {problem.topics.map((topic: string) => (
              <span
                key={topic}
                className="rounded-full bg-[var(--clr-accent3)] px-3 py-1 text-xs font-semibold text-[var(--clr-accent)]"
              >
                {topic}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-1">
        {[
          ['description', 'Description'],
          ['editorial', 'Editorial'],
          ['hints', 'Hints'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() =>
              setActiveTab(
                key as 'description' | 'editorial' | 'hints'
              )
            }
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              activeTab === key
                ? 'bg-[var(--clr-accent)] text-white'
                : 'text-[var(--clr-text2)] hover:bg-[var(--clr-surface2)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {activeTab === 'description' && (
          <>
            <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
                Problem Statement
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
                  {problem.examples.map(
                    (example: any, index: number) => (
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
                            {example.input}
                          </p>

                          <p>
                            <span className="font-semibold text-[var(--clr-text)]">
                              Output:
                            </span>{' '}
                            {example.output}
                          </p>

                          {example.explanation && (
                            <p>
                              <span className="font-semibold text-[var(--clr-text)]">
                                Explanation:
                              </span>{' '}
                              {example.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            ) : null}

            {problem.constraints?.length ? (
              <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
                  Constraints
                </h2>

                <ul className="space-y-2">
                  {problem.constraints.map(
                    (constraint: string) => (
                      <li
                        key={constraint}
                        className="rounded-lg bg-[var(--clr-surface2)] px-3 py-2 font-mono text-xs text-[var(--clr-text2)]"
                      >
                        {constraint}
                      </li>
                    )
                  )}
                </ul>
              </section>
            ) : null}
          </>
        )}

        {activeTab === 'editorial' && (
          <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
              Editorial
            </h2>

            <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--clr-text2)]">
              {problem.editorial ||
                'Editorial is not available for this problem.'}
            </p>
          </section>
        )}

        {activeTab === 'hints' && (
          <section className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
              Hints
            </h2>

            {problem.hints?.length ? (
              <div className="space-y-2">
                {problem.hints.map(
                  (hint: string, index: number) => (
                    <details
                      key={index}
                      className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-3"
                    >
                      <summary className="cursor-pointer text-sm font-semibold text-[var(--clr-text)]">
                        Hint {index + 1}
                      </summary>

                      <p className="mt-2 text-sm text-[var(--clr-text2)]">
                        {hint}
                      </p>
                    </details>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm text-[var(--clr-text2)]">
                No hints available.
              </p>
            )}
          </section>
        )}
      </div>
    </aside>
  );
}