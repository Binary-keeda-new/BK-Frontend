type TestHeaderProps = {
  onClose?: () => void;
};

export default function TestHeader({ onClose }: TestHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--clr-text)]">
          Edit <span className="text-[var(--clr-accent)]">Test</span>
        </h1>

        <p className="mt-1 text-sm text-[var(--clr-text2)]">
          Create sections for MCQ and coding based assessments.
        </p>
      </div>

      <button
        onClick={onClose}
        className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text2)]"
      >
        Back
      </button>
    </div>
  );
}