import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/shared/utils/api';
import {
  ImportedTestQuestionInput,
  Option,
  TestEditorQuestion,
} from './testQuestion.types';
import { blankOption, blankQuestion, mkId } from './testQuestion.utils';

type BackendTestQuestion = {
  _id: string;
  testId: string;
  sectionId: string;
  source?: 'manual' | 'file' | 'question-bank';
  originalQuestionId?: string | null;
  question: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  options: string[];
  correctOptions: string[];
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string | null;
  solution?: string | null;
  solutionMedia?: string | null;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const mapBackendQuestionToEditor = (
  q: BackendTestQuestion
): TestEditorQuestion => {
  const optionObjects: Option[] = (q.options || []).map((text, index) => ({
    id: `${q._id}-opt-${index + 1}`,
    text,
    isImage: false,
    imageUrl: '',
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
    isPersisted: true,
  };
};

const createImportedQuestion = (
  q: ImportedTestQuestionInput
): TestEditorQuestion => {
  const type =
    q.questionType ?? ((q.correctOptions?.length ?? 0) > 1 ? 'MSQ' : 'MCQ');

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
    isPersisted: false,
  };
};

const mapEditorQuestionToPayload = (
  q: TestEditorQuestion,
  source: 'manual' | 'file' | 'question-bank' = 'manual'
) => {
  if (q.type === 'NAT') {
    return {
      source,
      question: q.question.trim(),
      questionType: 'NAT',
      options: [],
      correctOptions: q.natAnswer?.trim() ? [q.natAnswer.trim()] : [],
      positiveMarks: Number(q.positiveMarks || 0),
      negativeMarks: Number(q.negativeMarks || 0),
      imageUrl: q.imageUrl?.trim() || null,
      solution: q.solution?.trim() || null,
      solutionMedia: q.solutionMedia?.trim() || null,
    };
  }

  const options = q.options.map((opt) => opt.text.trim()).filter(Boolean);

  const correctOptions = q.options
    .filter((opt) => q.correct.includes(opt.id))
    .map((opt) => opt.text.trim())
    .filter(Boolean);

  return {
    source,
    question: q.question.trim(),
    questionType: q.type,
    options,
    correctOptions,
    positiveMarks: Number(q.positiveMarks || 0),
    negativeMarks: Number(q.negativeMarks || 0),
    imageUrl: q.imageUrl?.trim() || null,
    solution: q.solution?.trim() || null,
    solutionMedia: q.solutionMedia?.trim() || null,
  };
};

export function useTestSectionQuestions(testId: string, sectionId: string) {
  const [questions, setQuestions] = useState<TestEditorQuestion[]>([]);
  const [activeQ, setActiveQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const activeQuestion = useMemo(
    () => questions.find((q) => q.id === activeQ) ?? questions[0],
    [questions, activeQ]
  );

  const activeQuestionIndex = useMemo(
    () => questions.findIndex((q) => q.id === activeQuestion?.id),
    [questions, activeQuestion]
  );

  const isQuestionValidForSave = useCallback((q: TestEditorQuestion) => {
    if (!q.question?.trim()) return false;

    if (q.type === 'NAT') {
      return Boolean(q.natAnswer?.trim());
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

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);

      const result = await apiRequest<ApiResponse<BackendTestQuestion[]>>(
        `/api/v1/admin/tests/${testId}/sections/${sectionId}/questions`,
        {
          method: 'GET',
        }
      );

      const mappedQuestions = (result.data || []).map(
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
  }, [testId, sectionId]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const updateQ = useCallback((id: string, patch: Partial<TestEditorQuestion>) => {
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

  const appendQuestions = useCallback((incoming: ImportedTestQuestionInput[]) => {
    if (!incoming.length) return;

    const mapped = incoming.map(createImportedQuestion);

    setQuestions((prev) => [...prev, ...mapped]);
    setActiveQ(mapped[0].id);
  }, []);

  const persistQuestion = useCallback(
    async (question: TestEditorQuestion) => {
      const payload = mapEditorQuestionToPayload(question, 'manual');

      if (question.isPersisted) {
        throw new Error('Updating individual test questions is not added yet.');
      }

      const result = await apiRequest<ApiResponse<BackendTestQuestion[]>>(
        `/api/v1/admin/tests/${testId}/sections/${sectionId}/questions`,
        {
          method: 'POST',
          body: JSON.stringify({
            questions: [payload],
          }),
        }
      );

      return result.data?.[0];
    },
    [testId, sectionId]
  );

  const saveAllValidQuestions = useCallback(async () => {
    const unsavedValidQuestions = questions.filter(
      (q) => !q.isPersisted && isQuestionValidForSave(q)
    );

    if (!unsavedValidQuestions.length) return;

    setSaving(true);

    try {
      await apiRequest<ApiResponse<BackendTestQuestion[]>>(
        `/api/v1/admin/tests/${testId}/sections/${sectionId}/questions`,
        {
          method: 'POST',
          body: JSON.stringify({
            questions: unsavedValidQuestions.map((q) =>
              mapEditorQuestionToPayload(q, 'manual')
            ),
          }),
        }
      );

      await loadQuestions();
    } finally {
      setSaving(false);
    }
  }, [questions, isQuestionValidForSave, testId, sectionId, loadQuestions]);

  const deleteQuestion = useCallback(
    async (id: string) => {
      const target = questions.find((q) => q.id === id);

      if (!target) return;

      if (!target.isPersisted) {
        setQuestions((prev) => {
          if (prev.length === 1) return prev;

          const next = prev.filter((q) => q.id !== id);

          if (activeQ === id) {
            setActiveQ(next[0]?.id ?? '');
          }

          return next;
        });

        return;
      }

      await apiRequest<ApiResponse<null>>(
        `/api/v1/admin/test-questions/${id}`,
        {
          method: 'DELETE',
        }
      );

      await loadQuestions();
    },
    [questions, activeQ, loadQuestions]
  );

  return {
    questions,
    activeQ,
    setActiveQ,
    activeQuestion,
    activeQuestionIndex,
    loading,
    saving,
    loadQuestions,
    updateQ,
    updateOpt,
    addOption,
    removeOption,
    toggleCorrect,
    addQuestion,
    appendQuestions,
    deleteQuestion,
    saveAllValidQuestions,
    isQuestionValidForSave,
  };
}