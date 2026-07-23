import { Terminal, Code2, Target, Hash } from 'lucide-react';
import { calculateRate, formatPercentage } from './report.utils';
import { UserTestReport } from '../../types/test.types';

type Props = {
  codingReview: UserTestReport['codingReview'];
};

export default function CodingProblemPerformance({ codingReview }: Props) {
  if (!codingReview || codingReview.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
      <h3 className="mb-2 text-lg font-bold text-[var(--text)]">Problem Performance</h3>
      <p className="mb-6 text-sm text-[var(--muted2)]">Detailed performance per coding problem.</p>

      <div className="space-y-4">
        {codingReview.map((item, index) => {
          const title = item.title || `Coding Problem ${index + 1}`;
          const difficulty = item.difficulty || 'Unspecified';
          const testcasePassRate = calculateRate(item.passedCount, item.totalCount);
          
          let statusText = 'Failed';
          let statusColorClass = 'text-red-500 bg-red-500/10 border-red-500/20';
          let progressColorClass = 'bg-red-500';
          
          if (item.accepted) {
            statusText = 'Accepted';
            statusColorClass = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            progressColorClass = 'bg-emerald-500';
          } else if (item.passedCount > 0) {
            statusText = 'Partially Passed';
            statusColorClass = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            progressColorClass = 'bg-amber-500';
          }

          return (
            <div key={item.problemId || index} className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              
              {/* Header: Title, Badge, Status */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-sky-500" />
                    <h4 className="font-bold text-[var(--text)] text-base">{title}</h4>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs font-medium text-[var(--muted2)]">
                      {difficulty}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs font-medium text-[var(--muted2)]">
                      <Terminal className="h-3 w-3" />
                      {item.language}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusColorClass}`}>
                    {statusText}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-[var(--muted2)]">Test Cases Passed</p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[var(--text)] font-bold text-lg">
                    <Hash className="h-4 w-4 text-[var(--muted2)]" />
                    {item.totalCount > 0 ? (
                      <>
                        {item.passedCount} <span className="text-sm font-normal text-[var(--muted2)]">/ {item.totalCount}</span>
                      </>
                    ) : (
                      <span className="text-sm font-normal text-[var(--muted2)]">N/A</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--muted2)]">Pass Percentage</p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[var(--text)] font-bold text-lg">
                    <Target className={`h-4 w-4 ${progressColorClass.replace('bg-', 'text-')}`} />
                    {formatPercentage(testcasePassRate)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {item.totalCount > 0 && (
                <div className="mt-auto">
                  <div 
                    className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
                    role="progressbar"
                    aria-valuenow={testcasePassRate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Testcase pass percentage: ${formatPercentage(testcasePassRate)} - ${statusText}`}
                  >
                    <div 
                      className={`h-full transition-all duration-500 ${progressColorClass}`} 
                      style={{ width: `${Math.max(0, Math.min(100, testcasePassRate))}%` }}
                    />
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
