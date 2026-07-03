'use client';

interface Props {
  statement: string;
  setStatement: (value: string) => void;
  handleSaveStatement: () => void;
}

export default function ProblemStatementSection({
  statement,
  setStatement,
  handleSaveStatement,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Problem Statement
      </h2>

      <textarea
        value={statement}
        onChange={(e) =>
          setStatement(e.target.value)
        }
        rows={12}
        placeholder="Describe the coding problem..."
        className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3 outline-none resize-y"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSaveStatement}
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}