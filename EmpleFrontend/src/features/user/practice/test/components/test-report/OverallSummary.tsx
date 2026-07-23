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
  const { summary, timeUsedMs, rank } = report;

  const hasMcq = summary.totalMcqQuestions > 0;
  const hasCoding = summary.totalCodingProblems > 0;

  return (
    <ReportSection title="Overall Performance" icon={LayoutDashboard} className="!mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards - Admin Style */}
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

        {hasMcq && (
          <>
            <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-[var(--orange)]" /> MCQ Score
              </p>
              <p className="mt-3 text-2xl font-extrabold text-[var(--text)]">
                {summary.score}{' '}
                <span className="text-sm font-semibold text-[var(--muted2)]">
                  / {summary.totalMarks}
                </span>
              </p>
              <p className="mt-1 text-xs text-[var(--muted2)]">
                {formatPercentage(summary.accuracy)} Accuracy
              </p>
            </div>
            
            <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">
                MCQ Breakdown
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2 py-1 text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="font-bold text-sm">{summary.correct}</span>
                </div>
                <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-red-500/10 px-2 py-1 text-red-500">
                  <XCircle className="h-3.5 w-3.5" />
                  <span className="font-bold text-sm">{summary.incorrect}</span>
                </div>
                <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-amber-500/10 px-2 py-1 text-amber-500">
                  <SkipForward className="h-3.5 w-3.5" />
                  <span className="font-bold text-sm">{summary.skipped}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {hasCoding && (
          <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-2">
              <Code className="h-4 w-4 text-sky-500" /> Coding
            </p>
            <p className="mt-3 text-2xl font-extrabold text-[var(--text)]">
              {summary.codingAccepted}{' '}
              <span className="text-sm font-semibold text-[var(--muted2)]">
                / {summary.totalCodingProblems} Passed
              </span>
            </p>
            <p className="mt-1 text-xs text-[var(--muted2)]">
              {summary.totalCodingProblems > 0 
                ? formatPercentage((summary.codingAccepted / summary.totalCodingProblems) * 100) 
                : '0%'} Pass Rate
            </p>
          </div>
        )}
      </div>
    </ReportSection>
  );
}
