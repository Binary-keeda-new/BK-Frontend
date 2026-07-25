import { useEffect, useState } from 'react';
import type { TestSettings } from '../TestSettingsCard';
import { defaultSettings } from './testEdit.constants';
import * as TestEditApi from './testEdit.api';
import type {
  CodingProblemOption,
  SectionForm,
  SectionType,
  TestForm,
  TestSection,
  ToastItem,
  ToastType,
} from './testEdit.types';

export function useTestEdit(testId: string) {
  const [testForm, setTestForm] = useState<TestForm>({
    title: '',
    description: '',
    totalSections: '',
  });

  const [settings, setSettings] = useState<TestSettings>(defaultSettings);
  const [sections, setSections] = useState<TestSection[]>([]);

  const [loadingTest, setLoadingTest] = useState(true);
  const [savingTest, setSavingTest] = useState(false);

  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState<TestSection | null>(null);
  const [sectionSaving, setSectionSaving] = useState(false);

  const [sectionForm, setSectionForm] = useState<SectionForm>({
    type: 'mcq',
    numberOfQuestions: '',
    duration: '',
    codingProblemIds: [],
  });

  const [codingProblems, setCodingProblems] = useState<CodingProblemOption[]>([]);
  const [loadingCodingProblems, setLoadingCodingProblems] = useState(false);

  const [activeImportSectionId, setActiveImportSectionId] = useState<string | null>(
    null
  );
  const [showQuestionBankImport, setShowQuestionBankImport] = useState(false);
  const [showFileImport, setShowFileImport] = useState(false);

  const [importTab, setImportTab] = useState<'aiken' | 'excel' | 'json'>('aiken');
  const [importText, setImportText] = useState('');
  const [questionRefreshKey, setQuestionRefreshKey] = useState(0);

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const fetchSections = async () => {
    try {
      const result = await TestEditApi.getSections(testId);
      setSections(result.data || []);
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to fetch sections',
        'error'
      );
    }
  };

  const fetchCodingProblems = async () => {
    try {
      setLoadingCodingProblems(true);

      const result = await TestEditApi.getCodingProblems();

      setCodingProblems(
        (result.data || []).filter((problem) => problem.status === 'published')
      );
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to fetch coding problems',
        'error'
      );
    } finally {
      setLoadingCodingProblems(false);
    }
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoadingTest(true);

        const result = await TestEditApi.getTest(testId);

        setTestForm({
          title: result.data.title || '',
          description: result.data.description || '',
          totalSections: String(result.data.totalSections || ''),
        });

        setSettings({
          ...defaultSettings,
          ...result.data.settings,
          deadline: result.data.settings?.deadline
            ? String(result.data.settings.deadline).slice(0, 16)
            : '',
        });

        await fetchSections();
        await fetchCodingProblems();
      } catch (error) {
        addToast(
          error instanceof Error ? error.message : 'Failed to fetch test',
          'error'
        );
      } finally {
        setLoadingTest(false);
      }
    };

    fetchTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const handleTestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setSectionForm((prev) => ({
    ...prev,
    [name]: value,
    ...(name === 'type' && value === 'mcq' ? { codingProblemIds: [] } : {}),
  }));
};

  const toggleCodingProblem = (problemId: string) => {
    setSectionForm((prev) => {
      const exists = prev.codingProblemIds.includes(problemId);

      return {
        ...prev,
        codingProblemIds: exists
          ? prev.codingProblemIds.filter((id) => id !== problemId)
          : [...prev.codingProblemIds, problemId],
      };
    });
  };

  const resetSectionForm = () => {
    setSectionForm({
      type: 'mcq',
      numberOfQuestions: '',
      duration: '',
      codingProblemIds: [],
    });
  };

  const handleOpenAddSection = () => {
    setEditingSection(null);
    resetSectionForm();
    setShowSectionModal(true);
  };

  const handleCloseSectionModal = () => {
    if (sectionSaving) return;

    setShowSectionModal(false);
    setEditingSection(null);
    resetSectionForm();
  };

  const handleEditSection = (section: TestSection) => {
    setEditingSection(section);

    const codingProblemIds = (section.codingProblemIds || []).map((item) =>
      typeof item === 'string' ? item : item._id
    );

    setSectionForm({
      type: section.type,
      numberOfQuestions: String(section.numberOfQuestions),
      duration: String(section.duration),
      codingProblemIds,
    });

    setShowSectionModal(true);
  };

  const handleSaveTestDetails = async () => {
    const title = testForm.title.trim();
    const description = testForm.description.trim();
    const totalSections = Number(testForm.totalSections);

    if (!title || !description || totalSections < 0) {
      addToast('Please fill test details correctly.', 'error');
      return;
    }

    try {
      setSavingTest(true);

      await TestEditApi.saveTestDetails(testId, {
        title,
        description,
        totalSections,
        settings,
      });

      addToast('Test details saved successfully.', 'success');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to save test',
        'error'
      );
    } finally {
      setSavingTest(false);
    }
  };

  const handleSaveSection = async () => {
    const numberOfQuestions = Number(sectionForm.numberOfQuestions);
    const duration = Number(sectionForm.duration);

    if (!sectionForm.type || numberOfQuestions <= 0 || duration <= 0) {
      addToast('Please fill all section fields correctly.', 'error');
      return;
    }

    if (
      sectionForm.type === 'coding' &&
      sectionForm.codingProblemIds.length !== numberOfQuestions
    ) {
      addToast(`Please select exactly ${numberOfQuestions} coding problem(s).`, 'error');
      return;
    }

    const payload = {
      type: sectionForm.type,
      numberOfQuestions,
      duration,
      codingProblemIds:
        sectionForm.type === 'coding' ? sectionForm.codingProblemIds : [],
    };

    try {
      setSectionSaving(true);

      if (editingSection) {
        await TestEditApi.updateSection(editingSection._id, payload);
        await fetchSections();
        handleCloseSectionModal();
        addToast('Section updated successfully.', 'success');
        return;
      }

      await TestEditApi.createSection(testId, payload);
      await fetchSections();
      handleCloseSectionModal();
      addToast('Section added successfully.', 'success');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to save section',
        'error'
      );
    } finally {
      setSectionSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      await TestEditApi.deleteSection(sectionId);

      setSections((prev) => prev.filter((section) => section._id !== sectionId));

      addToast('Section deleted successfully.', 'success');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to delete section',
        'error'
      );
    }
  };

  const handlePublishTest = async () => {
    try {
      setSavingTest(true);

      await TestEditApi.publishTest(testId);

      addToast('Test published successfully.', 'success');

      await fetchSections();
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to publish test',
        'error'
      );
    } finally {
      setSavingTest(false);
    }
  };

  return {
    testForm,
    settings,
    setSettings,
    sections,
    loadingTest,
    savingTest,

    showSectionModal,
    editingSection,
    sectionSaving,
    sectionForm,

    codingProblems,
    loadingCodingProblems,

    activeImportSectionId,
    setActiveImportSectionId,
    showQuestionBankImport,
    setShowQuestionBankImport,
    showFileImport,
    setShowFileImport,

    importTab,
    setImportTab,
    importText,
    setImportText,
    questionRefreshKey,
    setQuestionRefreshKey,

    toasts,
    addToast,

    handleTestChange,
    handleSectionChange,
    toggleCodingProblem,
    handleOpenAddSection,
    handleCloseSectionModal,
    handleEditSection,
    handleSaveSection,
    handleDeleteSection,
    handleSaveTestDetails,
    handlePublishTest,
  };
}