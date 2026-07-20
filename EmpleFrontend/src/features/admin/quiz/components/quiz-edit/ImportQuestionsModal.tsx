"use client";

import { RefObject, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Info, Download } from "lucide-react";
import { ThemeTokens } from "./quizEdit.types";
import { ImportedQuestionInput } from "./useQuizEditor";

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
  onImportQuestions: (questions: ImportedQuestionInput[]) => void;
};

type ParsedQuestion = ImportedQuestionInput;

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
  onImportQuestions,
}: Props) {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const acceptedFileLabel = useMemo(() => {
    if (importTab === "excel") return "Excel / CSV";
    if (importTab === "json") return "JSON";
    return "Aiken";
  }, [importTab]);

  if (!open) return null;

  const parseAiken = (text: string): ParsedQuestion[] => {
    const blocks = text
      .trim()
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);

    const questions: ParsedQuestion[] = [];

    for (const block of blocks) {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length < 3) continue;

      const typeLine = lines.find((line) => /^TYPE\s*:/i.test(line));
      const answerLine = lines.find((line) => /^ANSWER\s*:/i.test(line));
      const positiveLine = lines.find((line) => /^POSITIVE\s*:/i.test(line));
      const negativeLine = lines.find((line) => /^NEGATIVE\s*:/i.test(line));
      
      const categoryLine = lines.find((line) => /^CATEGORY\s*:/i.test(line));
      const subcategoryLine = lines.find((line) => /^SUBCATEGORY\s*:/i.test(line));
      const topicLine = lines.find((line) => /^TOPIC\s*:/i.test(line));
      const subtopicLine = lines.find((line) => /^SUBTOPIC\s*:/i.test(line));
      const examLine = lines.find((line) => /^EXAM\s*:/i.test(line));
      const yearLine = lines.find((line) => /^YEAR\s*:/i.test(line));

      const optionLines = lines.filter((line) => /^[A-Z][\.\)]\s+/.test(line));

      // The question text is the first line that is NOT a TYPE, ANSWER, POSITIVE, NEGATIVE, or OPTION line.
      const question = lines.find(
        (line) =>
          !/^TYPE\s*:/i.test(line) &&
          !/^ANSWER\s*:/i.test(line) &&
          !/^POSITIVE\s*:/i.test(line) &&
          !/^NEGATIVE\s*:/i.test(line) &&
          !/^IMAGE\s*:/i.test(line) &&
          !/^SOLUTION\s*:/i.test(line) &&
          !/^SOLUTION_MEDIA\s*:/i.test(line) &&
          !/^CATEGORY\s*:/i.test(line) &&
          !/^SUBCATEGORY\s*:/i.test(line) &&
          !/^TOPIC\s*:/i.test(line) &&
          !/^SUBTOPIC\s*:/i.test(line) &&
          !/^EXAM\s*:/i.test(line) &&
          !/^YEAR\s*:/i.test(line) &&
          !/^[A-Z][\.\)]\s+/.test(line)
      );

      if (!question || !answerLine) continue;

      let parsedType: "MCQ" | "MSQ" | "NAT" | null = null;
      if (typeLine) {
        const t = typeLine.replace(/^TYPE\s*:/i, "").trim().toUpperCase();
        if (t === "MSQ") parsedType = "MSQ";
        else if (t === "NAT") parsedType = "NAT";
        else if (t === "MCQ") parsedType = "MCQ";
      }

      if (parsedType !== "NAT" && !optionLines.length) continue;

      const options = optionLines.map((line) =>
        line.replace(/^[A-Z][\.\)]\s+/, "").trim()
      );

      let correctOptions: string[] = [];

      if (parsedType === "NAT") {
        correctOptions = [answerLine.replace(/^ANSWER\s*:/i, "").trim()];
      } else {
        const correctKeys = answerLine
          .replace(/^ANSWER\s*:/i, "")
          .split(",")
          .map((item) => item.trim().toUpperCase())
          .filter(Boolean);

        correctOptions = correctKeys
          .map((key) => {
            const match = optionLines.find(
              (line) =>
                line.toUpperCase().startsWith(`${key}.`) ||
                line.toUpperCase().startsWith(`${key})`)
            );
            return match?.replace(/^[A-Z][\.\)]\s+/, "").trim();
          })
          .filter((value): value is string => Boolean(value));

        if (!correctOptions.length) continue;
      }

      const positiveMarks = positiveLine
        ? Number(positiveLine.replace(/^POSITIVE\s*:/i, "").trim())
        : 4;

      const negativeMarks = negativeLine
        ? Number(negativeLine.replace(/^NEGATIVE\s*:/i, "").trim())
        : 1;

      const category = categoryLine ? categoryLine.replace(/^CATEGORY\s*:/i, "").trim() : undefined;
      const subcategory = subcategoryLine ? subcategoryLine.replace(/^SUBCATEGORY\s*:/i, "").trim() : undefined;
      const topic = topicLine ? topicLine.replace(/^TOPIC\s*:/i, "").trim() : undefined;
      const subTopic = subtopicLine ? subtopicLine.replace(/^SUBTOPIC\s*:/i, "").trim() : undefined;
      const exam = examLine ? examLine.replace(/^EXAM\s*:/i, "").trim() : undefined;
      const year = yearLine ? parseInt(yearLine.replace(/^YEAR\s*:/i, "").trim(), 10) || undefined : undefined;

      questions.push({
        question,
        options,
        correctOptions,
        questionType: parsedType || (correctOptions.length > 1 ? "MSQ" : "MCQ"),
        positiveMarks: Number.isFinite(positiveMarks) ? positiveMarks : 4,
        negativeMarks: Number.isFinite(negativeMarks) ? negativeMarks : 1,
        category,
        subcategory,
        topic,
        subTopic,
        exam,
        year,
      });
    }

    return questions;
  };

  const parseJSON = (text: string): ParsedQuestion[] => {
    const parsed = JSON.parse(text);
    const arr = Array.isArray(parsed) ? parsed : [parsed];

    return arr
      .map((item: any): ParsedQuestion | null => {
        const question = String(item.question ?? "").trim();
        const rawType = String(item.type ?? item.questionType ?? "").trim().toUpperCase();

        const positiveMarks = Number(item.positiveMarks ?? 4);
        const negativeMarks = Number(item.negativeMarks ?? 1);
        const imageUrl = item.imageUrl ? String(item.imageUrl).trim() : undefined;
        const solution = item.solution ? String(item.solution).trim() : undefined;
        const solutionMedia = item.solutionMedia ? String(item.solutionMedia).trim() : undefined;
        const category = item.category ? String(item.category).trim() : undefined;
        const subcategory = item.subcategory ? String(item.subcategory).trim() : undefined;
        const topic = item.topic ? String(item.topic).trim() : undefined;
        const subTopic = item.subTopic ? String(item.subTopic).trim() : undefined;
        const exam = item.exam ? String(item.exam).trim() : undefined;
        const year = item.year ? Number(item.year) : undefined;

        if (!question) return null;

        if (rawType === "NAT") {
          const natAnswer = String(
            item.answer ?? item.correctAnswer ?? item.correctOptions?.[0] ?? ""
          ).trim();

          return {
            question,
            questionType: "NAT",
            options: [],
            correctOptions: natAnswer ? [natAnswer] : [],
            positiveMarks,
            negativeMarks,
            imageUrl,
            solution,
            solutionMedia,
            category,
            subcategory,
            topic,
            subTopic,
            exam,
            year,
          };
        }

        const options = Array.isArray(item.options)
          ? item.options.map((opt: any) => String(opt).trim()).filter(Boolean)
          : [];

        let correctOptions: string[] = [];

        if (Array.isArray(item.correctOptions)) {
          correctOptions = item.correctOptions
            .map((opt: any) => String(opt).trim())
            .filter(Boolean);
        } else if (item.answer !== undefined) {
          correctOptions = [String(item.answer).trim()].filter(Boolean);
        }

        const questionType =
          rawType === "MSQ" || correctOptions.length > 1 ? "MSQ" : "MCQ";

        return {
          question,
          questionType,
          options,
          correctOptions,
          positiveMarks,
          negativeMarks,
          imageUrl,
          solution,
          solutionMedia,
          category,
          subcategory,
          topic,
          subTopic,
          exam,
          year,
        };
      })
      .filter((item): item is ParsedQuestion => Boolean(item));
  };

  const parseExcel = (rows: Record<string, any>[]): ParsedQuestion[] => {
    const questions: ParsedQuestion[] = [];

    for (const row of rows) {
      const question = String(
        row.question ?? row.Question ?? ""
      ).trim();

      if (!question) continue;

      const rawType = String(
        row.type ?? row.Type ?? row.questionType ?? row.QuestionType ?? ""
      )
        .trim()
        .toUpperCase();

      const positiveMarks = Number(
        row.positiveMarks ?? row.PositiveMarks ?? 4
      );
      const negativeMarks = Number(
        row.negativeMarks ?? row.NegativeMarks ?? 1
      );
      const imageUrl = row.imageUrl ?? row.ImageUrl ?? undefined;
      const solution = row.solution ?? row.Solution ?? undefined;
      const solutionMedia = row.solutionMedia ?? row.SolutionMedia ?? undefined;
      const category = row.category ?? row.Category ?? undefined;
      const subcategory = row.subcategory ?? row.Subcategory ?? undefined;
      const topic = row.topic ?? row.Topic ?? undefined;
      const subTopic = row.subTopic ?? row.SubTopic ?? undefined;
      const exam = row.exam ?? row.Exam ?? undefined;
      const year = row.year ?? row.Year ?? undefined;

      if (rawType === "NAT") {
        const answer = String(
          row.answer ?? row.Answer ?? row.correctAnswer ?? ""
        ).trim();

        questions.push({
          question,
          questionType: "NAT",
          options: [],
          correctOptions: answer ? [answer] : [],
          positiveMarks,
          negativeMarks,
          imageUrl: imageUrl ? String(imageUrl).trim() : undefined,
          solution: solution ? String(solution).trim() : undefined,
          solutionMedia: solutionMedia ? String(solutionMedia).trim() : undefined,
          category: category ? String(category).trim() : undefined,
          subcategory: subcategory ? String(subcategory).trim() : undefined,
          topic: topic ? String(topic).trim() : undefined,
          subTopic: subTopic ? String(subTopic).trim() : undefined,
          exam: exam ? String(exam).trim() : undefined,
          year: year ? Number(year) : undefined,
        });

        continue;
      }

      const options = [
        row.A,
        row.B,
        row.C,
        row.D,
        row.E,
        row.F,
        row.option1,
        row.option2,
        row.option3,
        row.option4,
      ]
        .map((item) => String(item ?? "").trim())
        .filter(Boolean);

      const answerRaw = String(
        row.answer ?? row.Answer ?? row.correctOptions ?? ""
      ).trim();

      let correctOptions: string[] = [];

      if (answerRaw.includes(",")) {
        const answerKeys = answerRaw
          .split(",")
          .map((item) => item.trim().toUpperCase())
          .filter(Boolean);

        const optionMap: Record<string, string | undefined> = {
          A: options[0],
          B: options[1],
          C: options[2],
          D: options[3],
          E: options[4],
          F: options[5],
        };

        correctOptions = answerKeys
          .map((key) => optionMap[key] || key)
          .filter(Boolean) as string[];
      } else {
        const normalized = answerRaw.toUpperCase();
        const optionMap: Record<string, string | undefined> = {
          A: options[0],
          B: options[1],
          C: options[2],
          D: options[3],
          E: options[4],
          F: options[5],
        };

        correctOptions = [
          optionMap[normalized] || answerRaw,
        ].filter(Boolean) as string[];
      }

      questions.push({
        question,
        questionType: rawType === "MSQ" || correctOptions.length > 1 ? "MSQ" : "MCQ",
        options,
        correctOptions,
        positiveMarks,
        negativeMarks,
        imageUrl: imageUrl ? String(imageUrl).trim() : undefined,
        solution: solution ? String(solution).trim() : undefined,
        solutionMedia: solutionMedia ? String(solutionMedia).trim() : undefined,
        category: category ? String(category).trim() : undefined,
        subcategory: subcategory ? String(subcategory).trim() : undefined,
        topic: topic ? String(topic).trim() : undefined,
        subTopic: subTopic ? String(subTopic).trim() : undefined,
        exam: exam ? String(exam).trim() : undefined,
        year: year ? Number(year) : undefined,
      });
    }

    return questions;
  };

  const normalizeParsedQuestions = (
    questions: ParsedQuestion[]
  ): ParsedQuestion[] => {
    return questions.filter((q) => {
      if (!q.question?.trim()) return false;

      if (q.questionType === "NAT") {
        return Boolean(q.correctOptions?.[0]?.trim());
      }

      return (
        Array.isArray(q.options) &&
        q.options.filter((opt) => opt.trim()).length >= 2 &&
        Array.isArray(q.correctOptions) &&
        q.correctOptions.filter((opt) => opt.trim()).length >= 1
      );
    });
  };

  const importParsedQuestions = (questions: ParsedQuestion[]) => {
    const normalized = normalizeParsedQuestions(questions);

    if (!normalized.length) {
      setError("No valid questions found to import.");
      return;
    }

    onImportQuestions(normalized);
  };

  const handleImport = async () => {
    try {
      setImporting(true);
      setError("");

      let parsed: ParsedQuestion[] = [];

      if (importTab === "aiken") {
        parsed = parseAiken(importText);
      } else if (importTab === "json") {
        parsed = parseJSON(importText);
      } else {
        setError("Please upload an Excel or CSV file for this tab.");
        return;
      }

      importParsedQuestions(parsed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to import questions."
      );
    } finally {
      setImporting(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setImporting(true);
      setError("");

      let parsed: ParsedQuestion[] = [];

      if (importTab === "aiken" || importTab === "json") {
        const text = await file.text();
        parsed = importTab === "aiken" ? parseAiken(text) : parseJSON(text);
      } else if (importTab === "excel") {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
          throw new Error("No worksheet found in the uploaded file.");
        }

        const sheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
          defval: "",
        });

        parsed = parseExcel(rows);
      }

      importParsedQuestions(parsed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to read uploaded file."
      );
    } finally {
      setImporting(false);

      if (fileRef.current) fileRef.current.value = "";
      if (aikenFileRef.current) aikenFileRef.current.value = "";
      if (jsonFileRef.current) jsonFileRef.current.value = "";
    }
  };

  const downloadSample = (type: "excel" | "json" | "aiken") => {
    if (type === "aiken") {
      const text = `CATEGORY: Core CS\nSUBCATEGORY: Data Structures\nTOPIC: Array\nSUBTOPIC: Searching\nEXAM: GATE\nYEAR: 2024\nIMAGE: https://example.com/image.png\nSOLUTION: Binary search is O(log n).\nSOLUTION_MEDIA: https://example.com/video.mp4\nTYPE: MCQ\nWhat is the time complexity of binary search?\nA) O(1)\nB) O(n)\nC) O(log n)\nD) O(n log n)\nANSWER: C\nPOSITIVE: 4\nNEGATIVE: 1\n\nTYPE: MSQ\nWhich of the following are prime numbers?\nA. 2\nB. 4\nC. 5\nD. 9\nANSWER: A, C\nPOSITIVE: 4\nNEGATIVE: 1\n\nTYPE: NAT\nWhat is 5 + 7?\nANSWER: 12\nPOSITIVE: 4\nNEGATIVE: 1`;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample_questions.txt";
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "json") {
      const json = [
        {
          type: "MCQ",
          question: "What is the capital of France?",
          options: ["London", "Paris", "Berlin", "Madrid"],
          answer: "Paris",
          positiveMarks: 4,
          negativeMarks: 1,
          imageUrl: "https://example.com/image.png",
          solution: "Paris is the capital of France.",
          solutionMedia: "https://example.com/video.mp4",
          category: "Geography",
          subcategory: "Europe",
          topic: "Capitals",
          subTopic: "France",
          exam: "General Knowledge",
          year: 2024
        },
        {
          type: "MSQ",
          question: "Which of the following are prime numbers?",
          options: ["2", "4", "5", "9"],
          correctOptions: ["2", "5"],
          positiveMarks: 4,
          negativeMarks: 1
        },
        {
          type: "NAT",
          question: "What is 5 + 7?",
          options: [],
          answer: "12",
          positiveMarks: 4,
          negativeMarks: 1
        }
      ];
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample_questions.json";
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "excel") {
      const data = [
        { type: "MCQ", question: "What is the capital of France?", A: "London", B: "Paris", C: "Berlin", D: "Madrid", answer: "Paris", positiveMarks: 4, negativeMarks: 1, imageUrl: "https://example.com/image.png", solution: "Paris is the capital of France.", solutionMedia: "https://example.com/video.mp4", category: "Geography", subcategory: "Europe", topic: "Capitals", subTopic: "France", exam: "General Knowledge", year: 2024 },
        { type: "MSQ", question: "Which of the following are prime numbers?", A: "2", B: "4", C: "5", D: "9", answer: "2,5", positiveMarks: 4, negativeMarks: 1 },
        { type: "NAT", question: "What is 5 + 7?", A: "", B: "", C: "", D: "", answer: "12", positiveMarks: 4, negativeMarks: 1 }
      ];
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Questions");
      XLSX.writeFile(wb, "sample_questions.xlsx");
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5"
    >
      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[18px] border shadow-2xl relative"
        style={{
          background: t.cardBg,
          borderColor: t.cardBorder,
        }}
      >
        <div className="h-1 w-full bg-[var(--clr-accent)] sticky top-0 z-10" />

        <div className="px-7 py-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
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
                  type="button"
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-[var(--muted2)] hover:text-[var(--text)] transition-colors"
                  title="How imports work"
                >
                  <Info size={16} />
                </button>
              </div>
              <p className="mt-1 text-xs" style={{ color: t.subText }}>
                Paste or upload question data in one of the supported formats.
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

          <div
            className="mb-[18px] flex gap-1.5 rounded-[10px] p-1"
            style={{ background: t.inputBg }}
          >
            {(
              [
                ["aiken", "Aiken"],
                ["excel", "Excel / CSV"],
                ["json", "JSON"],
              ] as const
            ).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setImportTab(tab)}
                className="flex-1 rounded-lg px-0 py-2 text-xs font-bold uppercase tracking-[0.06em] transition-all"
                style={{
                  background: importTab === tab ? "var(--clr-accent)" : "transparent",
                  color: importTab === tab ? "#fff" : t.labelColor,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {showInfo && (
            <div
              className="mb-5 rounded-xl border p-4 text-xs leading-[1.6] max-h-[250px] overflow-y-auto"
              style={{
                background: t.inputBg,
                borderColor: t.inputBorder,
                color: t.subText,
              }}
            >
              <h4 className="mb-3 font-bold text-[13px]" style={{ color: t.headingColor }}>
                Comprehensive Import Guide
              </h4>
              
              <div className="space-y-4">
                <div>
                  <strong className="block mb-1" style={{ color: t.headingColor }}>General Rules:</strong>
                  <ul className="ml-4 list-disc space-y-1">
                    <li><strong style={{ color: t.headingColor }}>Question Types:</strong> Use <code className="text-[var(--clr-accent)]">MCQ</code> (Single choice), <code className="text-[var(--clr-accent)]">MSQ</code> (Multiple choices), or <code className="text-[var(--clr-accent)]">NAT</code> (Numerical answer).</li>
                    <li><strong style={{ color: t.headingColor }}>Scoring:</strong> <code className="text-[var(--clr-accent)]">POSITIVE</code> defaults to +4. <code className="text-[var(--clr-accent)]">NEGATIVE</code> defaults to 1.</li>
                    <li><strong style={{ color: t.headingColor }}>Images:</strong> JSON and Excel allow an optional <code className="text-[var(--clr-accent)]">imageUrl</code> column/field for question images.</li>
                  </ul>
                </div>

                <div>
                  <strong className="block mb-1" style={{ color: t.headingColor }}>Aiken Format (.txt):</strong>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Separate each question block with a blank line.</li>
                    <li>Start with an optional <code className="text-[var(--clr-accent)]">TYPE: MCQ</code>.</li>
                    <li>Follow with the question text.</li>
                    <li>Options must start with uppercase letters and a period or parenthesis (e.g., <code className="text-[var(--clr-accent)]">A.</code> or <code className="text-[var(--clr-accent)]">A)</code>).</li>
                    <li><code className="text-[var(--clr-accent)]">ANSWER:</code> is required. For MSQ, use commas (e.g., <code className="text-[var(--clr-accent)]">ANSWER: A, C</code>).</li>
                  </ul>
                </div>

                <div>
                  <strong className="block mb-1" style={{ color: t.headingColor }}>Excel / CSV Format:</strong>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Required headers: <code className="text-[var(--clr-accent)]">question</code>, <code className="text-[var(--clr-accent)]">answer</code>.</li>
                    <li>Option headers: <code className="text-[var(--clr-accent)]">A</code>, <code className="text-[var(--clr-accent)]">B</code>, <code className="text-[var(--clr-accent)]">C</code>, <code className="text-[var(--clr-accent)]">D</code>...</li>
                    <li>Optional headers: <code className="text-[var(--clr-accent)]">type</code>, <code className="text-[var(--clr-accent)]">positiveMarks</code>, <code className="text-[var(--clr-accent)]">negativeMarks</code>, <code className="text-[var(--clr-accent)]">imageUrl</code>.</li>
                    <li>For NAT, leave option columns empty.</li>
                  </ul>
                </div>

                <div>
                  <strong className="block mb-1" style={{ color: t.headingColor }}>JSON Format:</strong>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Must be an array of objects or a single object.</li>
                    <li>Fields: <code className="text-[var(--clr-accent)]">question</code> (string), <code className="text-[var(--clr-accent)]">options</code> (array of strings), <code className="text-[var(--clr-accent)]">answer</code> (string/array).</li>
                    <li>Optional fields: <code className="text-[var(--clr-accent)]">type</code>, <code className="text-[var(--clr-accent)]">positiveMarks</code>, <code className="text-[var(--clr-accent)]">negativeMarks</code>, <code className="text-[var(--clr-accent)]">imageUrl</code>.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {importTab === "aiken" && (
            <div>
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs leading-[1.7]" style={{ color: t.subText }}>
                  Format: <code className="text-[var(--clr-accent)]">TYPE: MCQ</code> (optional) →{" "}
                  question text →{" "}
                  <code className="text-[var(--clr-accent)]">A. option</code> lines →{" "}
                  <code className="text-[var(--clr-accent)]">ANSWER: B</code> (optional{" "}
                  <code className="text-[var(--clr-accent)]">POSITIVE: 4</code>,{" "}
                  <code className="text-[var(--clr-accent)]">NEGATIVE: 1</code>)
                </p>
                <button
                  type="button"
                  onClick={() => downloadSample("aiken")}
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--clr-accent)] px-3 py-1.5 text-[11px] font-bold text-[var(--clr-accent)] transition-all hover:bg-[var(--clr-accent)] hover:text-white whitespace-nowrap ml-2 flex-shrink-0 mt-1"
                >
                  <Download size={13} strokeWidth={2.5} />
                  Download Sample
                </button>
              </div>

              <textarea
                rows={9}
                placeholder={"TYPE: MCQ\nWhat is 2 + 2?\nA. 3\nB. 4\nC. 5\nD. 6\nANSWER: B\nPOSITIVE: 4\nNEGATIVE: 1"}
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
                <span
                  className="whitespace-nowrap text-[11px] font-semibold"
                  style={{ color: t.subText }}
                >
                  OR UPLOAD FILE
                </span>
                <div className="h-px flex-1" style={{ background: t.divider }} />
              </div>

              <div
                onClick={() => aikenFileRef.current?.click()}
                className="mt-3 flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed px-4 py-3 transition-all hover:border-[var(--clr-accent)]"
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

              <input
                ref={aikenFileRef}
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
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
                  Columns: type, question, A, B, C, D, answer, positiveMarks, negativeMarks
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => downloadSample("excel")}
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--clr-accent)] px-4 py-2 text-xs font-bold text-[var(--clr-accent)] transition-all hover:bg-[var(--clr-accent)] hover:text-white"
                  >
                    <Download size={14} strokeWidth={2.5} />
                    Download Sample File
                  </button>
                </div>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

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
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs leading-[1.7]" style={{ color: t.subText }}>
                  Array of:{" "}
                  <code className="text-[var(--clr-accent)]">
                    {"{ type, question, options[], answer, positiveMarks, negativeMarks }"}
                  </code>
                </p>
                <button
                  type="button"
                  onClick={() => downloadSample("json")}
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--clr-accent)] px-3 py-1.5 text-[11px] font-bold text-[var(--clr-accent)] transition-all hover:bg-[var(--clr-accent)] hover:text-white whitespace-nowrap ml-2 flex-shrink-0 mt-1"
                >
                  <Download size={13} strokeWidth={2.5} />
                  Download Sample
                </button>
              </div>

              <textarea
                rows={6}
                placeholder={'[\n  {\n    "question": "What is 2+2?",\n    "options": ["3","4","5","6"],\n    "answer": "4",\n    "positiveMarks": 1,\n    "negativeMarks": 0\n  }\n]'}
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
                <span
                  className="whitespace-nowrap text-[11px] font-semibold"
                  style={{ color: t.subText }}
                >
                  OR UPLOAD FILE
                </span>
                <div className="h-px flex-1" style={{ background: t.divider }} />
              </div>

              <div
                onClick={() => jsonFileRef.current?.click()}
                className="mt-3 flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed px-4 py-3 transition-all hover:border-[var(--clr-accent)]"
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

              <input
                ref={jsonFileRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </div>
          )}

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

          <div className="mt-5 flex items-center justify-between gap-2.5">
            <div className="text-[11px]" style={{ color: t.subText }}>
              Supported format: {acceptedFileLabel}
            </div>

            <div className="flex gap-2.5">
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

              {(importTab === "aiken" || importTab === "json") && (
                <button
                  onClick={handleImport}
                  disabled={importing || !importText.trim()}
                  className="rounded-[10px] bg-[var(--clr-accent)] px-5 py-[9px] text-[13px] font-bold text-white disabled:opacity-60"
                >
                  {importing ? "Importing..." : "Import"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}