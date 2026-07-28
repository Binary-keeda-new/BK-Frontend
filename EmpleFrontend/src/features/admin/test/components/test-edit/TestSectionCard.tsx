import TestSectionQuestionEditor from './TestSectionQuestionEditor';
import type { TestSection } from './testEdit.types';

type TestSectionCardProps = {
  testId: string;
  section: TestSection;
  index: number;
  refreshKey: number;
  onEdit: (section: TestSection) => void;
  onDelete: (sectionId: string) => void;
  onToast: (message: string, type?: 'success' | 'error') => void;
  onOpenJsonImport: (sectionId: string) => void;
  onOpenAikenImport: (sectionId: string) => void;
  onOpenQuestionBankImport: (sectionId: string) => void;
};

export default function TestSectionCard({
  testId,
  section,
  index,
  refreshKey,
  onEdit,
  onDelete,
  onToast,
  onOpenJsonImport,
  onOpenAikenImport,
  onOpenQuestionBankImport,
}: TestSectionCardProps) {
  return (
    <div className="rounded-3xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--clr-text)]">
            Section {index + 1}: {section.type === 'mcq' ? 'MCQ' : 'Coding'}
          </h3>

          <p className="mt-1 text-sm text-[var(--clr-text2)]">
            {section.numberOfQuestions} questions
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(section)}
            className="rounded-xl border border-[var(--clr-border)] px-3 py-2 text-sm text-[var(--clr-text)]"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(section._id)}
            className="rounded-xl border border-red-300 px-3 py-2 text-sm text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

           {section.type === 'mcq' ? (
        <>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenJsonImport(section._id)}
              className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text)]"
            >
              Import JSON
            </button>

            <button
              onClick={() => onOpenAikenImport(section._id)}
              className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text)]"
            >
              Import Aiken
            </button>

            <button
              onClick={() => onOpenQuestionBankImport(section._id)}
              className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text)]"
            >
              Import from Question Bank
            </button>
          </div>

          <TestSectionQuestionEditor
            testId={testId}
            sectionId={section._id}
            onToast={onToast}
            refreshKey={refreshKey}
          />
        </>
      ) : (
        <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4">
          <h4 className="text-sm font-semibold text-[var(--clr-text)]">
            Selected Coding Problems
          </h4>

          {!section.codingProblemIds?.length ? (
            <p className="mt-2 text-sm text-[var(--clr-text2)]">
              No coding problems selected.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {section.codingProblemIds.map((problem, problemIndex) => {
                if (typeof problem === 'string') {
                  return (
                    <div
                      key={problem}
                      className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] px-3 py-3"
                    >
                      <p className="text-sm font-semibold text-[var(--clr-text)]">
                        Problem {problemIndex + 1}
                      </p>
                      <p className="mt-1 text-xs text-[var(--clr-text2)]">
                        Problem details not populated.
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={problem._id}
                    className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] px-3 py-3"
                  >
                    <p className="text-sm font-semibold text-[var(--clr-text)]">
                      {problem.title || `Problem ${problemIndex + 1}`}
                    </p>

                    <p className="mt-1 text-xs text-[var(--clr-text2)]">
                      {problem.difficulty || 'Easy'}
                    </p>

                    {problem.topics?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {problem.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-[var(--clr-surface2)] px-2 py-0.5 text-[11px] text-[var(--clr-text2)]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}