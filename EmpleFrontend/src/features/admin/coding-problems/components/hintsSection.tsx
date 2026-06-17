'use client';

interface Props {
  hints: string[];

  setHints: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  handleSaveHints: () => void;
}

export default function HintsSection({
  hints,
  setHints,
  handleSaveHints,
}: Props) {
  const addHint = () => {
    setHints((prev) => [
      ...prev,
      '',
    ]);
  };

  const removeHint = (
    index: number
  ) => {
    setHints((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Hints
        </h2>

        <button
          onClick={addHint}
          className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white"
        >
          + Add Hint
        </button>
      </div>

      <div className="space-y-4">
        {hints.map(
          (hint, index) => (
            <div
              key={index}
              className="rounded-xl border border-[var(--clr-border)] p-4"
            >
              <div className="mb-3 flex justify-between">
                <span className="font-medium">
                  Hint {index + 1}
                </span>

                <button
                  onClick={() =>
                    removeHint(index)
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>

              <textarea
                rows={3}
                value={hint}
                onChange={(e) => {
                  const updated = [
                    ...hints,
                  ];

                  updated[index] =
                    e.target.value;

                  setHints(updated);
                }}
                className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
              />
            </div>
          )
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveHints}
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}