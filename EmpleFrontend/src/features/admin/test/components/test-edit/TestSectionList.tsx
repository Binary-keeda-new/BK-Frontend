import TestSectionCard from './TestSectionCard';
import type { TestSection } from './testEdit.types';

type TestSectionListProps = {
  testId: string;
  sections: TestSection[];
  refreshKey: number;
  onEdit: (section: TestSection) => void;
  onDelete: (sectionId: string) => void;
  onToast: (message: string, type?: 'success' | 'error') => void;
  onOpenJsonImport: (sectionId: string) => void;
  onOpenAikenImport: (sectionId: string) => void;
  onOpenQuestionBankImport: (sectionId: string) => void;
};

export default function TestSectionList({
  testId,
  sections,
  refreshKey,
  onEdit,
  onDelete,
  onToast,
  onOpenJsonImport,
  onOpenAikenImport,
  onOpenQuestionBankImport,
}: TestSectionListProps) {
  return (
    <div className="mt-6 space-y-4">
      {sections.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[var(--clr-border)] p-8 text-center text-sm text-[var(--clr-text2)]">
          No sections added yet.
        </div>
      ) : (
        sections.map((section, index) => (
          <TestSectionCard
            key={section._id}
            testId={testId}
            section={section}
            index={index}
            refreshKey={refreshKey}
            onEdit={onEdit}
            onDelete={onDelete}
            onToast={onToast}
            onOpenJsonImport={onOpenJsonImport}
            onOpenAikenImport={onOpenAikenImport}
            onOpenQuestionBankImport={onOpenQuestionBankImport}
          />
        ))
      )}
    </div>
  );
}