'use client';

interface Props {
  handleSaveDraft: () => void;
  handlePreview: () => void;
  handlePublish: () => void;
}

export default function PublishSection({
  handleSaveDraft,
  handlePreview,
  handlePublish,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Publish
      </h2>

      <p className="mb-8 text-[var(--clr-text2)]">
        Save your work as a draft,
        preview the problem exactly as
        candidates will see it, and
        publish once everything is
        complete.
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSaveDraft}
          className="rounded-xl border border-[var(--clr-border)] px-5 py-3"
        >
          Save Draft
        </button>

        <button
          onClick={handlePreview}
          className="rounded-xl border border-[var(--clr-border)] px-5 py-3"
        >
          Preview Problem
        </button>

        <button
          onClick={handlePublish}
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Publish Problem
        </button>
      </div>
    </div>
  );
}