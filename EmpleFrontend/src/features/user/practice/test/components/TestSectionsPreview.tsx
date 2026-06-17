'use client';

import { UserTest, UserTestSection } from '../types/test.types';

type Props = {
  test: UserTest;
  enabledSectionIndex: number;
  completedSectionIds: string[];
  onBack: () => void;
  onAttemptSection: (section: UserTestSection, index: number) => void;
};

function getDotClass(index: number, enabledIndex: number, completed: boolean) {
  if (completed) return 'border-emerald-500 bg-emerald-500 text-white';
  if (index === enabledIndex) {
    return 'border-[var(--orange)] bg-[var(--orange)] text-white';
  }
  return 'border-[var(--border)] bg-[var(--surface2,#1e2028)] text-[var(--muted2)]';
}

export default function TestSectionsPreview({
  test,
  enabledSectionIndex,
  completedSectionIds,
  onBack,
  onAttemptSection,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-[760px] p-6">
      <button
        onClick={onBack}
        className="mb-5 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted2)]"
      >
        ← Back to Instructions
      </button>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-[var(--text)]">
            Test Sections
          </h1>
          <p className="mt-1 text-sm text-[var(--muted2)]">
            Complete sections one by one.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          {test.sections.map((section, index) => {
            const completed = completedSectionIds.includes(section._id);

            return (
              <div key={section._id} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${getDotClass(
                    index,
                    enabledSectionIndex,
                    completed
                  )}`}
                >
                  {index + 1}
                </div>

                {index !== test.sections.length - 1 && (
                  <div className="h-px w-8 bg-[var(--border)]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          {test.sections.map((section, index) => {
            const completed = completedSectionIds.includes(section._id);
            const enabled = index === enabledSectionIndex && !completed;

            return (
              <div
                key={section._id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface2,#1e2028)] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text)]">
                      Section {index + 1}: {section.title}
                    </h3>

                    <p className="mt-1 text-sm text-[var(--muted2)]">
                      {section.type === 'mcq' ? 'MCQ / Quiz' : 'Coding'} ·{' '}
                      {section.numberOfQuestions} questions · {section.duration}{' '}
                      mins
                    </p>

                    <p className="mt-2 text-xs font-semibold">
                      {completed ? (
                        <span className="text-emerald-400">Completed</span>
                      ) : enabled ? (
                        <span className="text-[var(--orange)]">
                          Available now
                        </span>
                      ) : (
                        <span className="text-[var(--muted2)]">Locked</span>
                      )}
                    </p>
                  </div>

                  <button
                    disabled={!enabled}
                    onClick={() => onAttemptSection(section, index)}
                    className="rounded-xl px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      background: enabled ? 'var(--orange)' : 'transparent',
                      border: `1px solid ${
                        enabled ? 'var(--orange)' : 'var(--border)'
                      }`,
                      color: enabled ? '#fff' : 'var(--muted)',
                    }}
                  >
                    Attempt Section {index + 1}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}