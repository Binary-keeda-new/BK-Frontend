import CodingProblemSelector from './CodingProblemSelector';
import type {
  CodingProblemOption,
  SectionForm,
  TestSection,
} from './testEdit.types';

type TestSectionModalProps = {
  open: boolean;
  editingSection: TestSection | null;
  sectionForm: SectionForm;
  sectionSaving: boolean;
  codingProblems: CodingProblemOption[];
  loadingCodingProblems: boolean;
  onClose: () => void;
  onSave: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onToggleCodingProblem: (problemId: string) => void;
};

export default function TestSectionModal({
  open,
  editingSection,
  sectionForm,
  sectionSaving,
  codingProblems,
  loadingCodingProblems,
  onClose,
  onSave,
  onChange,
  onToggleCodingProblem,
}: TestSectionModalProps) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
      />

     <div className="fixed left-1/2 top-1/2 z-[401] max-h-[90vh] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-[var(--clr-surface)] p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-xl font-bold text-[var(--clr-text)]">
          {editingSection ? 'Edit Section' : 'Add Section'}
        </h2>

        <p className="mt-1 text-sm text-[var(--clr-text2)]">
          Choose the section type and its question settings.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
              Section Type
            </label>

            <select
              name="type"
              value={sectionForm.type}
              onChange={onChange}
              className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
            >
              <option value="mcq">Quiz / MCQ</option>
              <option value="coding">Coding</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
              Number of Questions
            </label>

            <input
              name="numberOfQuestions"
              type="number"
              value={sectionForm.numberOfQuestions}
              onChange={onChange}
              placeholder="Example: 10"
              className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
              Total Duration
            </label>

            <input
              name="duration"
              type="number"
              value={sectionForm.duration}
              onChange={onChange}
              placeholder="Duration in minutes"
              className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
            />
          </div>

          {sectionForm.type === 'coding' && (
            <CodingProblemSelector
              codingProblems={codingProblems}
              loading={loadingCodingProblems}
              selectedIds={sectionForm.codingProblemIds}
              numberOfQuestions={sectionForm.numberOfQuestions}
              onToggle={onToggleCodingProblem}
            />
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={sectionSaving}
              className="rounded-2xl border border-[var(--clr-border)] px-5 py-3 text-sm text-[var(--clr-text2)] disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              disabled={sectionSaving}
              className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {sectionSaving
                ? 'Saving...'
                : editingSection
                ? 'Update Section'
                : 'Add Section'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}