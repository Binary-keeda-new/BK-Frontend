import { useState } from "react";
import { Option, Question } from "./quizEdit.types";
import { blankOption, blankQuestion } from "./quizEdit.utils";

export function useQuizEditor() {
  const [questions, setQuestions] = useState<Question[]>([blankQuestion()]);
  const [activeQ, setActiveQ] = useState<string>(questions[0].id);

  const aq = questions.find((q) => q.id === activeQ) ?? questions[0];
  const aqIdx = questions.findIndex((q) => q.id === aq.id);

  const updateQ = (id: string, patch: Partial<Question>) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  };

  const updateOpt = (qid: string, oid: string, patch: Partial<Option>) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((o) => (o.id === oid ? { ...o, ...patch } : o)),
            }
          : q
      )
    );
  };

  const addOption = (qid: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid ? { ...q, options: [...q.options, blankOption()] } : q
      )
    );
  };

  const removeOption = (qid: string, oid: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== oid),
              correct: q.correct.filter((c) => c !== oid),
            }
          : q
      )
    );
  };

  const toggleCorrect = (qid: string, oid: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid
          ? {
              ...q,
              correct: q.correct.includes(oid)
                ? q.correct.filter((c) => c !== oid)
                : [...q.correct, oid],
            }
          : q
      )
    );
  };

  const addQuestion = () => {
    const nq = blankQuestion();
    setQuestions((qs) => [...qs, nq]);
    setActiveQ(nq.id);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => {
      if (prev.length === 1) return prev;

      const next = prev.filter((q) => q.id !== id);

      if (activeQ === id) {
        const deletedIndex = prev.findIndex((q) => q.id === id);
        const fallbackIndex = Math.max(0, deletedIndex - 1);
        setActiveQ(next[fallbackIndex]?.id ?? next[0].id);
      }

      return next;
    });
  };

  return {
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
  };
}