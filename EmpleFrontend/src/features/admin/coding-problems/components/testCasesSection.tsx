'use client';

interface TestCase {
  input: string;
  output: string;
}

interface Props {
  visibleTestCases: TestCase[];
  hiddenTestCases: TestCase[];

  setVisibleTestCases: React.Dispatch<
    React.SetStateAction<TestCase[]>
  >;

  setHiddenTestCases: React.Dispatch<
    React.SetStateAction<TestCase[]>
  >;

  handleSaveTestCases: () => void;
}

export default function TestCasesSection({
  visibleTestCases,
  hiddenTestCases,
  setVisibleTestCases,
  setHiddenTestCases,
  handleSaveTestCases,
}: Props) {
  const addVisibleTestCase = () => {
    setVisibleTestCases((prev) => [
      ...prev,
      {
        input: '',
        output: '',
      },
    ]);
  };

  const addHiddenTestCase = () => {
    setHiddenTestCases((prev) => [
      ...prev,
      {
        input: '',
        output: '',
      },
    ]);
  };

  const removeVisibleTestCase = (
    index: number
  ) => {
    setVisibleTestCases((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const removeHiddenTestCase = (
    index: number
  ) => {
    setHiddenTestCases((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-8">
      {/* Visible Test Cases */}

      <div className="rounded-2xl border border-[var(--clr-border)] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Visible Test Cases
          </h2>

          <button
            onClick={addVisibleTestCase}
            className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white"
          >
            + Add Test Case
          </button>
        </div>

        <div className="space-y-6">
          {visibleTestCases.map(
            (testCase, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--clr-border)] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">
                    Visible Test Case {index + 1}
                  </h3>

                  <button
                    onClick={() =>
                      removeVisibleTestCase(
                        index
                      )
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Input
                    </label>

                    <textarea
                      rows={4}
                      value={testCase.input}
                      onChange={(e) => {
                        const updated = [
                          ...visibleTestCases,
                        ];

                        updated[index].input =
                          e.target.value;

                        setVisibleTestCases(
                          updated
                        );
                      }}
                      className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Output
                    </label>

                    <textarea
                      rows={4}
                      value={testCase.output}
                      onChange={(e) => {
                        const updated = [
                          ...visibleTestCases,
                        ];

                        updated[index].output =
                          e.target.value;

                        setVisibleTestCases(
                          updated
                        );
                      }}
                      className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Hidden Test Cases */}

      <div className="rounded-2xl border border-[var(--clr-border)] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Hidden Test Cases
          </h2>

          <button
            onClick={addHiddenTestCase}
            className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white"
          >
            + Add Hidden Test Case
          </button>
        </div>

        <div className="space-y-6">
          {hiddenTestCases.map(
            (testCase, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--clr-border)] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">
                    Hidden Test Case {index + 1}
                  </h3>

                  <button
                    onClick={() =>
                      removeHiddenTestCase(
                        index
                      )
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Input
                    </label>

                    <textarea
                      rows={4}
                      value={testCase.input}
                      onChange={(e) => {
                        const updated = [
                          ...hiddenTestCases,
                        ];

                        updated[index].input =
                          e.target.value;

                        setHiddenTestCases(
                          updated
                        );
                      }}
                      className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Output
                    </label>

                    <textarea
                      rows={4}
                      value={testCase.output}
                      onChange={(e) => {
                        const updated = [
                          ...hiddenTestCases,
                        ];

                        updated[index].output =
                          e.target.value;

                        setHiddenTestCases(
                          updated
                        );
                      }}
                      className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveTestCases}
            className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}