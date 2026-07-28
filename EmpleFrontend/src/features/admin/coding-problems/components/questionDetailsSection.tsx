'use client';

interface Props {
  detailsForm: {
    title: string;
    difficulty: string;
    topics: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  handleSaveDetails: () => void;
}

export default function QuestionDetailsSection({
  detailsForm,
  handleChange,
  handleSaveDetails,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Question Details
      </h2>

      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={detailsForm.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Difficulty
          </label>

          <select
            name="difficulty"
            value={detailsForm.difficulty}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] text-[var(--clr-text)] px-4 py-3 outline-none"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Topics
          </label>

          <input
            type="text"
            name="topics"
            value={detailsForm.topics}
            onChange={handleChange}
            placeholder="Arrays, HashMap"
            className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3 outline-none"
          />
        </div>


        <div className="flex justify-end">
          <button
            onClick={handleSaveDetails}
            className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 font-medium text-white"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}