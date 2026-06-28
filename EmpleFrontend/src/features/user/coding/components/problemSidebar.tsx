interface Props {
  problem: any;
}

export default function ProblemSidebar({
  problem,
}: Props) {
  return (
    <div className="space-y-10 p-8">

      <section>

        <h2 className="mb-4 text-2xl font-bold">
          Description
        </h2>

        <p>{problem.statement}</p>

      </section>

      <section>

        <h2 className="mb-4 text-2xl font-bold">
          Constraints
        </h2>

        <ul className="list-disc space-y-2 pl-6">

          {problem.constraints.map(
            (constraint: string) => (
              <li key={constraint}>
                {constraint}
              </li>
            )
          )}

        </ul>

      </section>

    </div>
  );
}