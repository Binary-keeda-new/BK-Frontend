import { CheckCircle2, Code, FileCode2, Target, Hash } from 'lucide-react';
import { formatPercentage, calculateRate } from './report.utils';
import { UserTestReport } from '../../types/test.types';

type Props = {
  report: UserTestReport;
};

export default function CodingSummary({ report }: Props) {
  const { summary } = report;

  const problemAcceptanceRate = calculateRate(summary.codingAccepted, summary.totalCodingProblems);
  const testcasePassRate = calculateRate(summary.codingTestCasesPassed, summary.codingTestCasesTotal);

  return (
    <div className="flex flex-col justify-center rounded-xl  bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
      <h3 className="mb-6 text-lg font-bold text-[var(--text)]">Coding Overview</h3>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center justify-center h-24 w-24 rounded-full border-4 border-sky-500 bg-sky-500/10 text-sky-500">
          <span className="text-2xl font-extrabold">{formatPercentage(problemAcceptanceRate)}</span>
        </div>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted2)]">
          Acceptance Rate
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Problems Accepted */}
        <div className="flex flex-col rounded-2xl  bg-[var(--bg)] p-4 text-center">
          <div className="mx-auto mb-2 rounded-full bg-emerald-500/10 p-2 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="text-xs text-[var(--muted2)]">Accepted Problems</p>
          <p className="mt-1 font-bold text-[var(--text)]">
            {summary.codingAccepted} <span className="text-xs font-normal text-[var(--muted2)]">/ {summary.totalCodingProblems}</span>
          </p>
        </div>

        {/* Testcases Passed */}
        <div className="flex flex-col rounded-2xl  bg-[var(--bg)] p-4 text-center">
          <div className="mx-auto mb-2 rounded-full bg-blue-500/10 p-2 text-blue-500">
            <Hash className="h-5 w-5" />
          </div>
          <p className="text-xs text-[var(--muted2)]">Test Cases Passed</p>
          <p className="mt-1 font-bold text-[var(--text)]">
            {summary.codingTestCasesTotal > 0 ? (
              <>
                {summary.codingTestCasesPassed} <span className="text-xs font-normal text-[var(--muted2)]">/ {summary.codingTestCasesTotal}</span>
              </>
            ) : (
              <span className="text-sm font-normal text-[var(--muted2)]">No testcase data available</span>
            )}
          </p>
        </div>
        
        {/* Testcase Pass % */}
        {summary.codingTestCasesTotal > 0 && (
          <div className="col-span-2 flex flex-col rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 text-center">
            <div className="mx-auto mb-2 rounded-full bg-sky-500/10 p-2 text-sky-500">
              <Target className="h-5 w-5" />
            </div>
            <p className="text-xs text-[var(--muted2)]">Test Case Pass Percentage</p>
            <p className="mt-1 font-bold text-[var(--text)]">{formatPercentage(testcasePassRate)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
