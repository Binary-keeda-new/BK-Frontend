'use client';

interface Props {
  constraints: string[];
  setConstraints: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  handleAddConstraint: () => void;
  handleRemoveConstraint: (
    index: number
  ) => void;
  handleSaveConstraints: () => void;
}

export default function ConstraintsSection({
  constraints,
  setConstraints,
  handleAddConstraint,
  handleRemoveConstraint,
  handleSaveConstraints,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Constraints
        </h2>

        <button
          onClick={handleAddConstraint}
          className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white"
        >
          + Add Constraint
        </button>
      </div>

      <div className="space-y-4">
        {constraints.map(
          (constraint, index) => (
            <div
              key={index}
              className="flex gap-3"
            >
              <input
                type="text"
                value={constraint}
                onChange={(e) => {
                  const updated = [
                    ...constraints,
                  ];

                  updated[index] =
                    e.target.value;

                  setConstraints(updated);
                }}
                placeholder="e.g. 1 <= n <= 10^5"
                className="flex-1 rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3 outline-none"
              />

              <button
                onClick={() =>
                  handleRemoveConstraint(
                    index
                  )
                }
                className="rounded-xl px-4 text-red-500"
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveConstraints}
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}