import { useCallback, useEffect, useMemo, useState } from 'react';
import { Option, Question } from './quizEdit.types';
import { blankOption, blankQuestion } from './quizEdit.utils';

const API_BASE = 'http://localhost:5000/api/v1/admin';

type BackendQuizQuestion = {
  _id: string;
  quizId: string;
  question: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  options: string[];
  correctOptions: string[];
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string | null;
};

type BackendQuizResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    description?: string;
    category: string;
    subcategory: string;
    totalMarks: number;
    status: 'draft' | 'published' | 'archived';
    questions: BackendQuizQuestion[];
  };
};

const mapBackendQuestionToEditor = (q: BackendQuizQuestion): Question => {
  const optionObjects: Option[] = (q.options || []).map((text, index) => ({
    id: `${q._id}-opt-${index + 1}`,
    text,
  }));

  const correctIds = optionObjects
    .filter((opt) => q.correctOptions.includes(opt.text))
    .map((opt) => opt.id);

  return {
    id: q._id,
    question: q.question,
    type: q.questionType,
    options: q.questionType === 'NAT' ? [] : optionObjects,
    correct: q.questionType === 'NAT' ? [] : correctIds,
    natAnswer: q.questionType === 'NAT' ? q.correctOptions[0] || '' : '',
    positiveMarks: q.positiveMarks ?? 4,
    negativeMarks: q.negativeMarks ?? 1,
    imageUrl: q.imageUrl || '',
    isPersisted: true,
  };
};

const mapEditorQuestionToPayload = (quizId: string, q: Question) => {
  if (q.type === 'NAT') {
    return {
      quizId,
      question: q.question,
      questionType: 'NAT',
      options: [],
      correctOptions: q.natAnswer?.trim() ? [q.natAnswer.trim()] : [],
      positiveMarks: Number(q.positiveMarks || 0),
      negativeMarks: Number(q.negativeMarks || 0),
      imageUrl: q.imageUrl?.trim() || null,
    };
  }

  const options = q.options.map((opt) => opt.text.trim()).filter(Boolean);

  const correctOptions = q.options
    .filter((opt) => q.correct.includes(opt.id))
    .map((opt) => opt.text.trim())
    .filter(Boolean);

  return {
    quizId,
    question: q.question,
    questionType: q.type,
    options,
    correctOptions,
    positiveMarks: Number(q.positiveMarks || 0),
    negativeMarks: Number(q.negativeMarks || 0),
    imageUrl: q.imageUrl?.trim() || null,
  };
};

export function useQuizEditor(quizId: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQ, setActiveQ] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const aq = useMemo(
    () => questions.find((q) => q.id === activeQ) ?? questions[0],
    [questions, activeQ]
  );

  const aqIdx = useMemo(
    () => questions.findIndex((q) => q.id === aq?.id),
    [questions, aq]
  );

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/quizzes/${quizId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const result: BackendQuizResponse = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to load quiz');
      }

      const mappedQuestions = (result.data.questions || []).map(
        mapBackendQuestionToEditor
      );

      if (mappedQuestions.length > 0) {
        setQuestions(mappedQuestions);
        setActiveQ(mappedQuestions[0].id);
      } else {
        const initial = blankQuestion();
        setQuestions([initial]);
        setActiveQ(initial.id);
      }
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

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
      qs.map((q) => {
        if (q.id !== qid) return q;

        if (q.type === 'MCQ') {
          return { ...q, correct: [oid] };
        }

        return {
          ...q,
          correct: q.correct.includes(oid)
            ? q.correct.filter((c) => c !== oid)
            : [...q.correct, oid],
        };
      })
    );
  };

  const addQuestion = () => {
    const nq = blankQuestion();
    setQuestions((qs) => [...qs, nq]);
    setActiveQ(nq.id);
  };

  const createManualQuestion = async (question: Question) => {
    const payload = mapEditorQuestionToPayload(quizId, question);

    const res = await fetch(`${API_BASE}/quiz-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to create question');
    }

    await loadQuiz();
    return result.data;
  };

  const saveQuestion = async (question: Question) => {
    const payload = mapEditorQuestionToPayload(quizId, question);

    setSaving(true);
    try {
      if ((question as Question & { isPersisted?: boolean }).isPersisted) {
        const res = await fetch(`${API_BASE}/quiz-questions/${question.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || 'Failed to update question');
        }
      } else {
        await createManualQuestion(question);
      }

      await loadQuiz();
    } finally {
      setSaving(false);
    }
  };

  const deleteQuestion = async (id: string) => {
    const target = questions.find((q) => q.id === id);

    if (!target) return;

    if (!(target as Question & { isPersisted?: boolean }).isPersisted) {
      setQuestions((prev) => {
        if (prev.length === 1) return prev;
        const next = prev.filter((q) => q.id !== id);
        if (activeQ === id) setActiveQ(next[0]?.id ?? '');
        return next;
      });
      return;
    }

    const res = await fetch(`${API_BASE}/quiz-questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to delete question');
    }

    await loadQuiz();
  };

  const bulkDeleteQuestions = async (ids: string[]) => {
    const res = await fetch(`${API_BASE}/quiz-questions/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to bulk delete questions');
    }

    await loadQuiz();
  };

  const importQuestionsFromBank = async (questionIds: string[]) => {
    const res = await fetch(`${API_BASE}/quiz-questions/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId,
        questionIds,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to import questions');
    }

    await loadQuiz();
  };

  return {
    questions,
    activeQ,
    setActiveQ,
    aq,
    aqIdx,
    loading,
    saving,
    loadQuiz,
    updateQ,
    updateOpt,
    addOption,
    removeOption,
    toggleCorrect,
    addQuestion,
    deleteQuestion,
    saveQuestion,
    bulkDeleteQuestions,
    importQuestionsFromBank,
  };
}