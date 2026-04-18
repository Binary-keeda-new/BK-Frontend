import { RefObject } from "react";
import { ThemeTokens } from "./quizEdit.types";

type ImportTab = "aiken" | "excel" | "json";

type Props = {
  open: boolean;
  onClose: () => void;
  importTab: ImportTab;
  setImportTab: (tab: ImportTab) => void;
  importText: string;
  setImportText: (value: string) => void;
  t: ThemeTokens;
  fileRef: RefObject<HTMLInputElement | null>;
  aikenFileRef: RefObject<HTMLInputElement | null>;
  jsonFileRef: RefObject<HTMLInputElement | null>;
};

export default function ImportQuestionsModal({
  open,
  onClose,
  importTab,
  setImportTab,
  importText,
  setImportText,
  t,
  fileRef,
  aikenFileRef,
  jsonFileRef,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5"
    >
      <div
        className="w-full max-w-[560px] overflow-hidden rounded-[18px] border"
        style={{
          background: t.cardBg,
          borderColor: t.cardBorder,
        }}
      >
        <div className="h-1 bg-[var(--clr-accent)]" />

        <div className="px-7 py-6">
          <div className="mb-5 flex items-center justify-between">
            <h3
              className="text-lg font-extrabold"
              style={{
                fontFamily: "'Nunito',sans-serif",
                color: t.headingColor,
              }}
            >
              Import Questions
            </h3>

            <button
              onClick={onClose}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border"
              style={{
                borderColor: t.cardBorder,
                background: t.inputBg,
                color: t.labelColor,
              }}
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="mb-[18px] flex gap-1.5 rounded-[10px] p-1" style={{ background: t.inputBg }}>
            {(["aiken", "excel", "json"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setImportTab(tab)}
                className="flex-1 rounded-lg px-0 py-2 text-xs font-bold uppercase tracking-[0.06em] transition-all"
                style={{
                  background: importTab === tab ? "var(--clr-accent)" : "transparent",
                  color: importTab === tab ? "#fff" : t.labelColor,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {importTab === "aiken" && (
            <div>
              <p className="mb-3 text-xs leading-[1.7]" style={{ color: t.subText }}>
                Format: question text → <code className="text-[var(--clr-accent)]">A. option</code> lines →{" "}
                <code className="text-[var(--clr-accent)]">ANSWER: B</code>
              </p>

              <textarea
                rows={6}
                placeholder={"What is 2 + 2?\nA. 3\nB. 4\nC. 5\nD. 6\nANSWER: B"}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="qph w-full resize-y rounded-[10px] border px-4 py-3 font-mono text-xs outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                style={{
                  background: t.inputBg,
                  borderColor: t.inputBorder,
                  color: t.inputText,
                }}
              />

              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-px flex-1" style={{ background: t.divider }} />
                <span className="whitespace-nowrap text-[11px] font-semibold" style={{ color: t.subText }}>
                  OR UPLOAD FILE
                </span>
                <div className="h-px flex-1" style={{ background: t.divider }} />
              </div>

              <div
                onClick={() => aikenFileRef.current?.click()}
                className="mt-3 flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed px-4 py-3 transition-all"
                style={{
                  borderColor: t.inputBorder,
                  background: t.inputBg,
                }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] border border-[var(--clr-accent)] bg-[var(--clr-accent3)]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke="var(--clr-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: t.headingColor }}>
                    Upload .txt file
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: t.subText }}>
                    Plain text in Aiken format
                  </div>
                </div>
              </div>

              <input ref={aikenFileRef} type="file" accept=".txt" className="hidden" />
            </div>
          )}

          {importTab === "excel" && (
            <div className="flex flex-col items-center gap-3.5 py-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-[14px] border-2 border-dashed border-[var(--clr-accent)] bg-[var(--clr-accent3)]">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                    stroke="var(--clr-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="text-center">
                <div className="mb-1 text-sm font-semibold" style={{ color: t.headingColor }}>
                  Upload Excel / CSV
                </div>
                <div className="text-xs" style={{ color: t.subText }}>
                  Columns: Question, A, B, C, D, Answer, +Marks, −Marks
                </div>
              </div>

              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" />

              <button
                onClick={() => fileRef.current?.click()}
                className="rounded-[10px] bg-[var(--clr-accent)] px-6 py-2.5 text-[13px] font-bold text-white"
              >
                Choose File
              </button>
            </div>
          )}

          {importTab === "json" && (
            <div>
              <p className="mb-3 text-xs leading-[1.7]" style={{ color: t.subText }}>
                Array of:{" "}
                <code className="text-[var(--clr-accent)]">
                  {"{ question, options[], answer, posMarks, negMarks }"}
                </code>
              </p>

              <textarea
                rows={6}
                placeholder={'[\n  {\n    "question": "What is 2+2?",\n    "options": ["3","4","5","6"],\n    "answer": "4",\n    "posMarks": 1,\n    "negMarks": 0\n  }\n]'}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="qph w-full resize-y rounded-[10px] border px-4 py-3 font-mono text-xs outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                style={{
                  background: t.inputBg,
                  borderColor: t.inputBorder,
                  color: t.inputText,
                }}
              />

              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-px flex-1" style={{ background: t.divider }} />
                <span className="whitespace-nowrap text-[11px] font-semibold" style={{ color: t.subText }}>
                  OR UPLOAD FILE
                </span>
                <div className="h-px flex-1" style={{ background: t.divider }} />
              </div>

              <div
                onClick={() => jsonFileRef.current?.click()}
                className="mt-3 flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed px-4 py-3 transition-all"
                style={{
                  borderColor: t.inputBorder,
                  background: t.inputBg,
                }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] border border-[var(--clr-accent)] bg-[var(--clr-accent3)]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke="var(--clr-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: t.headingColor }}>
                    Upload .json file
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: t.subText }}>
                    Standard JSON array format
                  </div>
                </div>
              </div>

              <input ref={jsonFileRef} type="file" accept=".json" className="hidden" />
            </div>
          )}

          <div className="mt-5 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              className="rounded-[10px] border px-[18px] py-[9px] text-[13px] font-semibold"
              style={{
                borderColor: t.cardBorder,
                color: t.labelColor,
                background: "transparent",
              }}
            >
              Cancel
            </button>

            <button className="rounded-[10px] bg-[var(--clr-accent)] px-5 py-[9px] text-[13px] font-bold text-white">
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}