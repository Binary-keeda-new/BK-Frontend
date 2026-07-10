"use client";

import { useEffect, useRef, useState } from "react";
import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";
import { THEMES } from "./quiz-edit/QuizEdit.theme";
import { QuizEditProps, ThemeMode } from "./quiz-edit/quizEdit.types";
import {
  ImportedQuestionInput,
  useQuizEditor,
} from "./quiz-edit/useQuizEditor";
import QuizEditHeader from "./quiz-edit/QuizEditHeader";
import QuizDurationCard from "./quiz-edit/QuizDurationCard";
import QuestionPills from "./quiz-edit/QuestionPills";
import QuestionEditorCard from "./quiz-edit/QuestionEditorCard";
import QuizPublishBar from "./quiz-edit/QuizPublishBar";
import ImportQuestionBank from "./quiz-edit/ImportQuestionBank";
import ImportQuestionsModal from "./quiz-edit/ImportQuestionsModal";
import ToastContainer from "../../question-bank/components/ToastContainer";
import { apiRequest } from "@/shared/utils/api";

export default function QuizEdit({ quizId, onClose }: QuizEditProps) {
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    category: "" as keyof typeof QUIZ_CATEGORIES | "",
    subcategory: "",
    marks: "",
    numberOfQuestions: "",
  });

  const [savingQuizDetails, setSavingQuizDetails] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("0");
  const [importTab, setImportTab] = useState<"aiken" | "excel" | "json">("aiken");
  const [importText, setImportText] = useState("");
  const [showQuestionBankImport, setShowQuestionBankImport] = useState(false);
  const [showFileImport, setShowFileImport] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const aikenFileRef = useRef<HTMLInputElement>(null);
  const jsonFileRef = useRef<HTMLInputElement>(null);

  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "error" }[]
  >([]);
  const toastId = useRef(0);

  const removeToast = (id: number) => {
  setToasts((prev) => prev.filter((t) => t.id !== id))
}

  const t = THEMES[theme];

  const addToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const {
    questions,
    activeQ,
    setActiveQ,
    loading,
    saving,
    updateQ,
    updateOpt,
    addOption,
    removeOption,
    toggleCorrect,
    addQuestion,
    appendQuestions,
    deleteQuestion,
    saveAllValidQuestions,
    loadQuiz,
    quiz,
    isQuestionValidForSave,
  } = useQuizEditor(quizId);

  useEffect(() => {
  if (!quiz) return;

  setQuizForm({
    title: quiz.title || "",
    description: quiz.description || "",
    category: (quiz.category as keyof typeof QUIZ_CATEGORIES) || "",
    subcategory: quiz.subcategory || "",
    marks: String(quiz.totalMarks || ""),
    numberOfQuestions: String(quiz.numberOfQuestions || ""),
  });

  const totalSeconds = Number(quiz.duration || 0) * 60;
setMinutes(String(Math.floor(totalSeconds / 60)));
setSeconds(String(totalSeconds % 60));
}, [quiz]);

  const handleQuizMetaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setQuizForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuizCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as keyof typeof QUIZ_CATEGORIES | "";

    setQuizForm((prev) => ({
      ...prev,
      category: value,
      subcategory: "",
    }));
  };

