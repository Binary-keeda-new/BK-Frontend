import { Option, Question, ThemeTokens } from "./quizEdit.types";
import QuizEditFieldLabel from "./QuizEditFieldLabel";
import QuestionOptionRow from "./QuestionOptionRow";

type Props = {
  question: Question;
  t: ThemeTokens;
  updateQ: (id: string, patch: Partial<Question>) => void;
  updateOpt: (qid: string, oid: string, patch: Partial<Option>) => void;
  toggleCorrect: (qid: string, oid: string) => void;
  removeOption: (qid: string, oid: string) => void;
  addOption: (qid: string) => void;
};

export default function QuizQuestionForm({
  question,
  t,
  updateQ,
  updateOpt,
  toggleCorrect,
  removeOption,
  addOption,
}: Props) {
  return (
    <>
      <div className="mb-6">
        <QuizEditFieldLabel color={t.labelColor}>
          Question Text *
        </QuizEditFieldLabel>

        <textarea
          rows={3}
          placeholder="Type your question here…"
          value={question.question}
          onChange={(e) => updateQ(question.id, { question: e.target.value })}
          className="qph w-full resize-none rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
          style={{
            background: t.inputBg,
            borderColor: t.inputBorder,
            color: t.inputText,
          }}
        />
      </div>

      <div className="mb-6">
  <QuizEditFieldLabel color={t.labelColor}>
    Solution
  </QuizEditFieldLabel>

  <textarea
    rows={4}
    placeholder="Add solution / explanation for this question…"
    value={question.solution || ""}
    onChange={(e) =>
      updateQ(question.id, { solution: e.target.value })
    }
    className="qph w-full resize-none rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
    style={{
      background: t.inputBg,
      borderColor: t.inputBorder,
      color: t.inputText,
    }}
  />
</div>

<div className="mb-6">
  <QuizEditFieldLabel color={t.labelColor}>
    Solution Media URL
  </QuizEditFieldLabel>

  <input
    type="text"
    placeholder="Optional solution image/video/file URL"
    value={question.solutionMedia || ""}
    onChange={(e) =>
      updateQ(question.id, { solutionMedia: e.target.value })
    }
    className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
    style={{
      background: t.inputBg,
      borderColor: t.inputBorder,
      color: t.inputText,
    }}
  />
</div>

      {question.type !== "NAT" && (
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <QuizEditFieldLabel color={t.labelColor}>Options</QuizEditFieldLabel>
            <span className="text-[11px]" style={{ color: t.subText }}>
              Tap letter to mark correct ✓
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {question.options.map((opt, oi) => (
              <QuestionOptionRow
                key={opt.id}
                qid={question.id}
                opt={opt}
                oi={oi}
                optionCount={question.options.length}
                isCorrect={question.correct.includes(opt.id)}
                t={t}
                toggleCorrect={toggleCorrect}
                updateOpt={updateOpt}
                removeOption={removeOption}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => addOption(question.id)}
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

      {question.type === "NAT" && (
        <div className="mb-6">
          <QuizEditFieldLabel color={t.labelColor}>
            Correct Answer *
          </QuizEditFieldLabel>

          <input
            type="text"
            placeholder="Enter correct answer"
            value={question.natAnswer || ""}
            onChange={(e) =>
              updateQ(question.id, { natAnswer: e.target.value })
            }
            className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
            style={{
              background: t.inputBg,
              borderColor: t.inputBorder,
              color: t.inputText,
            }}
          />
        </div>
      )}

      <div className="mb-2">
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
                <div
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ background: color }}
                />
                {label}
              </div>

              <input
                type="number"
                step="0.5"
                value={question[key]}
                onChange={(e) =>
                  updateQ(question.id, { [key]: Number(e.target.value) })
                }
                className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                style={{
                  background: t.inputBg,
                  borderColor: question[key] ? `${color}55` : t.inputBorder,
                  color: t.inputText,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}