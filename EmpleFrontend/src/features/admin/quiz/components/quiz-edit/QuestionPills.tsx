import { Question, ThemeTokens } from "./quizEdit.types";
import QuizEditSectionTitle from "./QuizEditSectionTitle";

type Props = {
  questions: Question[];
  activeQ: string;
  setActiveQ: (id: string) => void;
  addQuestion: () => void;
  t: ThemeTokens;
};

export default function QuestionPills({
  questions,
  activeQ,
  setActiveQ,
  addQuestion,
  t,
}: Props) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <QuizEditSectionTitle sectionLabel={t.sectionLabel} divider={t.divider}>
          Questions ({questions.length})
        </QuizEditSectionTitle>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setActiveQ(q.id)}
            className="flex items-center gap-1.5 rounded-full border px-[14px] py-[7px] text-xs font-bold transition-all"
            style={{
              borderColor: activeQ === q.id ? "var(--clr-accent)" : t.qPillBorder,
              background: activeQ === q.id ? "var(--clr-accent3)" : t.qPillBg,
              color: activeQ === q.id ? "var(--clr-accent)" : t.qPillText,
            }}
          >
            <span
              className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] text-[10px] font-bold transition-all"
              style={{
                background: activeQ === q.id ? "var(--clr-accent)" : t.inputBg,
                color: activeQ === q.id ? "#fff" : t.labelColor,
              }}
            >
              {i + 1}
            </span>

            <span className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap">
              {q.text || "Untitled"}
            </span>

            {q.correct.length > 0 && (
              <span className="h-[6px] w-[6px] flex-shrink-0 rounded-full bg-green-500" />
            )}
          </button>
        ))}

        <button
          onClick={addQuestion}
          className="flex items-center gap-1.5 rounded-full border border-dashed bg-transparent px-[14px] py-[7px] text-xs font-bold transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
          style={{
            borderColor: t.qPillBorder,
            color: t.subText,
          }}
        >
          + Add Question
        </button>
      </div>
    </>
  );
}