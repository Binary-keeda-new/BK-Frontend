import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/shared/utils/api';
import { Option, Question } from './quizEdit.types';
import { blankOption, blankQuestion, mkId } from './quizEdit.utils';

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
  solution?: string | null;
  solutionMedia?: string | null;
  category: string;
  subcategory: string;
  topic: string;
  subTopic?: string;
  exam?: string;
  year?: number | null;
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
    numberOfQuestions: number;
    duration?: number;
    status: 'draft' | 'published' | 'archived';
    questions: BackendQuizQuestion[];
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type QuizMeta = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  duration?: number;
  status: 'draft' | 'published' | 'archived';
  numberOfQuestions: number;
};

export type ImportedQuestionInput = {
  question: string;
  questionType?: 'MCQ' | 'MSQ' | 'NAT';
  options?: string[];
  correctOptions?: string[];
  positiveMarks?: number;
  negativeMarks?: number;
  imageUrl?: string | null;
  solution?: string | null;
  solutionMedia?: string | null;
  category?: string;
  subcategory?: string;
  topic?: string;
  subTopic?: string;
  exam?: string;
  year?: number | null;
};

const mapBackendQuestionToEditor = (q: BackendQuizQuestion): Question => {
  const optionObjects: Option[] = (q.options || []).map((text, index) => ({
    id: `${q._id}-opt-${index + 1}`,
    text,
    isImage: false,
    imageUrl: '',
    solution: q.solution || '',
solutionMedia: q.solutionMedia || '',
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
    solution: q.solution || '',
    solutionMedia: q.solutionMedia || '',
    category: q.category || '',
    subcategory: q.subcategory || '',
    topic: q.topic || '',
    subTopic: q.subTopic || '',
    exam: q.exam || '',
    year: q.year ?? null,
    isPersisted: true,
  };
};

const createImportedQuestion = (q: ImportedQuestionInput): Question => {
  const type =
    q.questionType ??
    ((q.correctOptions?.length ?? 0) > 1 ? 'MSQ' : 'MCQ');

  if (type === 'NAT') {
    return {
      id: mkId(),
      question: q.question?.trim() || '',
      type: 'NAT',
      options: [],
      correct: [],
      natAnswer: q.correctOptions?.[0]?.trim() || '',
      positiveMarks: q.positiveMarks ?? 4,
      negativeMarks: q.negativeMarks ?? 1,
      imageUrl: q.imageUrl || '',
      solution: q.solution || '',
      solutionMedia: q.solutionMedia || '',
      category: q.category || '',
      subcategory: q.subcategory || '',
      topic: q.topic || '',
      subTopic: q.subTopic || '',
      exam: q.exam || '',
      year: q.year ?? null,
      isPersisted: false,
    };
  }

  const optionObjects: Option[] = (q.options || [])
    .map((text) => text?.trim())
    .filter(Boolean)
    .map((text) => ({
      id: mkId(),
      text,
      isImage: false,
      imageUrl: '',
    }));

  const correctTextSet = new Set(
    (q.correctOptions || []).map((item) => item.trim()).filter(Boolean)
  );

  const correctIds = optionObjects
    .filter((opt) => correctTextSet.has(opt.text))
    .map((opt) => opt.id);

  return {
    id: mkId(),
    question: q.question?.trim() || '',
    type,
    options: optionObjects,
    correct: correctIds,
    natAnswer: '',
    positiveMarks: q.positiveMarks ?? 4,
    negativeMarks: q.negativeMarks ?? 1,
    imageUrl: q.imageUrl || '',
    solution: q.solution || '',
    solutionMedia: q.solutionMedia || '',
    category: q.category || '',
    subcategory: q.subcategory || '',
    topic: q.topic || '',
    subTopic: q.subTopic || '',
    exam: q.exam || '',
    year: q.year ?? null,
    isPersisted: false,
  };
};

const mapEditorQuestionToPayload = (quizId: string, q: Question) => {
  if (q.type === 'NAT') {
    return {
      quizId,
      question: q.question.trim(),
      questionType: 'NAT',
      options: [],
      correctOptions: q.natAnswer?.trim() ? [q.natAnswer.trim()] : [],
      positiveMarks: Number(q.positiveMarks || 0),
      negativeMarks: Number(q.negativeMarks || 0),
      imageUrl: q.imageUrl?.trim() || null,
      solution: q.solution?.trim() || null,
      solutionMedia: q.solutionMedia?.trim() || null,
      category: q.category?.trim() || '',
      subcategory: q.subcategory?.trim() || '',
      topic: q.topic?.trim() || '',
      subTopic: q.subTopic?.trim() || '',
      exam: q.exam?.trim() || '',
      year: q.year ?? null,
    };
  }

  const options = q.options.map((opt) => opt.text.trim()).filter(Boolean);

  const correctOptions = q.options
    .filter((opt) => q.correct.includes(opt.id))
    .map((opt) => opt.text.trim())
    .filter(Boolean);

  return {
    quizId,
    question: q.question.trim(),
    questionType: q.type,
    options,
    correctOptions,
    positiveMarks: Number(q.positiveMarks || 0),
    negativeMarks: Number(q.negativeMarks || 0),
    imageUrl: q.imageUrl?.trim() || null,
    solution: q.solution?.trim() || null,
    solutionMedia: q.solutionMedia?.trim() || null,
    category: q.category?.trim() || undefined,
    subcategory: q.subcategory?.trim() || undefined,
    topic: q.topic?.trim() || undefined,
    subTopic: q.subTopic?.trim() || undefined,
    exam: q.exam?.trim() || undefined,
    year: q.year ?? null,
  };
};

export function useQuizEditor(quizId: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQ, setActiveQ] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [quiz, setQuiz] = useState<QuizMeta | null>(null);

  const aq = useMemo(
    () => questions.find((q) => q.id === activeQ) ?? questions[0],
    [questions, activeQ]
  );

  const aqIdx = useMemo(
    () => questions.findIndex((q) => q.id === aq?.id),
    [questions, aq]
  );

  const isQuestionValidForSave = useCallback((q: Question) => {
    if (!q.question?.trim()) return false;

    // Metadata is optional or inherited, so we don't strictly require it here to save.

    if (q.type === 'NAT') {
      return !!q.natAnswer?.trim();
    }

    const filledOptions = q.options.filter((opt) => opt.text?.trim());

    if (filledOptions.length < 2) return false;

    if (q.type === 'MCQ' && q.correct.length !== 1) return false;
    if (q.type === 'MSQ' && q.correct.length < 2) return false;

    const validOptionIds = new Set(filledOptions.map((opt) => opt.id));

    for (const correctId of q.correct) {
      if (!validOptionIds.has(correctId)) return false;
    }

    return true;
  }, []);

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);

      const result = await apiRequest<BackendQuizResponse>(
        `/api/v1/admin/quizzes/${quizId}`,
        {
          method: 'GET',
        }
      );

      setQuiz({
        _id: result.data._id,
        title: result.data.title,
        description: result.data.description,
        category: result.data.category,
        subcategory: result.data.subcategory,
        totalMarks: result.data.totalMarks,
        status: result.data.status,
        duration: result.data.duration,
        numberOfQuestions: result.data.numberOfQuestions,
      });

      const mappedQuestions = (result.data.questions || []).map(
        mapBackendQuestionToEditor
      );

      if (mappedQuestions.length > 0) {
        setQuestions(mappedQuestions);
        setActiveQ((prev) =>
          mappedQuestions.some((q) => q.id === prev)
            ? prev
            : mappedQuestions[0].id
        );
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

  const updateQ = useCallback((id: string, patch: Partial<Question>) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  }, []);

  const updateOpt = useCallback(
    (qid: string, oid: string, patch: Partial<Option>) => {
      setQuestions((qs) =>
        qs.map((q) =>
          q.id === qid
            ? {
                ...q,
                options: q.options.map((o) =>
                  o.id === oid ? { ...o, ...patch } : o
                ),
              }
            : q
        )
      );
    },
    []
  );

  const addOption = useCallback((qid: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid ? { ...q, options: [...q.options, blankOption()] } : q
      )
    );
  }, []);

  const removeOption = useCallback((qid: string, oid: string) => {
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
  }, []);

  const toggleCorrect = useCallback((qid: string, oid: string) => {
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
  }, []);

  const addQuestion = useCallback(() => {
    const nq = blankQuestion();
    setQuestions((qs) => [...qs, nq]);
    setActiveQ(nq.id);
  }, []);

  const appendQuestions = useCallback((incoming: ImportedQuestionInput[]) => {
    if (!incoming.length) return;

    const mapped = incoming.map(createImportedQuestion);

    setQuestions((prev) => [...prev, ...mapped]);
    setActiveQ(mapped[0].id);
  }, []);

  const replaceQuestions = useCallback((incoming: ImportedQuestionInput[]) => {
    if (!incoming.length) {
      const initial = blankQuestion();
      setQuestions([initial]);
      setActiveQ(initial.id);
      return;
    }

    const mapped = incoming.map(createImportedQuestion);
    setQuestions(mapped);
    setActiveQ(mapped[0].id);
  }, []);

  const persistQuestion = useCallback(
    async (question: Question) => {
      const payload = mapEditorQuestionToPayload(quizId, question);

      if (question.isPersisted) {
        const result = await apiRequest<ApiResponse<BackendQuizQuestion>>(
          `/api/v1/admin/quiz-questions/${question.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(payload),
          }
        );

        return result.data;
      }

      const result = await apiRequest<ApiResponse<BackendQuizQuestion>>(
        '/api/v1/admin/quiz-questions',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

      return result.data;
    },
    [quizId]
  );

  const saveQuestion = useCallback(
    async (question: Question) => {
      if (!isQuestionValidForSave(question)) {
        throw new Error('Question is incomplete');
      }

      setSaving(true);
      try {
        await persistQuestion(question);
        await loadQuiz();
      } finally {
        setSaving(false);
      }
    },
    [isQuestionValidForSave, persistQuestion, loadQuiz]
  );

  const saveAllValidQuestions = useCallback(async () => {
    const validQuestions = questions.filter(isQuestionValidForSave);

    if (!validQuestions.length) return;

    setSaving(true);
    try {
      for (const q of validQuestions) {
        await persistQuestion(q);
      }
      await loadQuiz();
    } finally {
      setSaving(false);
    }
  }, [questions, isQuestionValidForSave, persistQuestion, loadQuiz]);

  const deleteQuestion = useCallback(
    async (id: string) => {
      const target = questions.find((q) => q.id === id);

      if (!target) return;

      if (!target.isPersisted) {
        setQuestions((prev) => {
          if (prev.length === 1) return prev;
          const next = prev.filter((q) => q.id !== id);
          if (activeQ === id) setActiveQ(next[0]?.id ?? '');
          return next;
        });
        return;
      }

      await apiRequest<ApiResponse<null>>(
        `/api/v1/admin/quiz-questions/${id}`,
        {
          method: 'DELETE',
        }
      );

      await loadQuiz();
    },
    [questions, activeQ, loadQuiz]
  );

  const bulkDeleteQuestions = useCallback(
    async (ids: string[]) => {
      await apiRequest<ApiResponse<null>>(
        '/api/v1/admin/quiz-questions/bulk-delete',
        {
          method: 'DELETE',
          body: JSON.stringify({ ids }),
        }
      );

      await loadQuiz();
    },
    [loadQuiz]
  );

  const importQuestionsFromBank = useCallback(
    async (questionIds: string[]) => {
      await apiRequest<ApiResponse<BackendQuizQuestion[]>>(
        '/api/v1/admin/quiz-questions/import',
        {
          method: 'POST',
          body: JSON.stringify({
            quizId,
            questionIds,
          }),
        }
      );

      await loadQuiz();
    },
    [quizId, loadQuiz]
  );

  return {
    questions,
    activeQ,
    setActiveQ,
    aq,
    aqIdx,
    loading,
    saving,
    quiz,
    loadQuiz,
    updateQ,
    updateOpt,
    addOption,
    removeOption,
    toggleCorrect,
    addQuestion,
    appendQuestions,
    replaceQuestions,
    deleteQuestion,
    saveQuestion,
    saveAllValidQuestions,
    bulkDeleteQuestions,
    importQuestionsFromBank,
    isQuestionValidForSave,
  };
}