'use client';

import type { QuizReport } from './quizReport.types';
import { exportLeaderboardCsv } from './exportLeaderboardCsv';

export default function ExportLeaderboardButton({ report }: { report: QuizReport }) {
  return (
    <button
      onClick={() => exportLeaderboardCsv(report)}
      disabled={report.leaderboard.length === 0}
      className="shrink-0 rounded-xl bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#EA6A0C] disabled:cursor-not-allowed disabled:opacity-50"
    >
      Export CSV
    </button>
  );
}