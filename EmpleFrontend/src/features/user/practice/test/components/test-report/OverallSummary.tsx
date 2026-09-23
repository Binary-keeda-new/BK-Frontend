import {
  CheckCircle2,
  XCircle,
  SkipForward,
  Code,
  Target,
  Trophy,
  Clock,
  BrainCircuit,
} from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import { formatDuration, formatPercentage } from './report.utils';
import ReportSection from './shared/ReportSection';
import { LayoutDashboard } from 'lucide-react';

type Props = {
  report: UserTestReport;
};

export default function OverallSummary({ report }: Props) {
  const { timeUsedMs, rank, totalScore, maxScore, percentage, sectionBreakdown } = report;

  const hasMcq = sectionBreakdown?.some(s => s.type === 'mcq') || false;
  const hasCoding = sectionBreakdown?.some(s => s.type === 'coding') || false;

  return (
    <ReportSection title="Overall Performance" icon={LayoutDashboard} className="!mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards */}
        <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--orange)]" /> Time Used
          </p>
          <p className="mt-3 text-2xl font-extrabold text-[var(--text)]">
            {formatDuration(timeUsedMs)}
          </p>
        </div>

        {rank && rank.position && rank.totalCandidates && (
          <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> Global Rank
            </p>
            <p className="mt-3 text-2xl font-extrabold text-[var(--text)]">
              #{rank.position}{' '}
              <span className="text-sm font-semibold text-[var(--muted2)]">
                / {rank.totalCandidates}
              </span>
            </p>
          </div>
        )}

        <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-[var(--orange)]" /> Total Score
          </p>
          <p className="mt-3 text-2xl font-extrabold text-[var(--text)]">
            {totalScore}{' '}
            <span className="text-sm font-semibold text-[var(--muted2)]">
              / {maxScore}
            </span>
          </p>
          <div className="mt-2 w-full overflow-hidden rounded-full bg-slate-200/50 h-2 dark:bg-slate-800/50">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
              style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-[var(--muted2)]">
            {percentage}% Score
          </p>
        </div>
        
        {/* We can remove the old MCQ/Coding breakdown cards from OverallSummary because the Section Breakdown does a much better job now. */}
      </div>
    </ReportSection>
  );
}
