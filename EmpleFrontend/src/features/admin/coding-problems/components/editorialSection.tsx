'use client';

interface Props {
  editorial: string;
  setEditorial: (
    value: string
  ) => void;

  handleSaveEditorial: () => void;
}

export default function EditorialSection({
  editorial,
  setEditorial,
  handleSaveEditorial,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Editorial
      </h2>

      <textarea
        rows={18}
        value={editorial}
        onChange={(e) =>
          setEditorial(e.target.value)
        }
        placeholder="Write the official solution explanation..."
        className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent px-4 py-3 outline-none resize-y"
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={
            handleSaveEditorial
          }
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}