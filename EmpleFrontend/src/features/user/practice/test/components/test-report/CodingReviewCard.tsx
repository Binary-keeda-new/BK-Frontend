import { ChevronDown, CheckCircle2, XCircle, Code2, Terminal, Target, Hash, AlertTriangle, Clock, HardDrive } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import { calculateRate, formatPercentage } from './report.utils';
import { lazy, Suspense } from 'react';

const CodeViewer = lazy(() => import('./CodeViewer'));

type CodingReviewItem = UserTestReport['codingReview'][0];

type Props = {
  item: CodingReviewItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function CodingReviewCard({ item, index, isExpanded, onToggle }: Props) {
  const title = item.title || `Coding Problem ${index + 1}`;
  const difficulty = item.difficulty || 'Unspecified';
  const language = item.language?.trim() || 'Unknown';
  
  const isAccepted = item.accepted;
  const isPartiallyPassed = !isAccepted && item.passedCount > 0;
  
  let statusText = 'Rejected';
  let statusIcon = XCircle;
  let statusColorClass = 'text-red-500 bg-red-500/10 border-red-500/20';
  let progressColorClass = 'bg-red-500';

  if (isAccepted) {
    statusText = 'Accepted';
    statusIcon = CheckCircle2;
    statusColorClass = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    progressColorClass = 'bg-emerald-500';
  } else if (isPartiallyPassed) {
    statusText = 'Partially Passed';
    statusIcon = AlertTriangle;
    statusColorClass = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    progressColorClass = 'bg-amber-500';
  }

  const StatusIcon = statusIcon;
  const passRate = calculateRate(item.passedCount, item.totalCount);

  return (
    <div className={`overflow-hidden rounded-xl transition-all duration-200 ${
      isExpanded 
        ? 'shadow-sm bg-[var(--surface)]' 
        : 'bg-[var(--surface)]'
    }`}>
      {/* Accordion Header */}
      <button 
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full flex-col gap-4 p-5 text-left focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:ring-inset sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-1 items-start gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-black text-lg transition-colors ${
            isExpanded ? 'bg-sky-500 text-white shadow-md' : 'bg-[var(--surface)] text-[var(--text)] '
          }`}>
            {index + 1}
          </div>
          
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isExpanded ? 'bg-sky-500/20 text-sky-500' : 'bg-[var(--surface)] text-sky-500'}`}>
                <Code2 className="h-4 w-4" />
              </div>
              <h4 className={`text-[var(--text)] ${isExpanded ? 'whitespace-normal font-bold text-lg' : 'truncate font-semibold text-base'}`}>
                {title}
              </h4>
            </div>
            
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${statusColorClass}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusText}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg  bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted2)] shadow-sm">
                {difficulty}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg  bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted2)] shadow-sm">
                <Terminal className="h-3.5 w-3.5" />
                {language}
              </span>
              {!isExpanded && item.totalCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg  bg-[var(--surface)] px-3 py-1.5 text-xs font-black text-[var(--text)] shadow-sm">
                  {item.passedCount} / {item.totalCount} ({formatPercentage(passRate)})
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="shrink-0 self-end sm:self-center pt-2">
          <ChevronDown className={`h-6 w-6 text-[var(--muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-sky-500' : ''}`} />
        </div>
      </button>

      {/* Accordion Body */}
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--border)]/50 bg-[var(--surface)]/50 p-6 sm:pl-[5rem] backdrop-blur-sm">
            
            {/* Detailed Testcase Summary */}
            {item.totalCount > 0 && (
              <div className="mb-6 flex flex-col gap-6 rounded-2xl  bg-[var(--bg)] p-5 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-1.5 mb-1">
                      <Hash className="h-4 w-4" /> Passed
                    </p>
                    <p className="text-2xl font-black text-[var(--text)]">{item.passedCount} <span className="text-base font-semibold text-[var(--muted2)]">/ {item.totalCount}</span></p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-1.5 mb-1">
                      <Target className="h-4 w-4" /> Acceptance
                    </p>
                    <p className="text-2xl font-black text-[var(--text)]">{formatPercentage(passRate)}</p>
                  </div>
                  {item.totalMarks !== undefined && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)] flex items-center gap-1.5 mb-1">
                        <Target className="h-4 w-4" /> Points
                      </p>
                      <p className="text-2xl font-black text-[var(--text)]">{item.marks} <span className="text-base font-semibold text-[var(--muted2)]">/ {item.totalMarks}</span></p>
                    </div>
                  )}
                </div>
                
                <div className="w-full sm:max-w-xs shrink-0">
                  <div 
                    className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/50"
                    role="progressbar"
                    aria-valuenow={passRate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${statusText}. Passed ${item.passedCount} out of ${item.totalCount}`}
                  >
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${progressColorClass}`} 
                      style={{ width: `${Math.max(0, Math.min(100, passRate))}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostics row if available */}
            {(item.executionTime != null || item.memory != null) && (
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
                {item.executionTime != null && (
                  <div className="flex items-center gap-2 rounded-xl  bg-[var(--bg)] px-4 py-2 text-[var(--text)] shadow-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-black text-base">{item.executionTime}s</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">Avg Runtime</span>
                  </div>
                )}
                {item.memory != null && (
                  <div className="flex items-center gap-2 rounded-xl  bg-[var(--bg)] px-4 py-2 text-[var(--text)] shadow-sm">
                    <HardDrive className="h-4 w-4 text-violet-500" />
                    <span className="font-black text-base">{item.memory} KB</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">Avg Memory</span>
                  </div>
                )}
              </div>
            )}

            {/* Compilation / Runtime Errors */}
            {(item.compileOutput || item.stderr) && (
              <div className="mb-6 space-y-4">
                {item.compileOutput && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 shadow-sm">
                    <h5 className="mb-3 flex items-center gap-2 text-sm font-bold text-red-500 uppercase tracking-wider">
                      <AlertTriangle className="h-4 w-4" />
                      Compilation Output
                    </h5>
                    <pre className="whitespace-pre-wrap text-sm text-red-400 overflow-x-auto font-mono bg-red-500/10 p-4 rounded-xl">
                      {item.compileOutput}
                    </pre>
                  </div>
                )}
                {item.stderr && !item.compileOutput && (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-sm">
                    <h5 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-500 uppercase tracking-wider">
                      <AlertTriangle className="h-4 w-4" />
                      Standard Error
                    </h5>
                    <pre className="whitespace-pre-wrap text-sm text-amber-400 overflow-x-auto font-mono bg-amber-500/10 p-4 rounded-xl">
                      {item.stderr}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Source Code Viewer */}
            <div>
              <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--muted2)]" />
                Source Code
              </h5>
              <div className="overflow-hidden rounded-2xl  shadow-sm">
                <Suspense fallback={
                  <div className="flex h-[400px] items-center justify-center bg-[#1e1e1e]">
                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--muted2)]">Loading editor...</span>
                  </div>
                }>
                  <CodeViewer language={language} sourceCode={item.sourceCode} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
