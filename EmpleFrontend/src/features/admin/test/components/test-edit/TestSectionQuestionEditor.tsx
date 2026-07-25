'use client';

import { Option, TestEditorQuestion } from './testQuestion.types';
import { useTestSectionQuestions } from './useTestSectionQuestions';
import { useEffect } from 'react';

type Props = {
  testId: string;
  sectionId: string;
  refreshKey?: number;
  onToast?: (message: string, type?: 'success' | 'error') => void;
};

export default function TestSectionQuestionEditor({
  testId,
  sectionId,
  onToast,
  refreshKey
}: Props) {
  const {
    questions,
    activeQ,
    setActiveQ,
    loading,
    saving,
    updateQ,
    updateOpt,
    toggleCorrect,
    removeOption,
    addOption,
    addQuestion,
    deleteQuestion,
    saveAllValidQuestions,
    loadQuestions,
  } = useTestSectionQuestions(testId, sectionId);

  useEffect(() => {
  if (refreshKey === undefined) return;
  loadQuestions();
}, [refreshKey, loadQuestions]);

  const handleSave = async () => {
    try {
      await saveAllValidQuestions();
      onToast?.('Questions saved successfully.', 'success');
    } catch (error) {
      onToast?.(
        error instanceof Error ? error.message : 'Failed to save questions',
        'error'
      );
    }
  };

  if (loading) {
    return (
      <div className="mt-4 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm text-[var(--clr-text2)]">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-3xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-base font-bold text-[var(--clr-text)]">
            MCQ Questions
          </h4>
          <p className="mt-1 text-xs text-[var(--clr-text2)]">
            Add, edit and save questions for this section.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={addQuestion}
            className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm font-semibold text-[var(--clr-text)]"
          >
            + Add Question
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Questions'}
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {questions.map((question, index) => {
          const isActive = activeQ === question.id;

          return (
            <button
              key={question.id}
              onClick={() => setActiveQ(question.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                isActive
                  ? 'border-[var(--clr-accent)] bg-[var(--clr-accent3)] text-[var(--clr-accent)]'
                  : 'border-[var(--clr-border)] text-[var(--clr-text2)]'
              }`}
            >
              Q{index + 1}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          if (question.id !== activeQ) return null;

          return (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              total={questions.length}
              updateQ={updateQ}
              updateOpt={updateOpt}
              toggleCorrect={toggleCorrect}
              removeOption={removeOption}
              addOption={addOption}
              deleteQuestion={deleteQuestion}
            />
          );
        })}
      </div>
    </div>
  );
}

type QuestionCardProps = {
  question: TestEditorQuestion;
  index: number;
  total: number;
  updateQ: (id: string, patch: Partial<TestEditorQuestion>) => void;
  updateOpt: (qid: string, oid: string, patch: Partial<Option>) => void;
  toggleCorrect: (qid: string, oid: string) => void;
  removeOption: (qid: string, oid: string) => void;
  addOption: (qid: string) => void;
  deleteQuestion: (id: string) => void;
};

function QuestionCard({
  question,
  index,
  total,
  updateQ,
  updateOpt,
  toggleCorrect,
  removeOption,
  addOption,
  deleteQuestion,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--clr-text3)]">
            Question {index + 1} of {total}
          </p>
          <h4 className="mt-1 text-lg font-bold text-[var(--clr-text)]">
            Edit Question
          </h4>
        </div>

        {total > 1 && (
          <button
            onClick={() => deleteQuestion(question.id)}
            className="rounded-xl border border-red-300 px-3 py-2 text-xs font-semibold text-red-500"
          >
            Delete
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
          Question Type
        </label>

        <select
          value={question.type}
          onChange={(e) =>
            updateQ(question.id, {
              type: e.target.value as TestEditorQuestion['type'],
              correct: [],
              natAnswer: '',
            })
          }
          className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
        >
          <option value="MCQ">MCQ</option>
          <option value="MSQ">MSQ</option>
          <option value="NAT">NAT</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
          Question Text
        </label>

        <textarea
          rows={3}
          value={question.question}
          onChange={(e) => updateQ(question.id, { question: e.target.value })}
          placeholder="Type your question here..."
          className="w-full resize-none rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
          Solution
        </label>

        <textarea
          rows={3}
          value={question.solution || ''}
          onChange={(e) => updateQ(question.id, { solution: e.target.value })}
          placeholder="Add solution / explanation..."
          className="w-full resize-none rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
        />
      </div>

      {question.type !== 'NAT' ? (
        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label className="block text-sm font-semibold text-[var(--clr-text)]">
              Options
            </label>

            <span className="text-xs text-[var(--clr-text2)]">
              Click checkbox to mark correct
            </span>
          </div>

          <div className="space-y-2">
            {question.options.map((option, optionIndex) => {
              const checked = question.correct.includes(option.id);

              return (
                <div
                  key={option.id}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-4 py-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCorrect(question.id, option.id)}
                    className="h-4 w-4"
                  />

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--clr-accent3)] text-xs font-bold text-[var(--clr-accent)]">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>

                  <input
                    value={option.text}
                    onChange={(e) =>
                      updateOpt(question.id, option.id, {
                        text: e.target.value,
                      })
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                    className="min-w-0 flex-1 bg-transparent text-sm text-[var(--clr-text)] outline-none placeholder:text-[var(--clr-text3)]"
                  />

                  {question.options.length > 2 && (
                    <button
                      onClick={() => removeOption(question.id, option.id)}
                      className="text-xs font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => addOption(question.id)}
            className="mt-3 w-full rounded-2xl border border-dashed border-[var(--clr-border)] px-4 py-3 text-sm font-semibold text-[var(--clr-text2)] transition hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
          >
            + Add Option
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Correct Answer
          </label>

          <input
            value={question.natAnswer || ''}
            onChange={(e) =>
              updateQ(question.id, { natAnswer: e.target.value })
            }
            placeholder="Enter correct answer"
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Correct Marks
          </label>

          <input
            type="number"
            step="0.5"
            value={question.positiveMarks}
            onChange={(e) =>
              updateQ(question.id, {
                positiveMarks: Number(e.target.value),
              })
            }
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
            Negative Marks
          </label>

          <input
            type="number"
            step="0.5"
            value={question.negativeMarks}
            onChange={(e) =>
              updateQ(question.id, {
                negativeMarks: Number(e.target.value),
              })
            }
            className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
          />
        </div>
      </div>
    </div>
  );
}