import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import { formatReportDate } from './report.utils';

type Props = {
  report: UserTestReport;
  onBack: () => void;
};

export default function ReportHeader({ report, onBack }: Props) {
  const { test, submittedAt, status } = report;

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl  bg-[var(--surface)] p-5 sm:p-6 shadow-sm transition-all duration-200">
      {/* Decorative glowing blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--orange)]/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="group mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted2)] transition-colors hover:text-[var(--orange)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Tests
          </button>
          
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            {test.title}
          </h1>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end sm:gap-2">
          {status === 'submitted' ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-500">
              <CheckCircle className="h-3.5 w-3.5" /> Submitted
            </span>
          ) : status === 'timed_out' ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Clock className="h-3.5 w-3.5" /> Timed Out
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-500">
              <CheckCircle className="h-3.5 w-3.5" /> {status}
            </span>
          )}

          <div className="rounded-xl  bg-[var(--bg)] px-4 py-3 text-sm text-[var(--muted2)] sm:text-right w-full sm:w-auto">
            <p className="flex items-center justify-between gap-4 sm:justify-end">
              <span>Submitted</span>
              <span className="font-semibold text-[var(--text)]">{formatReportDate(submittedAt)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
