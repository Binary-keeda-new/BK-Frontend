import type { UserTestSection } from '../../types/test.types';

type Props = {
  section: UserTestSection;
  sectionIndex: number;
  onBackToSections: () => void;
  onSectionCompleted: (sectionId: string) => void;
};

export default function CodingSectionPlaceholder({
  section,
  sectionIndex,
  onBackToSections,
  onSectionCompleted,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-[900px] p-6">
      <button
        onClick={onBackToSections}
        className="mb-5 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted2)]"
      >
        Back to Sections
      </button>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
          SECTION {sectionIndex + 1}
        </p>

        <h1 className="mt-2 text-2xl font-extrabold text-[var(--text)]">
          Coding Section
        </h1>

        <p className="mt-2 text-sm text-[var(--muted2)]">
          Coding problem attempt UI will be connected after coding problems is done.
        </p>

        <button
          onClick={() => onSectionCompleted(section._id)}
          className="mt-6 rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
        >
          Mark Coding Section Complete
        </button>
      </div>
    </div>
  );
}
