import { Option, Question, ThemeTokens } from "./quizEdit.types";
import QuizEditCard from "./QuizEditCard";
import QuizEditFieldLabel from "./QuizEditFieldLabel";
import QuestionOptionRow from "./QuestionOptionRow";

type Props = {
  aq: Question;
  aqIdx: number;
  questions: Question[];
  t: ThemeTokens;
  onOpenQuestionBankImport: () => void;
  onOpenFileImport: () => void;
  deleteQuestion: (id: string) => void;
  updateQ: (id: string, patch: Partial<Question>) => void;
  updateOpt: (qid: string, oid: string, patch: Partial<Option>) => void;
  toggleCorrect: (qid: string, oid: string) => void;
  removeOption: (qid: string, oid: string) => void;
  addOption: (qid: string) => void;
  setActiveQ: (id: string) => void;
  addQuestion: () => void;
};

export default function QuestionEditorCard({
  aq,
  aqIdx,
  questions,
  t,
  onOpenQuestionBankImport,
  onOpenFileImport,
  deleteQuestion,
  updateQ,
  updateOpt,
  toggleCorrect,
  removeOption,
  addOption,
  setActiveQ,
  addQuestion,
}: Props) {
  return (
    <QuizEditCard
      background={t.cardBg}
      borderColor={t.cardBorder}
      style={{ marginBottom: 32 }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <div
            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.07em]"
            style={{ color: t.subText }}
          >
            Question {aqIdx + 1} of {questions.length}
          </div>

          <h2
            className="text-[19px] font-extrabold"
            style={{
              fontFamily: "'Nunito',sans-serif",
              color: t.headingColor,
            }}
          >
            Edit Question
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenQuestionBankImport}
            className="flex items-center gap-1.5 rounded-[10px] border px-[14px] py-2 text-xs font-semibold transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
            style={{
              borderColor: t.cardBorder,
              background: t.inputBg,
              color: t.labelColor,
            }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Import Bank
          </button>

          <button
            onClick={onOpenFileImport}
            className="flex items-center gap-1.5 rounded-[10px] border px-[14px] py-2 text-xs font-semibold transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
            style={{
              borderColor: t.cardBorder,
              background: t.inputBg,
              color: t.labelColor,
            }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path
                d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9m-6-6l6 6m-6-6v6h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Import File
          </button>

          {questions.length > 1 && (
            <button
              onClick={() => deleteQuestion(aq.id)}
              className="flex items-center gap-1.5 rounded-[10px] border px-[14px] py-2 text-xs font-semibold transition-all hover:border-[var(--clr-accent)] hover:bg-[rgba(241,90,34,0.08)] hover:text-[var(--clr-accent)]"
              style={{
                borderColor: t.cardBorder,
                background: t.deleteBg,
                color: t.deleteText,
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <path
                  d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <QuizEditFieldLabel color={t.labelColor}>Question Text *</QuizEditFieldLabel>
        <textarea
          rows={3}
          placeholder="Type your question here…"
          value={aq.question}
          onChange={(e) => updateQ(aq.id, { question: e.target.value })}
          className="qph w-full resize-none rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
          style={{
            background: t.inputBg,
            borderColor: t.inputBorder,
            color: t.inputText,
          }}
        />
      </div>

      {aq.type !== "NAT" && (
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <QuizEditFieldLabel color={t.labelColor}>Options</QuizEditFieldLabel>
            <span className="text-[11px]" style={{ color: t.subText }}>
              Tap letter to mark correct ✓
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {aq.options.map((opt, oi) => (
              <QuestionOptionRow
                key={opt.id}
                qid={aq.id}
                opt={opt}
                oi={oi}
                optionCount={aq.options.length}
                isCorrect={aq.correct.includes(opt.id)}
                t={t}
                toggleCorrect={toggleCorrect}
                updateOpt={updateOpt}
                removeOption={removeOption}
              />
            ))}
          </div>

          <button
            onClick={() => addOption(aq.id)}
            className="mt-3 w-full rounded-[10px] border border-dashed bg-transparent p-[9px] text-xs font-semibold transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
            style={{
              borderColor: t.inputBorder,
              color: t.labelColor,
            }}
          >
            + Add Option
          </button>
        </div>
      )}

      {aq.type === "NAT" && (
        <div className="mb-6">
          <QuizEditFieldLabel color={t.labelColor}>Correct Answer *</QuizEditFieldLabel>
          <input
            type="text"
            placeholder="Enter correct answer"
            value={aq.natAnswer || ""}
            onChange={(e) => updateQ(aq.id, { natAnswer: e.target.value })}
            className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
            style={{
              background: t.inputBg,
              borderColor: t.inputBorder,
              color: t.inputText,
            }}
          />
        </div>
      )}

      <div className="mb-6">
        <QuizEditFieldLabel color={t.labelColor}>Marks</QuizEditFieldLabel>

        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          {([
            ["Correct (+)", "positiveMarks", "#22c55e"],
            ["Wrong (−)", "negativeMarks", "#f87171"],
          ] as const).map(([label, key, color]) => (
            <div key={key}>
              <div
                className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold"
                style={{ color: t.labelColor }}
              >
                <div className="h-[7px] w-[7px] rounded-full" style={{ background: color }} />
                {label}
              </div>

              <input
                type="number"
                step="0.5"
                value={aq[key]}
                onChange={(e) => updateQ(aq.id, { [key]: Number(e.target.value) })}
                className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                style={{
                  background: t.inputBg,
                  borderColor: aq[key] ? `${color}55` : t.inputBorder,
                  color: t.inputText,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-2.5">
        <button
          onClick={() => aqIdx > 0 && setActiveQ(questions[aqIdx - 1].id)}
          className="rounded-[10px] border px-[18px] py-[9px] text-[13px] font-semibold transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
          style={{
            borderColor: t.cardBorder,
            background: "transparent",
            color: aqIdx > 0 ? t.labelColor : t.subText,
            opacity: aqIdx > 0 ? 1 : 0.3,
            cursor: aqIdx > 0 ? "pointer" : "default",
          }}
        >
          ← Prev
        </button>

        <div className="flex gap-2">
          {aqIdx < questions.length - 1 && (
            <button
              onClick={() => setActiveQ(questions[aqIdx + 1].id)}
              className="rounded-[10px] border-none bg-[var(--clr-accent3)] px-[18px] py-[9px] text-[13px] font-bold text-[var(--clr-accent)]"
            >
              Next →
            </button>
          )}

          <button
            onClick={addQuestion}
            className="flex items-center gap-1.5 rounded-[10px] border-none bg-[var(--clr-accent)] px-[18px] py-[9px] text-[13px] font-bold text-white"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 4v16m8-8H4"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Add Question
          </button>
        </div>
      </div>
    </QuizEditCard>
  );
}