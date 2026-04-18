import { Option, ThemeTokens } from "./quizEdit.types";

type Props = {
  qid: string;
  opt: Option;
  oi: number;
  isCorrect: boolean;
  optionCount: number;
  t: ThemeTokens;
  toggleCorrect: (qid: string, oid: string) => void;
  updateOpt: (qid: string, oid: string, patch: Partial<Option>) => void;
  removeOption: (qid: string, oid: string) => void;
};

export default function QuestionOptionRow({
  qid,
  opt,
  oi,
  isCorrect,
  optionCount,
  t,
  toggleCorrect,
  updateOpt,
  removeOption,
}: Props) {
  return (
    <div className="flex items-start gap-2">
      <button
        onClick={() => toggleCorrect(qid, opt.id)}
        className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border text-[13px] font-bold transition-all"
        style={{
          borderColor: isCorrect ? "#22c55e" : t.inputBorder,
          background: isCorrect ? "rgba(34,197,94,0.1)" : t.inputBg,
          color: isCorrect ? "#22c55e" : t.labelColor,
        }}
      >
        {isCorrect ? "✓" : String.fromCharCode(65 + oi)}
      </button>

      <div
        className="flex flex-shrink-0 overflow-hidden rounded-[9px] border"
        style={{ borderColor: t.inputBorder }}
      >
        {[false, true].map((imgMode) => (
          <button
            key={String(imgMode)}
            onClick={() => updateOpt(qid, opt.id, { isImage: imgMode })}
            className="h-[34px] px-[9px] text-[10px] font-bold transition-all"
            style={{
              background: opt.isImage === imgMode ? "var(--clr-accent3)" : t.inputBg,
              color: opt.isImage === imgMode ? "var(--clr-accent)" : t.labelColor,
            }}
          >
            {imgMode ? "IMG" : "TXT"}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {opt.isImage ? (
          <div>
            <div className="relative">
              <input
                placeholder="Paste image URL…"
                value={opt.imageUrl}
                onChange={(e) => updateOpt(qid, opt.id, { imageUrl: e.target.value })}
                className="qph w-full rounded-[10px] border py-3 pl-9 pr-4 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                style={{
                  background: t.inputBg,
                  borderColor: t.inputBorder,
                  color: t.inputText,
                }}
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke={t.labelColor}
                  strokeWidth="1.5"
                />
                <circle cx="8.5" cy="8.5" r="1.5" fill={t.labelColor} />
                <path
                  d="M21 15l-5-5L5 21"
                  stroke={t.labelColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {opt.imageUrl && (
              <img
                src={opt.imageUrl}
                alt=""
                className="mt-1.5 h-11 rounded-md object-cover"
              />
            )}
          </div>
        ) : (
          <input
            placeholder={`Option ${String.fromCharCode(65 + oi)}`}
            value={opt.text}
            onChange={(e) => updateOpt(qid, opt.id, { text: e.target.value })}
            className="qph w-full rounded-[10px] border px-4 py-3 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
            style={{
              background: t.inputBg,
              borderColor: t.inputBorder,
              color: t.inputText,
            }}
          />
        )}
      </div>

      {optionCount > 2 && (
        <button
          onClick={() => removeOption(qid, opt.id)}
          className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border transition-all hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)]"
          style={{
            borderColor: t.inputBorder,
            background: t.inputBg,
            color: t.labelColor,
          }}
        >
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}