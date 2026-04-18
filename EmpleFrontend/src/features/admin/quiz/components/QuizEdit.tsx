"use client";

import { useRef, useState } from "react";
import { THEMES } from "./quiz-edit/QuizEdit.theme";
import { QuizEditProps, ThemeMode } from "./quiz-edit/quizEdit.types";
import { useQuizEditor } from "./quiz-edit/useQuizEditor";
import QuizEditHeader from "./quiz-edit/QuizEditHeader";
import QuizDurationCard from "./quiz-edit/QuizDurationCard";
import QuestionPills from "./quiz-edit/QuestionPills";
import QuestionEditorCard from "./quiz-edit/QuestionEditorCard";
import QuizPublishBar from "./quiz-edit/QuizPublishBar";
import ImportQuestionsModal from "./quiz-edit/ImportQuestionsModal";

export default function QuizEdit({ quizId, onClose }: QuizEditProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [importTab, setImportTab] = useState<"aiken" | "excel" | "json">("aiken");
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const aikenFileRef = useRef<HTMLInputElement>(null);
  const jsonFileRef = useRef<HTMLInputElement>(null);

  const t = THEMES[theme];

  const {
    questions,
    activeQ,
    setActiveQ,
    aq,
    aqIdx,
    updateQ,
    updateOpt,
    addOption,
    removeOption,
    toggleCorrect,
    addQuestion,
    deleteQuestion,
  } = useQuizEditor();

  return (
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
        <QuizEditHeader theme={theme} setTheme={setTheme} t={t} />

        <QuizDurationCard
          hours={hours}
          minutes={minutes}
          setHours={setHours}
          setMinutes={setMinutes}
          t={t}
        />

        <QuestionPills
          questions={questions}
          activeQ={activeQ}
          setActiveQ={setActiveQ}
          addQuestion={addQuestion}
          t={t}
        />

        <QuestionEditorCard
          aq={aq}
          aqIdx={aqIdx}
          questions={questions}
          t={t}
          setShowImport={setShowImport}
          deleteQuestion={deleteQuestion}
          updateQ={updateQ}
          updateOpt={updateOpt}
          toggleCorrect={toggleCorrect}
          removeOption={removeOption}
          addOption={addOption}
          setActiveQ={setActiveQ}
          addQuestion={addQuestion}
        />

        <QuizPublishBar t={t} />

        <ImportQuestionsModal
          open={showImport}
          onClose={() => setShowImport(false)}
          importTab={importTab}
          setImportTab={setImportTab}
          importText={importText}
          setImportText={setImportText}
          t={t}
          fileRef={fileRef}
          aikenFileRef={aikenFileRef}
          jsonFileRef={jsonFileRef}
        />
      </div>
    </div>
  );
}