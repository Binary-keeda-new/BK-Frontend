import { LayoutList, CheckCircle2, XCircle } from 'lucide-react';

export type CodingFilterType = 'all' | 'accepted' | 'rejected';

type Props = {
  currentFilter: CodingFilterType;
  onFilterChange: (filter: CodingFilterType) => void;
  counts: {
    all: number;
    accepted: number;
    rejected: number;
  };
};

export default function CodingReviewFilters({ currentFilter, onFilterChange, counts }: Props) {
  const filters: { id: CodingFilterType; label: string; icon: any; count: number; activeColor: string }[] = [
    { id: 'all', label: 'All', icon: LayoutList, count: counts.all, activeColor: 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]' },
    { id: 'accepted', label: 'Accepted', icon: CheckCircle2, count: counts.accepted, activeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: counts.rejected, activeColor: 'bg-red-500/10 text-red-500 border-red-500/20' },
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
