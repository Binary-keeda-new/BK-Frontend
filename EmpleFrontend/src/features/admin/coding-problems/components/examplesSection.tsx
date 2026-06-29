'use client';

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface Props {
  examples: Example[];
  setExamples: React.Dispatch<
    React.SetStateAction<Example[]>
  >;
  handleAddExample: () => void;
  handleRemoveExample: (
    index: number
  ) => void;
  handleSaveExamples: () => void;
}

export default function ExamplesSection({
  examples,
  setExamples,
  handleAddExample,
  handleRemoveExample,
  handleSaveExamples,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Examples
        </h2>

        <button
          onClick={handleAddExample}
          className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white"
        >
          + Add Example
        </button>
      </div>

      <div className="space-y-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="rounded-xl border border-[var(--clr-border)] p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">
                Example {index + 1}
              </h3>

              <button
                onClick={() =>
                  handleRemoveExample(index)
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                rows={3}
                placeholder="Input"
                value={example.input}
                onChange={(e) => {
                  const updated = [
                    ...examples,
                  ];
                  updated[index].input =
                    e.target.value;
                  setExamples(updated);
                }}
                className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
              />

              <textarea
                rows={3}
                placeholder="Output"
                value={example.output}
                onChange={(e) => {
                  const updated = [
                    ...examples,
                  ];
                  updated[index].output =
                    e.target.value;
                  setExamples(updated);
                }}
                className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
              />

              <textarea
                rows={4}
                placeholder="Explanation"
                value={example.explanation}
                onChange={(e) => {
                  const updated = [
                    ...examples,
                  ];
                  updated[index].explanation =
                    e.target.value;
                  setExamples(updated);
                }}
                className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveExamples}
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}