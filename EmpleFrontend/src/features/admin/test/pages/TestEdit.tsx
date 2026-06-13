// features/admin/tests/components/TestEdit.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';
import ImportTestQuestionBank from '../components/test-edit/ImportTestQuestionBank';
import ImportTestQuestionsModal from '../components/test-edit/ImportTestQuestionsModal';
import { apiRequest } from '@/shared/utils/api';
import TestSettingsCard from '../components/TestSettingsCard';
import { TestSettings } from '../components/TestSettingsCard';

type SectionType = 'mcq' | 'coding';

type TestResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    description: string;
    totalSections: number;
    status?: 'draft' | 'published';
    settings?: Partial<TestSettings>;
  };
};
type TestSectionResponse = {
  success: boolean;
  message: string;
  data: TestSection[];
};

type TestSection = {
  _id: string;
  type: SectionType;
  numberOfQuestions: number;
  duration: number;
  order?: number;
};

type TestEditProps = {
  testId: string;
  onClose?: () => void;
};

const defaultSettings: TestSettings = {
  blockKeyboard: false,
  allowVirtualKeyboard: false,
  allowCalculator: false,
  noExitScreen: false,
  ipBinding: false,
  noCopyPaste: false,
  noMinimize: false,
  noDevTools: false,
  noLostFocus: false,
  navigationMode: 'free',
  minTimeBeforeSubmit: 0,
  deadline: '',
  duration: 0,
  passwordProtected: false,
  password: '',
};

export default function TestEdit({ testId, onClose }: TestEditProps) {
  const [testForm, setTestForm] = useState({
    title: '',
    description: '',
    totalSections: '',
  });

  const [sections, setSections] = useState<TestSection[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [activeImportSectionId, setActiveImportSectionId] = useState<string | null>(null);
const [showQuestionBankImport, setShowQuestionBankImport] = useState(false);
const [showFileImport, setShowFileImport] = useState(false);

const [importTab, setImportTab] = useState<'aiken' | 'excel' | 'json'>('aiken');
const [importText, setImportText] = useState('');
const [loadingTest, setLoadingTest] = useState(true);
const [savingTest, setSavingTest] = useState(false);
const [settings, setSettings] = useState<TestSettings>(defaultSettings);

  const [sectionForm, setSectionForm] = useState({
    type: 'mcq' as SectionType,
    numberOfQuestions: '',
    duration: '',
  });

  const [toasts, setToasts] = useState<
    { id: number; message: string; type: 'success' | 'error' }[]
  >([]);

  const addToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

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
    }));
  };

 const handleAddSection = async () => {
  const numberOfQuestions = Number(sectionForm.numberOfQuestions);
  const duration = Number(sectionForm.duration);

  if (!sectionForm.type || numberOfQuestions <= 0 || duration <= 0) {
    addToast('Please fill all section fields correctly.', 'error');
    return;
  }

  try {
    const result = await apiRequest<{
      success: boolean;
      message: string;
      data: TestSection;
    }>(`/api/v1/admin/tests/${testId}/sections`, {
      method: 'POST',
      body: JSON.stringify({
        type: sectionForm.type,
        numberOfQuestions,
        duration,
      }),
    });

    setSections((prev) => [...prev, result.data]);

    setSectionForm({
      type: 'mcq',
      numberOfQuestions: '',
      duration: '',
    });

    setShowAddSection(false);
    addToast('Section added successfully.', 'success');
  } catch (error) {
    addToast(
      error instanceof Error ? error.message : 'Failed to create section',
      'error'
    );
  }
};

  const fileRef = useRef<HTMLInputElement>(null);
const aikenFileRef = useRef<HTMLInputElement>(null);
const jsonFileRef = useRef<HTMLInputElement>(null);

const fetchSections = async () => {
  try {
    const result = await apiRequest<TestSectionResponse>(
      `/api/v1/admin/tests/${testId}/sections`,
      {
        method: 'GET',
      }
    );

    setSections(result.data || []);
  } catch (error) {
    console.error('Failed to fetch sections:', error);
  }
};

