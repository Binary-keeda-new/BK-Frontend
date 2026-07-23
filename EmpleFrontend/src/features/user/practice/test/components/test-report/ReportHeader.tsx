import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import { formatDuration, formatReportDate } from './report.utils';

type Props = {
  report: UserTestReport;
  onBack: () => void;
};

export default function ReportHeader({ report, onBack }: Props) {
  const { test, candidate, submittedAt, status, timeUsedMs, totalDurationMs } = report;

  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-2xl">
      {/* Decorative glowing blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--orange)]/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="group mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted2)] transition-colors hover:text-[var(--orange)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Tests
          </button>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
            {test.title}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--muted2)]">
            Candidate: 
            <span className="rounded-full bg-[var(--border)]/50 px-3 py-1 font-bold text-[var(--text)] shadow-sm backdrop-blur-md">
              {candidate.name}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end sm:gap-3">
          {status === 'submitted' ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md">
              <CheckCircle className="h-4 w-4" /> Submitted Successfully
            </span>
          ) : status === 'timed_out' ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-1.5 text-sm font-bold text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md">
              <Clock className="h-4 w-4" /> Timed Out
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/15 px-4 py-1.5 text-sm font-bold text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md">
              <CheckCircle className="h-4 w-4" /> {status}
            </span>
          )}

          <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface)]/50 p-4 text-sm text-[var(--muted2)] backdrop-blur-md sm:text-right">
            <p className="flex items-center justify-between gap-4 sm:justify-end">
              <span>Submitted</span>
              <span className="font-semibold text-[var(--text)]">{formatReportDate(submittedAt)}</span>
            </p>
            <div className="my-2 h-px w-full bg-[var(--border)]/50" />
            <p className="flex items-center justify-between gap-4 sm:justify-end">
              <span>Time Used</span>
              <span className="font-bold text-[var(--text)]">
                {formatDuration(timeUsedMs)}
                {totalDurationMs > 0 && <span className="font-medium text-[var(--muted2)]"> / {formatDuration(totalDurationMs)}</span>}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
