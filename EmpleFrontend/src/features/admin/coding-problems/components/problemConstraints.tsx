'use client';

interface Props {
  constraints: string[];
}

export default function ProblemConstraints({
  constraints,
}: Props) {
  if (constraints.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold">
        Constraints
      </h2>

      <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-6">
        <ul className="list-disc space-y-3 pl-6 leading-7">
          {constraints.map(
            (constraint, index) => (
              <li key={index}>
                {constraint}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}