const handleSaveQuizDetails = async () => {
  setSavingQuizDetails(true);

  try {
    await apiRequest(`/api/v1/admin/quizzes/${quizId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: quizForm.title,
        description: quizForm.description,
        category: quizForm.category,
        subcategory: quizForm.subcategory,
        marks: Number(quizForm.marks),
        numberOfQuestions: Number(quizForm.numberOfQuestions),
        duration: Math.ceil(
          (Number(minutes || 0) * 60 + Number(seconds || 0)) / 60
        ),
      }),
    });

    await loadQuiz();
    addToast("Quiz details saved successfully!", "success");
    return true;
  } catch (error) {
    addToast(
      error instanceof Error ? error.message : "Failed to update quiz",
      "error"
    );
    return false;
  } finally {
    setSavingQuizDetails(false);
  }
};

  const handleImportedQuestions = (imported: ImportedQuestionInput[]) => {
    if (!imported.length) {
      addToast("No valid questions found to import", "error");
      return;
    }

    appendQuestions(imported);
    setShowFileImport(false);
    setImportText("");
    setImportTab("aiken");
    addToast(
      `${imported.length} question${imported.length > 1 ? "s" : ""} imported to editor`,
      "success"
    );
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-[var(--clr-text2)]">
        Loading quiz...
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div
        className="transition-colors duration-300"
        style={{
          background: t.pageBg,
          fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Nunito:wght@700;800;900&display=swap');
          ::-webkit-scrollbar{width:4px}
          ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px}
          .qph::placeholder{color:${t.inputPlaceholder}}
        `}</style>

        <div className="mx-auto max-w-[860px] px-5 pb-20 pt-9">
          <QuizEditHeader
            t={t}
            title={quizForm.title}
            description={quizForm.description}
            category={quizForm.category}
            subcategory={quizForm.subcategory}
            marks={quizForm.marks}
            onChange={handleQuizMetaChange}
            onCategoryChange={handleQuizCategoryChange}
            onSave={handleSaveQuizDetails}
            numberOfQuestions={quizForm.numberOfQuestions}
            saving={savingQuizDetails}
          />

          <QuizDurationCard
          seconds={seconds}
            minutes={minutes}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            t={t}
          />

          <QuestionPills
            questions={questions}
            activeQ={activeQ}
            setActiveQ={setActiveQ}
            addQuestion={addQuestion}
            t={t}
          />

          <div className="mt-6 flex flex-col gap-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                id={`question-${question.id}`}
                className="scroll-mt-24"
              >
                <QuestionEditorCard
                  aq={question}
                  aqIdx={index}
                  questions={questions}
                  t={t}
                  onOpenQuestionBankImport={() => setShowQuestionBankImport(true)}
                  onOpenFileImport={() => setShowFileImport(true)}
                  deleteQuestion={deleteQuestion}
                  updateQ={updateQ}
                  updateOpt={updateOpt}
                  toggleCorrect={toggleCorrect}
                  removeOption={removeOption}
                  addOption={addOption}
                  setActiveQ={setActiveQ}
                  addQuestion={addQuestion}
                />
              </div>
            ))}
          </div>

          <QuizPublishBar
            t={t}
            saving={saving || savingQuizDetails}
            onPublish={async () => {
  try {
    if (!questions.length) {
      addToast("Add at least one question before publishing", "error");
      return;
    }

    const hasValid = questions.some((q) => isQuestionValidForSave(q));

    if (!hasValid) {
      addToast("No valid questions to publish", "error");
      return;
    }

    await saveAllValidQuestions();

    const metaSaved = await handleSaveQuizDetails();
    if (!metaSaved) return;

    addToast("Quiz published successfully!", "success");

    setTimeout(() => {
      onClose?.();
    }, 800);
  } catch (err) {
    console.error(err);
    addToast(
      err instanceof Error ? err.message : "Publish failed",
      "error"
    );
  }
}}
          />

          <ImportQuestionBank
            open={showQuestionBankImport}
            onClose={() => setShowQuestionBankImport(false)}
            t={t}
            quizId={quizId}
            onImported={() => {
              setShowQuestionBankImport(false);
              loadQuiz();
            }}
          />

          <ImportQuestionsModal
            open={showFileImport}
            onClose={() => setShowFileImport(false)}
            importTab={importTab}
            setImportTab={setImportTab}
            importText={importText}
            setImportText={setImportText}
            t={t}
            fileRef={fileRef}
            aikenFileRef={aikenFileRef}
            jsonFileRef={jsonFileRef}
            onImportQuestions={handleImportedQuestions}
          />
        </div>
      </div>
    </>
  );
}