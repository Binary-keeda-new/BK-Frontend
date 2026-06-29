'use client';

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
}

export default function CodeTemplatesSection({
  languages,
  templateType,
  setTemplateType,
  codeTemplates,
  setCodeTemplates,
  handleSaveTemplates,
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
          <div key={language}>
            <label className="mb-2 block font-medium">
              {language} Template
            </label>

            <textarea
              rows={10}
              value={
                codeTemplates[
                  language as keyof CodeTemplates
                ] || ''
              }
              onChange={(e) =>
                setCodeTemplates(
                  (prev) => ({
                    ...prev,
                    [language]:
                      e.target.value,
                  })
                )
              }
              className="w-full rounded-xl border border-[var(--clr-border)] bg-transparent p-4 outline-none"
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