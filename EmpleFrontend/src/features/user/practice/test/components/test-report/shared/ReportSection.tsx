import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
};

export default function ReportSection({ title, icon: Icon, children, className = '' }: Props) {
  return (
    <section className={`mt-12 space-y-6 ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6 text-[var(--orange)]" />}
        <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
