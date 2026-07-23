import { BrainCircuit, Code, Clock, Target, Hash } from 'lucide-react';
import { formatDuration, formatPercentage } from './report.utils';

type Props = {
  section: {
    sectionId: string;
    title: string;
    type: 'mcq' | 'coding';
    score: number | null;
    totalMarks: number | null;
    attempted: number;
    totalItems: number;
    accuracyOrAcceptanceRate: number;
    timeSpentMs: number;
    status: string;
  };
};

export default function SectionPerformanceCard({ section }: Props) {
  const isMcq = section.type === 'mcq';
  
  // Semantic Progress Bar Coloring
  let progressColorClass = 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'; // Default < 50%
  let statusText = 'Needs Improvement';
  let badgeColorClass = 'border-red-500/20 bg-red-500/10 text-red-500';
  
  if (section.accuracyOrAcceptanceRate >= 80) {
    progressColorClass = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    statusText = 'Excellent';
    badgeColorClass = 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500';
  } else if (section.accuracyOrAcceptanceRate >= 50) {
    progressColorClass = 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
    statusText = 'Average';
    badgeColorClass = 'border-amber-500/20 bg-amber-500/10 text-amber-500';
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-[var(--border)]/50 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isMcq ? 'bg-[var(--orange)]/10 text-[var(--orange)]' : 'bg-sky-500/10 text-sky-500'}`}>
              {isMcq ? <BrainCircuit className="h-4 w-4" /> : <Code className="h-4 w-4" />}
            </div>
            <h3 className="text-lg font-bold tracking-tight text-[var(--text)]">{section.title}</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-block rounded-lg border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">
              {isMcq ? 'MCQ' : 'Coding'}
            </span>
            <span className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold capitalize tracking-wide ${
              section.status === 'submitted' 
                ? badgeColorClass
                : 'border-[var(--border)] bg-[var(--bg)] text-[var(--muted2)]'
            }`}>
              {section.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Score/Evaluation */}
        <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface)]/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">Score</p>
          {section.score !== null && section.totalMarks !== null ? (
            <p className="mt-1 text-3xl font-black text-[var(--text)]">
              {section.score} <span className="text-base font-semibold text-[var(--muted2)]">/ {section.totalMarks}</span>
            </p>
          ) : (
            <p className="mt-1 text-sm font-semibold text-[var(--text)]">
              Evaluated by acceptance rate
            </p>
          )}
        </div>

        {/* Time Spent */}
        <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface)]/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">Time Spent</p>
          <div className="mt-1 flex items-center gap-2 text-2xl font-black text-[var(--text)]">
            <Clock className="h-5 w-5 text-[var(--orange)]" />
            {formatDuration(section.timeSpentMs)}
          </div>
        </div>
        
        {/* Attempted */}
        <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface)]/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">Attempted</p>
          <div className="mt-1 flex items-center gap-2 text-2xl font-black text-[var(--text)]">
            <Hash className="h-5 w-5 text-sky-500" />
            <span>{section.attempted} <span className="text-base font-semibold text-[var(--muted2)]">/ {section.totalItems}</span></span>
          </div>
        </div>
        
        {/* Accuracy/Acceptance Rate */}
        <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface)]/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted2)]">
            {isMcq ? 'Accuracy' : 'Acceptance Rate'}
          </p>
          <div className="mt-1 flex items-center gap-2 text-2xl font-black text-[var(--text)]">
            <Target className={`h-5 w-5 ${isMcq ? 'text-emerald-500' : 'text-purple-500'}`} />
            {formatPercentage(section.accuracyOrAcceptanceRate)}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 mt-auto rounded-2xl bg-[var(--bg)] p-4 border border-[var(--border)]/50">
        <div className="mb-2 flex items-center justify-between text-xs font-bold tracking-wide">
          <span className="uppercase text-[var(--muted2)]">
            {isMcq ? 'Accuracy Progress' : 'Acceptance Progress'}
          </span>
          <span className="text-[var(--text)]">
            {statusText}
          </span>
        </div>
        <div 
          className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-800/50"
          role="progressbar" 
          aria-valuenow={section.accuracyOrAcceptanceRate} 
          aria-valuemin={0} 
          aria-valuemax={100}
          aria-label={`${isMcq ? 'Accuracy' : 'Acceptance Rate'}: ${formatPercentage(section.accuracyOrAcceptanceRate)} - ${statusText}`}
        >
          <div 
            className={`h-full ${progressColorClass} transition-all duration-1000 ease-out`} 
            style={{ width: `${Math.max(0, Math.min(100, section.accuracyOrAcceptanceRate))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
