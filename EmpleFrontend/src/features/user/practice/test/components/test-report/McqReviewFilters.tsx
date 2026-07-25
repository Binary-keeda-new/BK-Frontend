import { CheckCircle2, XCircle, SkipForward, LayoutList } from 'lucide-react';

export type McqFilterType = 'all' | 'correct' | 'incorrect' | 'skipped';

type Props = {
  currentFilter: McqFilterType;
  onFilterChange: (filter: McqFilterType) => void;
  counts: {
    all: number;
    correct: number;
    incorrect: number;
    skipped: number;
  };
};

export default function McqReviewFilters({ currentFilter, onFilterChange, counts }: Props) {
  const filters: { id: McqFilterType; label: string; icon: any; count: number; activeColor: string }[] = [
    { id: 'all', label: 'All', icon: LayoutList, count: counts.all, activeColor: 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]' },
    { id: 'correct', label: 'Correct', icon: CheckCircle2, count: counts.correct, activeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    { id: 'incorrect', label: 'Incorrect', icon: XCircle, count: counts.incorrect, activeColor: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { id: 'skipped', label: 'Skipped', icon: SkipForward, count: counts.skipped, activeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {filters.map((f) => {
        const isActive = currentFilter === f.id;
        const Icon = f.icon;
        
        return (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive 
                ? f.activeColor
                : 'border-[var(--border)] bg-transparent text-[var(--muted2)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
            }`}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
            {f.label} ({f.count})
          </button>
        );
      })}
    </div>
  );
}
