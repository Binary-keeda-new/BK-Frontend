import { Code2 } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import CodingSummary from './CodingSummary';
import CodingLanguageDistribution from './CodingLanguageDistribution';
import CodingProblemPerformance from './CodingProblemPerformance';
import { aggregateCodingLanguages } from './report.utils';
import ReportSection from './shared/ReportSection';
import EmptyState from './shared/EmptyState';

type Props = {
  report: UserTestReport;
};

export default function CodingAnalytics({ report }: Props) {
  const { summary, codingReview } = report;

  // Empty state handling
  if (summary.totalCodingProblems === 0 && (!codingReview || codingReview.length === 0)) {
    return (
      <ReportSection title="Coding Analytics" icon={Code2}>
        <EmptyState message="No coding performance data available." />
      </ReportSection>
    );
  }

  const hasCodingReviewData = codingReview && codingReview.length > 0;
  const languageData = hasCodingReviewData ? aggregateCodingLanguages(codingReview) : [];

  return (
    <ReportSection title="Coding Analytics" icon={Code2}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Coding Summary */}
        <CodingSummary report={report} />

        {/* Language Distribution */}
        {hasCodingReviewData && languageData.length > 0 && (
          <CodingLanguageDistribution 
            data={languageData} 
            totalSubmissions={codingReview.length} 
          />
        )}
      </div>

      {/* Problem Performance or Missing Data Fallback */}
      {hasCodingReviewData ? (
        <CodingProblemPerformance codingReview={codingReview} />
      ) : (
        <EmptyState message="Detailed coding submissions are unavailable for this attempt." />
      )}
    </ReportSection>
  );
}
