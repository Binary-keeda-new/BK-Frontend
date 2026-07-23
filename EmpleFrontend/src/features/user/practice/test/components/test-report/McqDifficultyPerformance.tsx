'use client';

import { AggregationResult, formatPercentage } from './report.utils';
import { Target } from 'lucide-react';

type Props = {
  data: AggregationResult[];
};

// Define canonical order for known difficulty levels
const DIFFICULTY_ORDER: Record<string, number> = {
  'Easy': 1,
  'Medium': 2,
  'Hard': 3,
  'Unspecified': 4,
};

export default function McqDifficultyPerformance({ data }: Props) {
  if (!data || data.length === 0) return null;

  // Sort by canonical order, then alphabetically for any others
  const sortedData = [...data].sort((a, b) => {
    const orderA = DIFFICULTY_ORDER[a.name] || 99;
    const orderB = DIFFICULTY_ORDER[b.name] || 99;
    
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-bold text-[var(--text)]">Difficulty Performance</h3>
      <p className="mb-6 text-sm text-[var(--muted2)]">Accuracy breakdown by question difficulty level.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedData.map((item) => (
          <div key={item.name} className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h4 className="font-bold text-[var(--text)] text-base">{item.name}</h4>
              <div className="flex items-center gap-1.5 text-[var(--orange)]">
                <Target className="h-4 w-4" />
                <span className="font-bold text-sm">{formatPercentage(item.accuracy)}</span>
              </div>
            </div>
            
            <div className="mb-4 grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
              <div>
                <p className="text-[var(--muted2)] text-xs">Attempted</p>
                <p className="font-semibold text-[var(--text)]">{item.attempted} / {item.total}</p>
              </div>
              <div>
                <p className="text-[var(--muted2)] text-xs">Correct</p>
                <p className="font-semibold text-emerald-500">{item.correct}</p>
              </div>
              <div>
                <p className="text-[var(--muted2)] text-xs">Incorrect</p>
                <p className="font-semibold text-red-500">{item.incorrect}</p>
              </div>
              <div>
                <p className="text-[var(--muted2)] text-xs">Skipped</p>
                <p className="font-semibold text-amber-500">{item.skipped}</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-auto">
              <div 
                className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
                role="progressbar"
                aria-valuenow={item.accuracy}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.name} Accuracy: ${formatPercentage(item.accuracy)}`}
              >
                <div 
                  className="h-full bg-[var(--orange)] transition-all duration-500" 
                  style={{ width: `${Math.max(0, Math.min(100, item.accuracy))}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
