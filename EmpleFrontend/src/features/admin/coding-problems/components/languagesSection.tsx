'use client';

interface Props {
  languages: string[];

  setLanguages: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  codeTemplates: {
    Java: string;
    Python: string;
    'C++': string;
    C: string;
  };

  setCodeTemplates: React.Dispatch<
    React.SetStateAction<{
      Java: string;
      Python: string;
      'C++': string;
      C: string;
    }>
  >;

  handleSaveLanguages: () => void;
}

const AVAILABLE_LANGUAGES = [
  'C',
  'C++',
  'Java',
  'Python',
];

export default function LanguagesSection({
  languages,
  setLanguages,
  handleSaveLanguages,
}: Props) {
  const toggleLanguage = (
    language: string
  ) => {
    if (languages.includes(language)) {
      setLanguages(
        languages.filter(
          (lang) => lang !== language
        )
      );
    } else {
      setLanguages([
        ...languages,
        language,
      ]);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Supported Languages
      </h2>

      <div className="space-y-4">
        {AVAILABLE_LANGUAGES.map(
          (language) => (
            <label
              key={language}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={languages.includes(
                  language
                )}
                onChange={() =>
                  toggleLanguage(language)
                }
              />

              <span>{language}</span>
            </label>
          )
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveLanguages}
          className="rounded-xl bg-[var(--clr-accent)] px-5 py-3 text-white"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}