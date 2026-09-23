import { useEffect, useMemo, useState } from "react";
import { apiRequest } from '@/shared/utils/api'

type ThemeTokens = {
  cardBg: string;
  cardBorder: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  headingColor: string;
  labelColor: string;
  subText: string;
  divider: string;
};

type QuestionBank = {
  _id: string;
  title: string;
  description?: string;
};

type BankQuestion = {
  _id: string;
  question: string;
  questionType: "MCQ" | "MSQ" | "NAT";
  positiveMarks: number;
  negativeMarks: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  t: ThemeTokens;
  testId: string;
sectionId: string;
  onImported?: () => void;
};

type QuestionBankListResponse = {
  success: boolean;
  message: string;
  data: QuestionBank[];
};

type BankQuestionListResponse = {
  success: boolean;
  message: string;
  data: BankQuestion[];
};

type ImportQuestionsResponse = {
  success: boolean;
  message: string;
};


export default function ImportTestQuestionBank({
  open,
  onClose,
  t,
  testId,
  sectionId,
  onImported,
}: Props) {
  const [banks, setBanks] = useState<QuestionBank[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string>("");

  const allSelected = useMemo(() => {
    return questions.length > 0 && selectedQuestionIds.length === questions.length;
  }, [questions, selectedQuestionIds]);

  useEffect(() => {
    if (!open) return;

    const fetchBanks = async () => {
  try {
    setLoadingBanks(true);
    setError("");

    const result = await apiRequest<QuestionBankListResponse>(
      "/api/v1/admin/question-banks?page=1&limit=100",
      {
        method: "GET",
      }
    );

    const bankItems = result?.data || [];
    setBanks(bankItems);

    if (bankItems.length > 0) {
      setSelectedBankId(bankItems[0]._id);
    }
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to fetch question banks"
    );
  } finally {
    setLoadingBanks(false);
  }
};
    fetchBanks();
  }, [open]);

  useEffect(() => {
    if (!open || !selectedBankId) return;

    const fetchQuestions = async () => {
  try {
    setLoadingQuestions(true);
    setError("");
    setSelectedQuestionIds([]);

    const result = await apiRequest<BankQuestionListResponse>(
      `/api/v1/admin/question-banks/${selectedBankId}/questions`,
      {
        method: "GET",
      }
    );

    setQuestions(result?.data || []);
  } catch (err) {
    setQuestions([]);
    setError(err instanceof Error ? err.message : "Failed to fetch questions");
  } finally {
    setLoadingQuestions(false);
  }
};

    fetchQuestions();
  }, [open, selectedBankId]);

  const toggleQuestion = (id: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedQuestionIds([]);
    } else {
      setSelectedQuestionIds(questions.map((q) => q._id));
    }
  };

 const handleImport = async () => {
  if (!testId || !sectionId || selectedQuestionIds.length === 0) return;

  try {
    setImporting(true);
    setError("");

    await apiRequest<ImportQuestionsResponse>(
      `/api/v1/admin/tests/${testId}/sections/${sectionId}/questions/import`,
      {
        method: "POST",
        body: JSON.stringify({
          questionIds: selectedQuestionIds,
        }),
      }
    );

    onImported?.();
    onClose();
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to import questions");
  } finally {
    setImporting(false);
  }
};

  if (!open) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5"
    >
      <div
        className="w-full max-w-[760px] overflow-hidden rounded-[18px] border shadow-2xl"
        style={{
          background: t.cardBg,
          borderColor: t.cardBorder,
        }}
      >
        <div className="h-1 bg-[var(--clr-accent)]" />

        <div className="px-7 py-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3
                className="text-lg font-extrabold"
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  color: t.headingColor,
                }}
              >
                Import Questions from Question Bank
              </h3>
              <p className="mt-1 text-xs" style={{ color: t.subText }}>
                Select a question bank, choose questions, and import them into this test section.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border transition-all hover:opacity-90"
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

          <div className="mb-5">
            <label
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: t.labelColor }}
            >
              Question Bank
            </label>

            <select
              value={selectedBankId}
              onChange={(e) => setSelectedBankId(e.target.value)}
              disabled={loadingBanks || banks.length === 0}
              className="w-full rounded-[10px] border px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: t.inputBg,
                borderColor: t.inputBorder,
                color: t.inputText,
              }}
            >
              <option value="">Select question bank</option>
              {banks.map((bank) => (
                <option key={bank._id} value={bank._id}>
                  {bank.title}
                </option>
              ))}
            </select>
          </div>

          <div
            className="rounded-[14px] border"
            style={{
              borderColor: t.cardBorder,
              background: t.inputBg,
            }}
          >
            <div
              className="flex items-center justify-between border-b px-4 py-3"
              style={{ borderColor: t.divider }}
            >
              <div>
                <div className="text-sm font-semibold" style={{ color: t.headingColor }}>
                  Questions
                </div>
                <div className="text-xs" style={{ color: t.subText }}>
                  {selectedQuestionIds.length} selected
                </div>
              </div>

              <button
                type="button"
                onClick={toggleSelectAll}
                disabled={loadingQuestions || questions.length === 0}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-60"
                style={{
                  borderColor: t.cardBorder,
                  color: t.labelColor,
                  background: "transparent",
                }}
              >
                {allSelected ? "Unselect All" : "Select All"}
              </button>
            </div>

            <div className="max-h-[340px] overflow-y-auto">
              {loadingQuestions ? (
                <div className="px-4 py-8 text-sm" style={{ color: t.subText }}>
                  Loading questions...
                </div>
              ) : questions.length === 0 ? (
                <div className="px-4 py-8 text-sm" style={{ color: t.subText }}>
                  No questions found in this question bank.
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: t.divider }}>
                  {questions.map((q, index) => {
                    const checked = selectedQuestionIds.includes(q._id);

                    return (
                      <label
                        key={q._id}
                        className="flex cursor-pointer items-start gap-3 px-4 py-3"
                        style={{
                          background: checked ? "rgba(241,90,34,0.08)" : "transparent",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleQuestion(q._id)}
                          className="mt-1"
                        />

                        <div className="min-w-0 flex-1">
                          <div
                            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
                            style={{ color: t.subText }}
                          >
                            Question {index + 1} · {q.questionType}
                          </div>

                          <div
                            className="line-clamp-2 text-sm font-medium"
                            style={{ color: t.headingColor }}
                          >
                            {q.question}
                          </div>

                          <div className="mt-1 text-[11px]" style={{ color: t.subText }}>
                            +{q.positiveMarks} / -{q.negativeMarks}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div
              className="mt-4 rounded-[10px] border px-4 py-3 text-sm"
              style={{
                borderColor: "rgba(239,68,68,0.35)",
                background: "rgba(239,68,68,0.08)",
                color: "#ef4444",
              }}
            >
              {error}
            </div>
          )}

          <div className="mt-5 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              disabled={importing}
              className="rounded-[10px] border px-[18px] py-[9px] text-[13px] font-semibold disabled:opacity-60"
              style={{
                borderColor: t.cardBorder,
                color: t.labelColor,
                background: "transparent",
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleImport}
              disabled={importing || selectedQuestionIds.length === 0}
              className="rounded-[10px] bg-[var(--clr-accent)] px-5 py-[9px] text-[13px] font-bold text-white disabled:opacity-60"
            >
              {importing ? "Importing..." : "Import Selected"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}