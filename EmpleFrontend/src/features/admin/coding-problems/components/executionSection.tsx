'use client';

interface Parameter {
  name: string;
  type: string;
}

interface ExecutionConfig {
  functionName: string;
  returnType: string;
  parameters: Parameter[];
  timeLimit: number;
  memoryLimit: number;
}

interface Props {
  executionConfig: ExecutionConfig;
  setExecutionConfig: React.Dispatch<
    React.SetStateAction<ExecutionConfig>
  >;
  handleSaveExecution: () => void;
}

export default function ExecutionSection({
  executionConfig,
  setExecutionConfig,
  handleSaveExecution,
}: Props) {
  const addParameter = () => {
    setExecutionConfig((prev) => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        {
          name: '',
          type: '',
        },
      ],
    }));
  };

  const removeParameter = (index: number) => {
    setExecutionConfig((prev) => ({
      ...prev,
      parameters: prev.parameters.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateParameter = (
    index: number,
    field: 'name' | 'type',
    value: string
  ) => {
    setExecutionConfig((prev) => {
      const updated = [...prev.parameters];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        parameters: updated,
      };
    });
  };

  return (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-8">

      <h2 className="mb-2 text-2xl font-bold">
        Execution Configuration
      </h2>

      <p className="mb-8 text-[var(--clr-text2)]">
        Configure how the solution will be executed by the coding engine.
      </p>

      {/* Function Name */}

      <div className="mb-6">

        <label className="mb-2 block font-medium">
          Function Name
        </label>

        <input
          value={executionConfig.functionName}
          onChange={(e) =>
            setExecutionConfig((prev) => ({
              ...prev,
              functionName: e.target.value,
            }))
          }
          placeholder="twoSum"
          className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-3 outline-none"
        />

      </div>

      {/* Return Type */}

      <div className="mb-8">

        <label className="mb-2 block font-medium">
          Return Type
        </label>

        <input
          value={executionConfig.returnType}
          onChange={(e) =>
            setExecutionConfig((prev) => ({
              ...prev,
              returnType: e.target.value,
            }))
          }
          placeholder="int[]"
          className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-3 outline-none"
        />

      </div>

      {/* Parameters */}

      <div className="mb-8">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-lg font-semibold">
            Parameters
          </h3>

          <button
            type="button"
            onClick={addParameter}
            className="rounded-lg bg-[var(--clr-accent)] px-4 py-2 text-sm font-medium text-white"
          >
            + Add Parameter
          </button>

        </div>

        <div className="space-y-3">

          {executionConfig.parameters.map(
            (parameter, index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <input
                  placeholder="Parameter Name"
                  value={parameter.name}
                  onChange={(e) =>
                    updateParameter(
                      index,
                      'name',
                      e.target.value
                    )
                  }
                  className="flex-1 rounded-xl border border-[var(--clr-border)] bg-transparent p-3"
                />

                <input
                  placeholder="Type"
                  value={parameter.type}
                  onChange={(e) =>
                    updateParameter(
                      index,
                      'type',
                      e.target.value
                    )
                  }
                  className="flex-1 rounded-xl border border-[var(--clr-border)] bg-transparent p-3"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeParameter(index)
                  }
                  className="rounded-xl border border-red-500 px-4 text-red-500"
                >
                  Remove
                </button>

              </div>
            )
          )}

        </div>

      </div>

      {/* Limits */}

      <div className="grid grid-cols-2 gap-6">

        <div>

          <label className="mb-2 block font-medium">
            Time Limit (ms)
          </label>

          <input
            type="number"
            value={executionConfig.timeLimit}
            onChange={(e) =>
              setExecutionConfig((prev) => ({
                ...prev,
                timeLimit: Number(e.target.value),
              }))
            }
            className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Memory Limit (MB)
          </label>

          <input
            type="number"
            value={executionConfig.memoryLimit}
            onChange={(e) =>
              setExecutionConfig((prev) => ({
                ...prev,
                memoryLimit: Number(e.target.value),
              }))
            }
            className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-3"
          />

        </div>

      </div>

      <div className="mt-10">

        <button
          onClick={handleSaveExecution}
          className="rounded-xl bg-[var(--clr-accent)] px-6 py-3 font-medium text-white"
        >
          Save & Continue
        </button>

      </div>

    </div>
  );
}