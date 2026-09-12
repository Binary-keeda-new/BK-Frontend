import { Option, Question, ThemeTokens } from "./quizEdit.types";
import QuizEditFieldLabel from "./QuizEditFieldLabel";
import QuestionOptionRow from "./QuestionOptionRow";
import { useState } from "react";
import { uploadAdminImage } from "@/shared/services/upload.service";

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
  const [uploadingSolutionImage, setUploadingSolutionImage] = useState(false);
  const [uploadingQuestionImage, setUploadingQuestionImage] = useState(false);
  return (
    <>
      <div className="mb-6">
        <QuizEditFieldLabel color={t.labelColor}>
          Question Type *
        </QuizEditFieldLabel>
        <div className="flex gap-4 mt-2">
          {(["MCQ", "MSQ", "NAT"] as const).map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-sm"
              style={{ color: t.inputText }}
            >
              <input
                type="radio"
                name={`qtype-${question.id}`}
                value={type}
                checked={question.type === type}
                onChange={() => updateQ(question.id, { type })}
                className="accent-[var(--clr-accent)] cursor-pointer"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

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
        <div className="flex items-center gap-3 mb-3">
          <QuizEditFieldLabel color={t.labelColor}>
            Code Block
          </QuizEditFieldLabel>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={question.hasCodeBlock || false}
              onChange={(e) =>
                updateQ(question.id, { hasCodeBlock: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--clr-accent)]"></div>
            <span className="ml-3 text-sm font-medium" style={{ color: t.subText }}>
              Add Code Block
            </span>
          </label>
        </div>

        {question.hasCodeBlock && (
          <textarea
            rows={6}
            placeholder="Enter code here..."
            value={question.codeBlock || ""}
            onChange={(e) => updateQ(question.id, { codeBlock: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const newCode =
                  (question.codeBlock || "").substring(0, start) +
                  "    " +
                  (question.codeBlock || "").substring(end);
                
                updateQ(question.id, { codeBlock: newCode });
                
                setTimeout(() => {
                  target.selectionStart = target.selectionEnd = start + 4;
                }, 0);
              }
            }}
            className="w-full resize-y rounded-[10px] border px-4 py-3 outline-none transition-all font-mono text-sm whitespace-pre"
            style={{
              background: t.inputBg,
              borderColor: t.inputBorder,
              color: t.inputText,
            }}
          />
        )}
      </div>

      <div className="mb-6">
        <QuizEditFieldLabel color={t.labelColor}>
          Question Image (Optional)
        </QuizEditFieldLabel>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Paste question image URL…"
            value={question.imageUrl || ""}
            onChange={(e) => updateQ(question.id, { imageUrl: e.target.value })}
            className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
            style={{
              background: t.inputBg,
              borderColor: t.inputBorder,
              color: t.inputText,
            }}
          />

          <label
            className="flex cursor-pointer items-center justify-center rounded-[10px] border border-dashed px-4 py-3 text-xs font-semibold transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
            style={{
              borderColor: t.inputBorder,
              color: t.labelColor,
              background: t.inputBg,
            }}
          >
            {uploadingQuestionImage ? "Uploading..." : "Upload Question Image"}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingQuestionImage}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setUploadingQuestionImage(true);
                  const imageUrl = await uploadAdminImage(file);
                  updateQ(question.id, { imageUrl });
                } catch (error) {
                  console.error(error);
                  alert("Failed to upload image");
                } finally {
                  setUploadingQuestionImage(false);
                  e.target.value = "";
                }
              }}
            />
          </label>

          {question.imageUrl && (
            <div className="relative inline-block w-full">
              <img
                src={question.imageUrl}
                alt="Question preview"
                className="max-h-40 max-w-full rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] object-contain"
              />
              <button
                type="button"
                onClick={() => updateQ(question.id, { imageUrl: "" })}
                className="absolute top-2 right-2 rounded-lg bg-black/60 p-1.5 text-white hover:bg-red-500/80 transition-colors"
                title="Remove Image"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
  <QuizEditFieldLabel color={t.labelColor}>
    Solution
  </QuizEditFieldLabel>

  <textarea
    rows={6}
    placeholder="Add solution / explanation for this question…"
    value={question.solution || ""}
    onChange={(e) =>
      updateQ(question.id, { solution: e.target.value })
    }
    className="qph w-full resize-y rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)] text-[14.5px] leading-relaxed whitespace-pre-wrap break-words"
    style={{
      background: t.inputBg,
      borderColor: t.inputBorder,
      color: t.inputText,
    }}
  />
</div>


      <div className="mb-6">
        <QuizEditFieldLabel color={t.labelColor}>Metadata</QuizEditFieldLabel>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Topic *', key: 'topic' },
            { label: 'SubTopic', key: 'subTopic' },
            { label: 'Exam', key: 'exam' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label
                className="mb-1 block text-[11px] font-semibold"
                style={{ color: t.labelColor }}
              >
                {label}
              </label>
              <input
                type="text"
                value={(question as any)[key] || ''}
                onChange={(e) => updateQ(question.id, { [key]: e.target.value })}
                className="qph w-full rounded-[10px] border px-3 py-2 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)] text-sm"
                style={{
                  background: t.inputBg,
                  borderColor: t.inputBorder,
                  color: t.inputText,
                }}
              />
            </div>
          ))}

          <div>
            <label
              className="mb-1 block text-[11px] font-semibold"
              style={{ color: t.labelColor }}
            >
              Year
            </label>
            <input
              type="number"
              value={question.year || ''}
              onChange={(e) =>
                updateQ(question.id, {
                  year: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="qph w-full rounded-[10px] border px-3 py-2 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)] text-sm"
              style={{
                background: t.inputBg,
                borderColor: t.inputBorder,
                color: t.inputText,
              }}
            />
          </div>
        </div>
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