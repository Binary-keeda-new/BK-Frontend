import type { TestForm } from './testEdit.types';

type TestDetailsFormProps = {
  form: TestForm;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function TestDetailsForm({ form, onChange }: TestDetailsFormProps) {
  return (
    <div className="rounded-3xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Enter test title"
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Enter test description"
            rows={4}
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Total Number of Sections
          </label>

          <input
            name="totalSections"
            type="number"
            value={form.totalSections}
            onChange={onChange}
            placeholder="Example: 2"
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>
      </div>
    </div>
  );
}