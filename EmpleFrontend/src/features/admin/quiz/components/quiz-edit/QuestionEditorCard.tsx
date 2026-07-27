import { Option, Question, ThemeTokens } from "./quizEdit.types";
import QuizEditCard from "./QuizEditCard";
import QuizQuestionForm from "./QuizQuestionForm";

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
              Delete
            </button>
          )}
        </div>
      </div>

      <QuizQuestionForm
        question={aq}
        t={t}
        updateQ={updateQ}
        updateOpt={updateOpt}
        toggleCorrect={toggleCorrect}
        removeOption={removeOption}
        addOption={addOption}
      />

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
          Prev
        </button>

        <div className="flex gap-2">
          {/* {aqIdx < questions.length - 1 && (
            <button
              onClick={() => setActiveQ(questions[aqIdx + 1].id)}
              className="rounded-[10px] border-none bg-[var(--clr-accent3)] px-[18px] py-[9px] text-[13px] font-bold text-[var(--clr-accent)]"
            >
              Next
            </button>
          )} */}

          <button
            onClick={addQuestion}
            className="flex items-center gap-1.5 rounded-[10px] border-none bg-[var(--clr-accent)] px-[18px] py-[9px] text-[13px] font-bold text-white"
          >
            + Add Question
          </button>
        </div>
      </div>
    </QuizEditCard>
  );
}