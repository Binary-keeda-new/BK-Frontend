import { UserTestReport } from '../../types/test.types';
import SectionPerformanceCard from './SectionPerformanceCard';
import SectionPerformanceChart from './SectionPerformanceChart';
import ReportSection from './shared/ReportSection';
import EmptyState from './shared/EmptyState';
import { BarChart2 } from 'lucide-react';

type Props = {
  report: UserTestReport;
};

export default function SectionPerformance({ report }: Props) {
  const sections = report.sections;

  if (!sections || sections.length === 0) {
    return (
      <ReportSection title="Section Performance" icon={BarChart2}>
        <EmptyState message="No section performance data available." />
      </ReportSection>
    );
  }

  return (
    <ReportSection title="Section Performance" icon={BarChart2}>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart Column */}
        <div className="col-span-1 lg:col-span-1 flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
          <h3 className="mb-2 text-xl font-extrabold text-[var(--text)]">
            Performance Overview
          </h3>
          <p className="text-sm font-medium text-[var(--muted2)]">
            Comparing accuracy and acceptance rates across all sections.
          </p>
          <div className="mt-6 flex-1 min-h-[300px]">
            <SectionPerformanceChart sections={sections} />
          </div>
        </div>

        {/* Cards Column */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {sections.map((section) => (
            <SectionPerformanceCard key={section.sectionId} section={section} />
          ))}
        </div>
      </div>
    </ReportSection>
  );
}
