import { UserTestReport } from '../../types/test.types';
import McqDistributionChart from './McqDistributionChart';
import McqTopicPerformance from './McqTopicPerformance';
import McqDifficultyPerformance from './McqDifficultyPerformance';
import ReportSection from './shared/ReportSection';
import EmptyState from './shared/EmptyState';
import { aggregateByField, formatPercentage } from './report.utils';
import { BrainCircuit, CheckCircle2, Target, SkipForward, HelpCircle } from 'lucide-react';

type Props = {
  report: UserTestReport;
};

export default function McqAnalytics({ report }: Props) {
  const { summary, mcqReview } = report;

  if (summary.totalMcqQuestions === 0) {
    return (
      <ReportSection title="MCQ Analytics" icon={BrainCircuit}>
        <EmptyState message="No MCQ data available." />
      </ReportSection>
    );
  }

  // Derive attempted from summary (total - skipped)
  // But wait, user requested: "attempted questions, skipped questions, correct out of attempted."
  // And to use "backend summary values".
  // summary provides: correct, incorrect, skipped, totalMcqQuestions, accuracy.
  const attempted = summary.totalMcqQuestions - summary.skipped;

  // Aggregate Data
  const hasMcqReviewData = mcqReview && mcqReview.length > 0;
  
  // We only show Topic/Difficulty sections if there is meaningful data 
  // (i.e. at least some topics or difficulties exist that are not just empty strings).
  let topicData: ReturnType<typeof aggregateByField> = [];
  let difficultyData: ReturnType<typeof aggregateByField> = [];

  if (hasMcqReviewData) {
    topicData = aggregateByField(mcqReview, 'topic');
    difficultyData = aggregateByField(mcqReview, 'difficulty');
  }

  return (
    <ReportSection title="MCQ Analytics" icon={BrainCircuit}>
      {/* Top Row: Distribution & Accuracy Summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Distribution Chart */}
        <div className="flex flex-col rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
          <h3 className="mb-2 text-lg font-bold text-[var(--text)]">Response Distribution</h3>
          <p className="text-sm text-[var(--muted2)] mb-4">Overall breakdown of MCQ responses.</p>
          <div className="flex-1">
            <McqDistributionChart 
              correct={summary.correct}
              incorrect={summary.incorrect}
              skipped={summary.skipped}
              total={summary.totalMcqQuestions}
            />
          </div>
        </div>

        {/* Accuracy Summary */}
        <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
          <h3 className="mb-6 text-lg font-bold text-[var(--text)]">Accuracy Summary</h3>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center justify-center h-24 w-24 rounded-full border-4 border-[var(--orange)] bg-[var(--orange)]/10 text-[var(--orange)]">
              <span className="text-2xl font-extrabold">{formatPercentage(summary.accuracy)}</span>
            </div>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted2)]">
              Overall Accuracy
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="flex flex-col rounded-2xl  bg-[var(--bg)] p-4 text-center">
              <div className="mx-auto mb-2 rounded-full bg-blue-500/10 p-2 text-blue-500">
                <HelpCircle className="h-5 w-5" />
              </div>
              <p className="text-xs text-[var(--muted2)]">Attempted</p>
              <p className="mt-1 font-bold text-[var(--text)]">{attempted} <span className="text-xs font-normal text-[var(--muted2)]">/ {summary.totalMcqQuestions}</span></p>
            </div>
            <div className="flex flex-col rounded-2xl  bg-[var(--bg)] p-4 text-center">
              <div className="mx-auto mb-2 rounded-full bg-amber-500/10 p-2 text-amber-500">
                <SkipForward className="h-5 w-5" />
              </div>
              <p className="text-xs text-[var(--muted2)]">Skipped</p>
              <p className="mt-1 font-bold text-[var(--text)]">{summary.skipped} <span className="text-xs font-normal text-[var(--muted2)]">/ {summary.totalMcqQuestions}</span></p>
            </div>
            <div className="col-span-2 flex flex-col rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
              <div className="mx-auto mb-2 rounded-full bg-emerald-500/10 p-2 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-xs text-[var(--muted2)]">Correct out of Attempted</p>
              <p className="mt-1 font-bold text-[var(--text)]">{summary.correct} <span className="text-xs font-normal text-[var(--muted2)]">/ {attempted}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Rows: Topic & Difficulty */}
      {hasMcqReviewData && topicData.length > 0 && (
        <McqTopicPerformance data={topicData} />
      )}

      {hasMcqReviewData && difficultyData.length > 0 && (
        <McqDifficultyPerformance data={difficultyData} />
      )}
    </ReportSection>
  );
}
