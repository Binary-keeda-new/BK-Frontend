interface Props {
  problem: any;
}

export default function WorkspaceHeader({
  problem,
}: Props) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--clr-border)] p-6">

      <div>

        <h1 className="text-2xl font-bold">
          {problem.title}
        </h1>

        <p className="mt-2 text-sm text-[var(--clr-text2)]">
          {problem.difficulty} •{' '}
          {problem.topics.join(', ')}
        </p>

      </div>

    </header>
  );
}