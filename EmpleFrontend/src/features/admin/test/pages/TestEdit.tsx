'use client';

import { useRef } from 'react';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';
import TestSettingsCard from '../components/TestSettingsCard';
import ImportTestQuestionBank from '../components/test-edit/ImportTestQuestionBank';
import ImportTestQuestionsModal from '../components/test-edit/ImportTestQuestionsModal';
import TestDetailsForm from '../components/test-edit/TestDetailsForm';
import TestHeader from '../components/test-edit/TestHeader';
import TestPublishActions from '../components/test-edit/TestPublishActions';
import TestSectionList from '../components/test-edit/TestSectionList';
import TestSectionModal from '../components/test-edit/TestSectionModal';
import { themeTokens } from '../components/test-edit/testEdit.constants';
import { importQuestionsToSection } from '../components/test-edit/testEdit.api';
import { useTestEdit } from '../components/test-edit/useTestEdit';

type TestEditProps = {
  testId: string;
  onClose?: () => void;
};

export default function TestEdit({ testId, onClose }: TestEditProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const aikenFileRef = useRef<HTMLInputElement>(null);
  const jsonFileRef = useRef<HTMLInputElement>(null);

  const vm = useTestEdit(testId);

  if (vm.loadingTest) {
    return (
      <div className="p-6 text-sm text-[var(--clr-text2)]">
        Loading test...
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={vm.toasts} />

      <div className="mx-auto w-full max-w-[900px] px-5 py-8">
        <TestHeader onClose={onClose} />

        <TestDetailsForm form={vm.testForm} onChange={vm.handleTestChange} />

        <TestSettingsCard settings={vm.settings} onChange={vm.setSettings} />

        <div className="mt-4 flex justify-end">
          <button
            onClick={vm.handleOpenAddSection}
            className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white"
          >
            + Add Section
          </button>
        </div>

        <TestSectionList
          testId={testId}
          sections={vm.sections}
          refreshKey={vm.questionRefreshKey}
          onEdit={vm.handleEditSection}
          onDelete={vm.handleDeleteSection}
          onToast={vm.addToast}
          onOpenJsonImport={(sectionId) => {
            vm.setActiveImportSectionId(sectionId);
            vm.setImportTab('json');
            vm.setShowFileImport(true);
          }}
          onOpenAikenImport={(sectionId) => {
            vm.setActiveImportSectionId(sectionId);
            vm.setImportTab('aiken');
            vm.setShowFileImport(true);
          }}
          onOpenQuestionBankImport={(sectionId) => {
            vm.setActiveImportSectionId(sectionId);
            vm.setShowQuestionBankImport(true);
          }}
        />

        <TestPublishActions
          saving={vm.savingTest}
          onSave={vm.handleSaveTestDetails}
          onPublish={vm.handlePublishTest}
        />
      </div>

      <TestSectionModal
        open={vm.showSectionModal}
        editingSection={vm.editingSection}
        sectionForm={vm.sectionForm}
        sectionSaving={vm.sectionSaving}
        codingProblems={vm.codingProblems}
        loadingCodingProblems={vm.loadingCodingProblems}
        onClose={vm.handleCloseSectionModal}
        onSave={vm.handleSaveSection}
        onChange={vm.handleSectionChange}
        onToggleCodingProblem={vm.toggleCodingProblem}
      />

      {vm.activeImportSectionId && (
        <ImportTestQuestionBank
          open={vm.showQuestionBankImport}
          onClose={() => vm.setShowQuestionBankImport(false)}
          t={themeTokens}
          testId={testId}
          sectionId={vm.activeImportSectionId}
          onImported={() => {
            vm.setShowQuestionBankImport(false);
            vm.setQuestionRefreshKey((prev) => prev + 1);
            vm.addToast('Questions imported from question bank.', 'success');
          }}
        />
      )}

      {vm.activeImportSectionId && (
        <ImportTestQuestionsModal
          open={vm.showFileImport}
          onClose={() => vm.setShowFileImport(false)}
          importTab={vm.importTab}
          setImportTab={vm.setImportTab}
          importText={vm.importText}
          setImportText={vm.setImportText}
          t={themeTokens}
          fileRef={fileRef}
          aikenFileRef={aikenFileRef}
          jsonFileRef={jsonFileRef}
          onImportQuestions={async (questions) => {
            if (!vm.activeImportSectionId) return;

            try {
              await importQuestionsToSection(
                testId,
                vm.activeImportSectionId,
                questions.map((q) => ({
                  ...q,
                  source: 'file',
                }))
              );

              vm.setShowFileImport(false);
              vm.setImportText('');
              vm.setImportTab('aiken');

              vm.addToast(`${questions.length} questions imported to section.`, 'success');
            } catch (error) {
              vm.addToast(
                error instanceof Error ? error.message : 'Failed to import questions',
                'error'
              );
            }
          }}
        />
      )}
    </>
  );
}