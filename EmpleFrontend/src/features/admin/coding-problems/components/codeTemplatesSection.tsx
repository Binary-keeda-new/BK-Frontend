'use client';

import { Info } from 'lucide-react';

type CodeTemplates = {
  Java: string;
  Python: string;
  'C++': string;
  C: string;
};

interface Props {
  languages: string[];

  templateType: string;

  setTemplateType: (
    value: string
  ) => void;

  codeTemplates: CodeTemplates;

  setCodeTemplates: React.Dispatch<
    React.SetStateAction<CodeTemplates>
  >;

  handleSaveTemplates: () => void;

  lockedPrefixTemplates: CodeTemplates;
setLockedPrefixTemplates: React.Dispatch<
  React.SetStateAction<CodeTemplates>
>;

lockedSuffixTemplates: CodeTemplates;
setLockedSuffixTemplates: React.Dispatch<
  React.SetStateAction<CodeTemplates>
>;
}

function FieldLabel({
  title,
  help,
}: {
  title: string;
  help?: string;
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <label className="text-sm font-medium text-[var(--clr-text2)]">
        {title}
      </label>

      {help && (
        <div className="group relative">
          <Info className="h-4 w-4 cursor-help text-[var(--clr-text3)]" />

          <div className="absolute left-6 top-0 z-20 hidden w-64 rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-3 text-xs text-[var(--clr-text2)] shadow-xl group-hover:block">
            {help}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CodeTemplatesSection({
  languages,
  templateType,
  setTemplateType,
  codeTemplates,
  setCodeTemplates,
  handleSaveTemplates,
  lockedPrefixTemplates,
setLockedPrefixTemplates,
lockedSuffixTemplates,
setLockedSuffixTemplates,
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Code Templates
      </h2>

      <div className="mb-8">
        <label className="mb-3 block font-medium">
          Template Type
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={
                templateType ===
                'boilerplate'
              }
              onChange={() =>
                setTemplateType(
                  'boilerplate'
                )
              }
            />

            Boilerplate
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={
                templateType ===
                'full-code'
              }
              onChange={() =>
                setTemplateType(
                  'full-code'
                )
              }
            />

            Full Code
          </label>
        </div>
      </div>

      <div className="space-y-6">
        {languages.map((language) => (
          <div key={language} className="rounded-2xl border border-[var(--clr-border)] p-5">
  <h3 className="mb-4 text-lg font-bold text-[var(--clr-text)]">
    {language}
  </h3>

  <FieldLabel
  title="Starter Code (Read-only)"
  help="Candidates will see this code before their editable area, but they cannot edit it."
/>
  <textarea
    rows={5}
    value={lockedPrefixTemplates[language as keyof CodeTemplates] || ''}
    onChange={(e) =>
      setLockedPrefixTemplates((prev) => ({
        ...prev,
        [language]: e.target.value,
      }))
    }
    placeholder="Code above the editable area..."
    className="mb-5 w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-4 font-mono text-sm outline-none"
  />

  <FieldLabel
  title="Candidate Editable Code"
  help="Candidates write their solution in this section."
/>
  <textarea
    rows={10}
    value={codeTemplates[language as keyof CodeTemplates] || ''}
    onChange={(e) =>
      setCodeTemplates((prev) => ({
        ...prev,
        [language]: e.target.value,
      }))
    }
    className="mb-5 w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-4 font-mono text-sm outline-none"
  />

  <FieldLabel
  title="Ending Code (Read-only)"
  help="Candidates will see this code after their editable area, but they cannot edit it."
/>
  <textarea
    rows={5}
    value={lockedSuffixTemplates[language as keyof CodeTemplates] || ''}
    onChange={(e) =>
      setLockedSuffixTemplates((prev) => ({
        ...prev,
        [language]: e.target.value,
      }))
    }
    placeholder="Code below the editable area..."
    className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-4 font-mono text-sm outline-none"
  />
</div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={
            handleSaveTemplates
          }
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}