useEffect(() => {
  const fetchTest = async () => {
    try {
      setLoadingTest(true);

      const result = await apiRequest<TestResponse>(
        `/api/v1/admin/tests/${testId}`,
        {
          method: 'GET',
        }
      );

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
    } catch (error) {
      console.error('Failed to fetch test:', error);
      addToast(
        error instanceof Error ? error.message : 'Failed to fetch test',
        'error'
      );
    } finally {
      setLoadingTest(false);
    }
  };

  fetchTest();
}, [testId]);

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

    await apiRequest<TestResponse>(`/api/v1/admin/tests/${testId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        totalSections,
        settings,
      }),
    });

    addToast('Test details saved successfully.', 'success');
  } catch (error) {
    console.error('Failed to save test:', error);
    addToast(
      error instanceof Error ? error.message : 'Failed to save test',
      'error'
    );
  } finally {
    setSavingTest(false);
  }
};

const t = {
  pageBg: 'var(--clr-bg)',
  cardBg: 'var(--clr-surface)',
  cardBorder: 'var(--clr-border)',
  inputBg: 'var(--clr-surface2)',
  inputBorder: 'var(--clr-border)',
  inputText: 'var(--clr-text)',
  inputPlaceholder: 'var(--clr-text3)',
  headingColor: 'var(--clr-text)',
  labelColor: 'var(--clr-text2)',
  subText: 'var(--clr-text2)',
  divider: 'var(--clr-border)',
};

if (loadingTest) {
  return (
    <div className="p-6 text-sm text-[var(--clr-text2)]">
      Loading test...
    </div>
  );
}
  return (
    <>
      <ToastContainer toasts={toasts} />

      <div className="mx-auto w-full max-w-[900px] px-5 py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--clr-text)]">
              Edit <span className="text-[var(--clr-accent)]">Test</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--clr-text2)]">
              Create sections for MCQ and coding based assessments.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text2)]"
          >
            Back
          </button>
        </div>

        <div className="rounded-3xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
                Title
              </label>
              <input
                name="title"
                value={testForm.title}
                onChange={handleTestChange}
                placeholder="Enter test title"
                className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
                Description
              </label>
              <textarea
                name="description"
                value={testForm.description}
                onChange={handleTestChange}
                placeholder="Enter test description"
                rows={4}
                className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--clr-text)]">
                Total Number of Sections
              </label>
              <input
                name="totalSections"
                type="number"
                value={testForm.totalSections}
                onChange={handleTestChange}
                placeholder="Example: 2"
                className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
        <TestSettingsCard settings={settings} onChange={setSettings} />


        <div className="mt-4 flex justify-end gap-3">
  <button
    onClick={handleSaveTestDetails}
    disabled={savingTest}
    className="rounded-2xl border border-[var(--clr-border)] px-5 py-3 text-sm font-semibold text-[var(--clr-text)] disabled:opacity-60"
  >
    {savingTest ? 'Saving...' : 'Save Details'}
  </button>

  <button
    onClick={() => setShowAddSection(true)}
    className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white"
  >
    + Add Section
  </button>
</div>

        <div className="mt-6 space-y-4">
          {sections.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--clr-border)] p-8 text-center text-sm text-[var(--clr-text2)]">
              No sections added yet.
            </div>
          ) : (
            sections.map((section, index) => (
              <div
                key={section._id}
                className="rounded-3xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--clr-text)]">
                      Section {index + 1}: {section.type === 'mcq' ? 'MCQ' : 'Coding'}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--clr-text2)]">
                      {section.numberOfQuestions} questions · {section.duration} minutes
                    </p>
                  </div>
                </div>

                {section.type === 'mcq' ? (
                  <div className="flex flex-wrap gap-3">
  <button
    onClick={() => {
      setActiveImportSectionId(section._id);
      setImportTab('json');
      setShowFileImport(true);
    }}
    className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text)]"
  >
    Import JSON
  </button>

  <button
    onClick={() => {
      setActiveImportSectionId(section._id);
      setImportTab('aiken');
      setShowFileImport(true);
    }}
    className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text)]"
  >
    Import Aiken
  </button>

  <button
    onClick={() => {
      setActiveImportSectionId(section._id);
      setShowQuestionBankImport(true);
    }}
    className="rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm text-[var(--clr-text)]"
  >
    Import from Question Bank
  </button>

  <button
    onClick={() => addToast('Manual question editor will be added next.', 'success')}
    className="rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-sm font-semibold text-white"
  >
    Add Manually
  </button>
</div>
                ) : (
                  <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4 text-sm text-[var(--clr-text2)]">
                    Coding Problems import will come here.
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showAddSection && (
        <>
          <div
            onClick={() => setShowAddSection(false)}
            className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed left-1/2 top-1/2 z-[401] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[var(--clr-surface)] p-6 shadow-2xl ring-1 ring-white/10">
            <h2 className="text-xl font-bold text-[var(--clr-text)]">
              Add Section
            </h2>

            <p className="mt-1 text-sm text-[var(--clr-text2)]">
              Choose the section type and its question settings.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
                  Section Type
                </label>
                <select
                  name="type"
                  value={sectionForm.type}
                  onChange={handleSectionChange}
                  className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
                >
                  <option value="mcq">Quiz / MCQ</option>
                  <option value="coding">Coding</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
                  Number of Questions
                </label>
                <input
                  name="numberOfQuestions"
                  type="number"
                  value={sectionForm.numberOfQuestions}
                  onChange={handleSectionChange}
                  placeholder="Example: 10"
                  className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
                  Total Duration
                </label>
                <input
                  name="duration"
                  type="number"
                  value={sectionForm.duration}
                  onChange={handleSectionChange}
                  placeholder="Duration in minutes"
                  className="w-full rounded-2xl bg-[var(--clr-surface2)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowAddSection(false)}
                  className="rounded-2xl border border-[var(--clr-border)] px-5 py-3 text-sm text-[var(--clr-text2)]"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddSection}
                  className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white"
                >
                  Add Section
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {activeImportSectionId && (
  <ImportTestQuestionBank
    open={showQuestionBankImport}
    onClose={() => setShowQuestionBankImport(false)}
    t={t}
    testId={testId}
    sectionId={activeImportSectionId}
    onImported={() => {
      setShowQuestionBankImport(false);
      addToast('Questions imported from question bank.', 'success');
    }}
  />
)}

{activeImportSectionId && (
  <ImportTestQuestionsModal
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
    onImportQuestions={(questions) => {
      console.log('Imported questions:', {
        testId,
        sectionId: activeImportSectionId,
        questions,
      });

      setShowFileImport(false);
      setImportText('');
      setImportTab('aiken');

      addToast(`${questions.length} questions imported to section.`, 'success');
    }}
  />
)}
    </>
  );
}